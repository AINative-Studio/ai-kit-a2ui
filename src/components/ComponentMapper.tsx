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
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

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

  // ChoicePicker component (Select dropdown)
  if (component.type === 'choicepicker') {
    const label = String(resolveValue(component.properties?.['label']) || '')
    const placeholder = String(component.properties?.['placeholder'] || 'Select...')
    const initialValue = String(resolveValue(component.properties?.['value']) || '')
    const disabled = Boolean(component.properties?.['disabled'])
    const required = Boolean(component.properties?.['required'])
    const action = component.properties?.['action']

    const optionsValue = component.properties?.['options']
    const options = (
      Array.isArray(optionsValue) ? optionsValue : resolveValue(optionsValue)
    ) as Array<{ value: string; label: string }> | undefined

    const [value, setValue] = useState(initialValue)

    const handleValueChange = (newValue: string) => {
      setValue(newValue)

      if (action) {
        onAction(String(action), {
          componentId: component.id,
          value: newValue,
        })
      }
    }

    return (
      <div className="a2ui-choicepicker space-y-2">
        <Label htmlFor={component.id}>{label}</Label>
        <Select
          value={value}
          onValueChange={handleValueChange}
          disabled={disabled}
          required={required}
        >
          <SelectTrigger id={component.id}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }

  // List component
  if (component.type === 'list') {
    const itemsValue = component.properties?.['items']
    const items = (
      Array.isArray(itemsValue)
        ? itemsValue
        : resolveValue(itemsValue)
    ) as Array<{ id: string; label: string; description?: string }> | undefined

    const clickable = component.properties?.['clickable'] !== false
    const ordered = Boolean(component.properties?.['ordered'])
    const dividers = Boolean(component.properties?.['dividers'])
    const action = component.properties?.['action']

    const handleItemClick = (itemId: string) => {
      if (action && clickable) {
        onAction(String(action), {
          componentId: component.id,
          itemId,
        })
      }
    }

    if (!items || items.length === 0) {
      return <div className="a2ui-list" />
    }

    const ListTag = ordered ? 'ol' : 'ul'

    return (
      <ListTag className="a2ui-list space-y-1">
        {items.map((item, index) => (
          <li key={item.id}>
            {clickable ? (
              <button
                className="w-full text-left p-2 hover:bg-accent rounded-md"
                onClick={() => handleItemClick(item.id)}
              >
                <div className="font-medium">{item.label}</div>
                {item.description && (
                  <div className="text-sm text-muted-foreground">{item.description}</div>
                )}
              </button>
            ) : (
              <div className="p-2">
                <div className="font-medium">{item.label}</div>
                {item.description && (
                  <div className="text-sm text-muted-foreground">{item.description}</div>
                )}
              </div>
            )}
            {dividers && index < items.length - 1 && <hr role="separator" className="my-1" />}
          </li>
        ))}
      </ListTag>
    )
  }

  // Tabs component
  if (component.type === 'tabs') {
    const defaultValue = String(
      resolveValue(component.properties?.['defaultValue']) || ''
    )
    const action = component.properties?.['action']
    const tabs = component.properties?.['tabs'] as
      | Array<{ value: string; label: string; content?: string }>
      | undefined

    const handleValueChange = (newValue: string) => {
      if (action) {
        onAction(String(action), {
          componentId: component.id,
          value: newValue,
        })
      }
    }

    // Simple mode: tabs defined in properties
    if (tabs && tabs.length > 0) {
      return (
        <Tabs
          defaultValue={defaultValue || tabs[0]?.value || ''}
          onValueChange={handleValueChange}
          className="a2ui-tabs"
        >
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              {tab.content || ''}
            </TabsContent>
          ))}
        </Tabs>
      )
    }

    // Children mode: tabs defined as child components
    if (component.children && component.children.length > 0) {
      const triggers = component.children.filter((c): c is A2UIComponent =>
        typeof c === 'object' && c.type === 'tab-trigger'
      )
      const contents = component.children.filter((c): c is A2UIComponent =>
        typeof c === 'object' && c.type === 'tab-content'
      )

      return (
        <Tabs
          defaultValue={defaultValue}
          onValueChange={handleValueChange}
          className="a2ui-tabs"
        >
          <TabsList>
            {triggers.map((trigger) => (
              <TabsTrigger
                key={trigger.id}
                value={String(trigger.properties?.['value'] || '')}
              >
                {String(trigger.properties?.['label'] || '')}
              </TabsTrigger>
            ))}
          </TabsList>
          {contents.map((content) => (
            <TabsContent
              key={content.id}
              value={String(content.properties?.['value'] || '')}
            >
              {content.children &&
                content.children.map((child) => (
                  <ComponentMapper
                    key={child.id}
                    component={child}
                    dataModel={dataModel}
                    onAction={onAction}
                  />
                ))}
            </TabsContent>
          ))}
        </Tabs>
      )
    }

    return <div className="a2ui-tabs">[Empty tabs]</div>
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
