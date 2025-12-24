/**
 * ComponentMapper Tests
 * TDD: RED phase - Write failing tests first
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ComponentMapper } from '../../src/components/ComponentMapper'
import type { A2UIComponent } from '@ainative/ai-kit-a2ui-core/types'

describe('ComponentMapper', () => {
  describe('Basic Component Rendering', () => {
    it('renders text component', () => {
      const component: A2UIComponent = {
        id: 'text-1',
        type: 'text',
        properties: { value: 'Hello World' },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)
      expect(screen.getByText('Hello World')).toBeInTheDocument()
    })

    it('renders button component', () => {
      const component: A2UIComponent = {
        id: 'btn-1',
        type: 'button',
        properties: { label: 'Click Me' },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
    })

    it('renders heading component', () => {
      const component: A2UIComponent = {
        id: 'heading-1',
        type: 'heading',
        properties: { value: 'My Title', level: 1 },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('My Title')
    })
  })

  describe('Layout Components', () => {
    it('renders container with children', () => {
      const component: A2UIComponent = {
        id: 'container-1',
        type: 'container',
        properties: {},
        children: [
          {
            id: 'text-1',
            type: 'text',
            properties: { value: 'Child Text' },
          },
        ],
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)
      expect(screen.getByText('Child Text')).toBeInTheDocument()
    })

    it('renders divider component', () => {
      const component: A2UIComponent = {
        id: 'div-1',
        type: 'divider',
        properties: {},
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)
      expect(screen.getByRole('separator')).toBeInTheDocument()
    })
  })

  describe('Data Binding', () => {
    it('binds data model values using JSON Pointers', () => {
      const component: A2UIComponent = {
        id: 'text-1',
        type: 'text',
        properties: { value: '/user/name' },
      }

      const dataModel = {
        user: { name: 'John Doe' },
      }

      render(<ComponentMapper component={component} dataModel={dataModel} onAction={vi.fn()} />)
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })

    it('falls back to literal value when pointer not found', () => {
      const component: A2UIComponent = {
        id: 'text-1',
        type: 'text',
        properties: { value: '/nonexistent/path' },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)
      expect(screen.getByText('/nonexistent/path')).toBeInTheDocument()
    })
  })

  describe('Action Handling', () => {
    it('calls onAction when button clicked', () => {
      const onAction = vi.fn()
      const component: A2UIComponent = {
        id: 'btn-1',
        type: 'button',
        properties: { label: 'Submit', action: 'submit-form' },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={onAction} />)

      const button = screen.getByRole('button')
      button.click()

      expect(onAction).toHaveBeenCalledWith('submit-form', {
        componentId: 'btn-1',
      })
    })
  })

  describe('Unknown Component Types', () => {
    it('renders fallback for unknown component', () => {
      const component: A2UIComponent = {
        id: 'unknown-1',
        type: 'unknown-component-type',
        properties: {},
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)
      expect(screen.getByText('[unknown-component-type]')).toBeInTheDocument()
    })
  })

  describe('Component Registry Integration', () => {
    it('uses component registry to determine supported types', () => {
      // This test will be expanded when we integrate with ComponentRegistry
      const component: A2UIComponent = {
        id: 'text-1',
        type: 'text',
        properties: { value: 'Test' },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)
      expect(screen.getByText('Test')).toBeInTheDocument()
    })
  })

  describe('Properties Validation', () => {
    it('handles missing properties gracefully', () => {
      const component: A2UIComponent = {
        id: 'text-1',
        type: 'text',
        properties: {},
      }

      const { container } = render(
        <ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />
      )
      // Should render without crashing and have a div element
      expect(container.querySelector('div')).toBeInTheDocument()
    })
  })
})
