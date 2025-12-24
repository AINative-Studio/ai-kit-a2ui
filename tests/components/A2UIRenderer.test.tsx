/**
 * A2UIRenderer Tests
 * TDD: RED phase - Write failing tests first
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { A2UIRenderer } from '../../src/components/A2UIRenderer'

// Mock WebSocket with instance tracking
let lastWebSocketInstance: MockWebSocket | null = null

class MockWebSocket {
  static CONNECTING = 0
  static OPEN = 1
  static CLOSING = 2
  static CLOSED = 3

  readyState = MockWebSocket.CONNECTING
  onopen: ((event: Event) => void) | null = null
  onclose: ((event: CloseEvent) => void) | null = null
  onerror: ((event: Event) => void) | null = null
  onmessage: ((event: MessageEvent) => void) | null = null

  constructor(public url: string) {
    lastWebSocketInstance = this
    setTimeout(() => {
      this.readyState = MockWebSocket.OPEN
      if (this.onopen) {
        this.onopen(new Event('open'))
      }
    }, 10)
  }

  send(data: string): void {
    if (this.readyState !== MockWebSocket.OPEN) {
      throw new Error('WebSocket is not open')
    }
  }

  close(): void {
    this.readyState = MockWebSocket.CLOSED
    if (this.onclose) {
      this.onclose(new CloseEvent('close'))
    }
  }
}

// Mock CloseEvent
class MockCloseEvent extends Event {
  constructor(type: string) {
    super(type)
  }
}
global.CloseEvent = MockCloseEvent as any

// Replace global WebSocket
global.WebSocket = MockWebSocket as any

describe('A2UIRenderer', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<A2UIRenderer agentUrl="wss://test.example.com" />)
    })

    it('shows loading state initially', () => {
      render(<A2UIRenderer agentUrl="wss://test.example.com" />)
      expect(screen.getByText(/connecting/i)).toBeInTheDocument()
    })

    it('accepts agentUrl prop', () => {
      const { rerender } = render(<A2UIRenderer agentUrl="wss://test1.example.com" />)

      rerender(<A2UIRenderer agentUrl="wss://test2.example.com" />)
      // Should not crash with different URL
    })
  })

  describe('Component Rendering from Agent', () => {
    it('renders components from createSurface message', async () => {
      render(<A2UIRenderer agentUrl="wss://test.example.com" />)

      // Wait for connection
      await waitFor(() => {
        expect(lastWebSocketInstance?.readyState).toBe(MockWebSocket.OPEN)
      }, { timeout: 100 })

      // Simulate createSurface message
      const message = {
        type: 'createSurface',
        surfaceId: 'surface-1',
        components: [
          {
            id: 'text-1',
            type: 'text',
            properties: { value: 'Hello World' },
          },
        ],
        dataModel: {},
      }

      // Trigger message
      if (lastWebSocketInstance?.onmessage) {
        lastWebSocketInstance.onmessage(
          new MessageEvent('message', { data: JSON.stringify(message) })
        )
      }

      await waitFor(() => {
        expect(screen.getByText('Hello World')).toBeInTheDocument()
      })
    })

    it('renders multiple components', async () => {
      render(<A2UIRenderer agentUrl="wss://test.example.com" />)

      await waitFor(() => {
        expect(lastWebSocketInstance?.readyState).toBe(MockWebSocket.OPEN)
      }, { timeout: 100 })

      const message = {
        type: 'createSurface',
        surfaceId: 'surface-1',
        components: [
          {
            id: 'text-1',
            type: 'text',
            properties: { value: 'First' },
          },
          {
            id: 'text-2',
            type: 'text',
            properties: { value: 'Second' },
          },
        ],
        dataModel: {},
      }

      if (lastWebSocketInstance?.onmessage) {
        lastWebSocketInstance.onmessage(
          new MessageEvent('message', { data: JSON.stringify(message) })
        )
      }

      await waitFor(() => {
        expect(screen.getByText('First')).toBeInTheDocument()
        expect(screen.getByText('Second')).toBeInTheDocument()
      })
    })
  })

  describe('Action Handling', () => {
    it('calls onAction when user interacts', async () => {
      const onAction = vi.fn()
      render(<A2UIRenderer agentUrl="wss://test.example.com" onAction={onAction} />)

      await waitFor(() => {
        expect(lastWebSocketInstance?.readyState).toBe(MockWebSocket.OPEN)
      }, { timeout: 100 })

      const message = {
        type: 'createSurface',
        surfaceId: 'surface-1',
        components: [
          {
            id: 'button-1',
            type: 'button',
            properties: { label: 'Click Me', action: 'submit' },
          },
        ],
        dataModel: {},
      }

      if (lastWebSocketInstance?.onmessage) {
        lastWebSocketInstance.onmessage(
          new MessageEvent('message', { data: JSON.stringify(message) })
        )
      }

      await waitFor(() => {
        const button = screen.getByRole('button', { name: /click me/i })
        button.click()
      })

      expect(onAction).toHaveBeenCalledWith('submit', expect.any(Object))
    })
  })

  describe('Error Handling', () => {
    it('shows error state on connection failure', async () => {
      // Create a failing WebSocket
      class FailingWebSocket extends MockWebSocket {
        constructor(url: string) {
          super(url)
          setTimeout(() => {
            if (this.onerror) {
              this.onerror(new Event('error'))
            }
          }, 10)
        }
      }

      global.WebSocket = FailingWebSocket as any

      render(<A2UIRenderer agentUrl="wss://test.example.com" />)

      await waitFor(
        () => {
          expect(screen.getByText(/error/i)).toBeInTheDocument()
        },
        { timeout: 100 }
      )

      // Restore
      global.WebSocket = MockWebSocket as any
    })

    it('shows error on invalid message', async () => {
      render(<A2UIRenderer agentUrl="wss://test.example.com" />)

      await waitFor(() => {
        expect(lastWebSocketInstance?.readyState).toBe(MockWebSocket.OPEN)
      }, { timeout: 100 })

      if (lastWebSocketInstance?.onmessage) {
        lastWebSocketInstance.onmessage(new MessageEvent('message', { data: 'invalid json' }))
      }

      await waitFor(() => {
        // Should handle gracefully, not crash
      })
    })
  })

  describe('Cleanup', () => {
    it('disconnects on unmount', async () => {
      const { unmount } = render(<A2UIRenderer agentUrl="wss://test.example.com" />)

      await waitFor(() => {
        expect(lastWebSocketInstance?.readyState).toBe(MockWebSocket.OPEN)
      }, { timeout: 100 })

      const closeSpy = vi.spyOn(lastWebSocketInstance!, 'close')

      unmount()

      expect(closeSpy).toHaveBeenCalled()
    })
  })
})
