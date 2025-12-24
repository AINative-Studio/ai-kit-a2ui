/**
 * A2UIRenderer Component
 * Main renderer for A2UI protocol in React
 *
 * @example
 * ```tsx
 * <A2UIRenderer
 *   agentUrl="wss://agent.example.com"
 *   onAction={(action, context) => console.log(action, context)}
 * />
 * ```
 */

import { useEffect, useState, useCallback, useMemo } from 'react'
import type { A2UIComponent, A2UIMessage } from '@ainative/ai-kit-a2ui-core/types'
import { A2UITransport } from '@ainative/ai-kit-a2ui-core/transport'
import { ComponentRenderer } from './ComponentRenderer'

export interface A2UIRendererProps {
  /** WebSocket URL for agent connection */
  agentUrl: string
  /** Callback for user actions */
  onAction?: (action: string, context: Record<string, unknown>) => void
  /** Optional initial components */
  initialComponents?: A2UIComponent[]
  /** Optional initial data model */
  initialDataModel?: Record<string, unknown>
}

type RenderState = 'disconnected' | 'connecting' | 'connected' | 'error'

export function A2UIRenderer({
  agentUrl,
  onAction,
  initialComponents = [],
  initialDataModel = {},
}: A2UIRendererProps) {
  const [state, setState] = useState<RenderState>('connecting')
  const [components, setComponents] = useState<A2UIComponent[]>(initialComponents)
  const [dataModel, setDataModel] = useState<Record<string, unknown>>(initialDataModel)
  const [error, setError] = useState<Error | null>(null)
  const [transport, setTransport] = useState<A2UITransport | null>(null)

  // Connect to agent
  useEffect(() => {
    const t = new A2UITransport(agentUrl)

    // Status change handler
    t.on('statusChange', (status) => {
      if (status === 'connected') {
        setState('connected')
      } else if (status === 'connecting') {
        setState('connecting')
      } else if (status === 'disconnected') {
        setState('disconnected')
      } else if (status === 'error') {
        setState('error')
      }
    })

    // Error handler
    t.on('error', (err: Error) => {
      setError(err)
      setState('error')
    })

    // createSurface handler
    t.on('createSurface', (message: A2UIMessage) => {
      if (message.type === 'createSurface') {
        setComponents(message.components)
        setDataModel(message.dataModel || {})
      }
    })

    // updateComponents handler
    t.on('updateComponents', (message: A2UIMessage) => {
      if (message.type === 'updateComponents') {
        // Apply component updates
        setComponents((prev) => {
          const updated = [...prev]
          message.updates.forEach((update) => {
            const index = updated.findIndex((c) => c.id === update.id)
            if (update.operation === 'add' && update.component) {
              updated.push(update.component)
            } else if (update.operation === 'update' && update.component && index >= 0) {
              updated[index] = update.component
            } else if (update.operation === 'remove' && index >= 0) {
              updated.splice(index, 1)
            }
          })
          return updated
        })
      }
    })

    // Connect
    t.connect().catch((err) => {
      setError(err as Error)
      setState('error')
    })

    setTransport(t)

    // Cleanup
    return () => {
      t.disconnect()
    }
  }, [agentUrl])

  // Handle user actions
  const handleAction = useCallback(
    (action: string, context: Record<string, unknown>) => {
      // Call user's callback
      if (onAction) {
        onAction(action, context)
      }

      // Send to agent if connected
      if (transport && transport.isConnected) {
        try {
          transport.send({
            type: 'userAction',
            surfaceId: 'surface-1', // TODO: Get from state
            action,
            context,
            dataModel,
          })
        } catch (err) {
          console.error('Failed to send user action:', err)
          setError(err as Error)
        }
      }
    },
    [onAction, transport, dataModel]
  )

  // Memoize error message
  const errorMessage = useMemo(() => {
    return error?.message || 'Connection failed'
  }, [error])

  // Render states
  if (state === 'connecting') {
    return (
      <div className="a2ui-renderer" role="status" aria-live="polite">
        Connecting to agent...
      </div>
    )
  }

  if (state === 'error') {
    return (
      <div className="a2ui-renderer" role="alert" aria-live="assertive">
        Error: {errorMessage}
      </div>
    )
  }

  if (state === 'disconnected') {
    return (
      <div className="a2ui-renderer" role="status" aria-live="polite">
        Disconnected from agent
      </div>
    )
  }

  // Render components
  return (
    <div className="a2ui-renderer" role="main">
      {components.map((component) => (
        <ComponentRenderer
          key={component.id}
          component={component}
          dataModel={dataModel}
          onAction={handleAction}
        />
      ))}
    </div>
  )
}
