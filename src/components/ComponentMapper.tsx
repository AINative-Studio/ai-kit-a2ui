/**
 * ComponentMapper
 * Maps A2UI component types to React components
 */

import { memo, useState } from 'react'
import type { A2UIComponent } from '@ainative/ai-kit-a2ui-core/types'
import { JSONPointer } from '@ainative/ai-kit-a2ui-core/json-pointer'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Checkbox } from './ui/checkbox'
import { Slider } from './ui/slider'

export interface ComponentMapperProps {
  /** The A2UI component to render */
  component: A2UIComponent
  /** The current data model for data binding */
  dataModel: Record<string, unknown>
  /** Callback when user performs an action */
  onAction: (action: string, context: Record<string, unknown>) => void
}

/**
 * Maps A2UI components to their React implementations
 *
 * Supports data binding via JSON Pointers and recursive rendering of children.
 *
 * @example
 * ```tsx
 * <ComponentMapper
 *   component={{ type: 'text', properties: { value: '/user/name' } }}
 *   dataModel={{ user: { name: 'John' } }}
 *   onAction={(action, ctx) => console.log(action)}
 * />
 * ```
 */
export const ComponentMapper = memo(function ComponentMapper({
  component,
  dataModel,
  onAction,
}: ComponentMapperProps) {
  /**
   * Resolves a value from the data model using JSON Pointer
   * Falls back to literal value if pointer doesn't exist
   */
  const resolveValue = (value: unknown): unknown => {
    if (typeof value !== 'string') return value

    // Check if it's a JSON Pointer (starts with /)
    if (value.startsWith('/')) {
      const resolved = JSONPointer.resolve(dataModel, value)
      // If resolution fails, return the literal value
      return resolved !== undefined ? resolved : value
    }

    return value
  }

  /**
   * Renders children recursively
   */
  const renderChildren = () => {
    if (!component.children || component.children.length === 0) {
      return null
    }

    return component.children.map((child) => (
      <ComponentMapper
        key={child.id}
        component={child}
        dataModel={dataModel}
        onAction={onAction}
      />
    ))
  }

  // Text component
  if (component.type === 'text') {
    const value = resolveValue(component.properties?.['value'])
    return <div>{String(value || '')}</div>
  }

  // Heading component
  if (component.type === 'heading') {
    const value = resolveValue(component.properties?.['value'])
    const level = Number(component.properties?.['level'] || 1)
    const Tag = `h${level}` as keyof JSX.IntrinsicElements

    return <Tag>{String(value || '')}</Tag>
  }

  // Button component
  if (component.type === 'button') {
    const handleClick = () => {
      const action = component.properties?.['action']
      onAction(String(action || 'click'), { componentId: component.id })
    }

    const label = resolveValue(component.properties?.['label'])
    return <button onClick={handleClick}>{String(label || 'Button')}</button>
  }

  // Container component
  if (component.type === 'container') {
    return <div className="a2ui-container">{renderChildren()}</div>
  }

  // Divider component
  if (component.type === 'divider') {
    return <hr role="separator" />
  }

  // CheckBox component
  if (component.type === 'checkbox') {
    const label = String(resolveValue(component.properties?.['label']) || '')
    const initialChecked = Boolean(resolveValue(component.properties?.['checked']))
    const disabled = Boolean(component.properties?.['disabled'])
    const required = Boolean(component.properties?.['required'])
    const action = component.properties?.['action']

    const [checked, setChecked] = useState(initialChecked)

    const handleCheckedChange = (newChecked: boolean) => {
      setChecked(newChecked)

      if (action) {
        onAction(String(action), {
          componentId: component.id,
          checked: newChecked,
        })
      }
    }

    return (
      <div className="a2ui-checkbox flex items-center space-x-2">
        <Checkbox
          id={component.id}
          checked={checked}
          onCheckedChange={handleCheckedChange}
          disabled={disabled}
          required={required}
        />
        <Label htmlFor={component.id}>{label}</Label>
      </div>
    )
  }

  // Slider component
  if (component.type === 'slider') {
    const label = String(resolveValue(component.properties?.['label']) || '')
    const initialValue = Number(resolveValue(component.properties?.['value']) || 0)
    const min = Number(component.properties?.['min'] || 0)
    const max = Number(component.properties?.['max'] || 100)
    const step = Number(component.properties?.['step'] || 1)
    const disabled = Boolean(component.properties?.['disabled'])
    const showValue = Boolean(component.properties?.['showValue'])
    const action = component.properties?.['action']

    const [value, setValue] = useState([initialValue])

    const handleValueChange = (newValue: number[]) => {
      setValue(newValue)

      if (action) {
        onAction(String(action), {
          componentId: component.id,
          value: newValue[0],
        })
      }
    }

    return (
      <div className="a2ui-slider space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor={component.id}>{label}</Label>
          {showValue && <span className="text-sm text-muted-foreground">{value[0]}</span>}
        </div>
        <Slider
          id={component.id}
          value={value}
          onValueChange={handleValueChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
        />
      </div>
    )
  }

  // TextField component (Input + Label)
  if (component.type === 'textfield') {
    const label = String(resolveValue(component.properties?.['label']) || '')
    const initialValue = String(resolveValue(component.properties?.['value']) || '')
    const placeholder = String(component.properties?.['placeholder'] || '')
    const inputType = String(component.properties?.['inputType'] || 'text')
    const disabled = Boolean(component.properties?.['disabled'])
    const required = Boolean(component.properties?.['required'])
    const action = component.properties?.['action']

    const [value, setValue] = useState(initialValue)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setValue(newValue)

      if (action) {
        onAction(String(action), {
          componentId: component.id,
          value: newValue,
        })
      }
    }

    const handleBlur = () => {
      if (action) {
        onAction(String(action), {
          componentId: component.id,
          value,
        })
      }
    }

    return (
      <div className="a2ui-textfield">
        <Label htmlFor={component.id}>{label}</Label>
        <Input
          id={component.id}
          type={inputType}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
    )
  }

  // Fallback for unsupported components
  return <div data-component-type={component.type}>[{component.type}]</div>
})
