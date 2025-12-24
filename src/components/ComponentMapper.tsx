/**
 * ComponentMapper
 * Maps A2UI component types to React components
 */

import { memo } from 'react'
import type { A2UIComponent } from '@ainative/ai-kit-a2ui-core/types'
import { JSONPointer } from '@ainative/ai-kit-a2ui-core/json-pointer'

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

  // Fallback for unsupported components
  return <div data-component-type={component.type}>[{component.type}]</div>
})
