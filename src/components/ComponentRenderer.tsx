/**
 * ComponentRenderer
 * Renders A2UI components by mapping component types to React elements
 */

import { memo } from 'react'
import type { A2UIComponent } from '@ainative/ai-kit-a2ui-core/types'

export interface ComponentRendererProps {
  /** The A2UI component to render */
  component: A2UIComponent
  /** The current data model for data binding */
  dataModel: Record<string, unknown>
  /** Callback when user performs an action */
  onAction: (action: string, context: Record<string, unknown>) => void
}

/**
 * Renders a single A2UI component
 *
 * This is a minimal implementation that supports text and button components.
 * Full implementation will be added in ComponentMapper.
 */
export const ComponentRenderer = memo(function ComponentRenderer({
  component,
  onAction,
}: ComponentRendererProps) {
  // Text component
  if (component.type === 'text') {
    const value = component.properties?.['value']
    return <div>{String(value || '')}</div>
  }

  // Button component
  if (component.type === 'button') {
    const handleClick = () => {
      const action = component.properties?.['action']
      onAction(String(action || 'click'), { componentId: component.id })
    }

    const label = component.properties?.['label']
    return <button onClick={handleClick}>{String(label || 'Button')}</button>
  }

  // Fallback for unsupported components
  return <div data-component-type={component.type}>[{component.type}]</div>
})
