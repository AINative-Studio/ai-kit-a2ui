/**
 * List Adapter Tests
 * TDD: RED phase - Write failing tests first
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ComponentMapper } from '../../src/components/ComponentMapper'
import type { A2UIComponent } from '@ainative/ai-kit-a2ui-core/types'

describe('List Component Adapter', () => {
  describe('Basic Rendering', () => {
    it('renders list with items', () => {
      const component: A2UIComponent = {
        id: 'list-1',
        type: 'list',
        properties: {
          items: [
            { id: '1', label: 'First Item' },
            { id: '2', label: 'Second Item' },
            { id: '3', label: 'Third Item' },
          ],
        },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)

      expect(screen.getByText('First Item')).toBeInTheDocument()
      expect(screen.getByText('Second Item')).toBeInTheDocument()
      expect(screen.getByText('Third Item')).toBeInTheDocument()
    })

    it('renders empty list', () => {
      const component: A2UIComponent = {
        id: 'list-1',
        type: 'list',
        properties: {
          items: [],
        },
      }

      const { container } = render(
        <ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />
      )

      expect(container.querySelector('.a2ui-list')).toBeInTheDocument()
    })

    it('renders list with descriptions', () => {
      const component: A2UIComponent = {
        id: 'list-1',
        type: 'list',
        properties: {
          items: [
            { id: '1', label: 'Title', description: 'Subtitle text' },
          ],
        },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)

      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByText('Subtitle text')).toBeInTheDocument()
    })
  })

  describe('User Interaction', () => {
    it('calls onAction when item is clicked', async () => {
      const onAction = vi.fn()
      const component: A2UIComponent = {
        id: 'list-1',
        type: 'list',
        properties: {
          action: 'item-click',
          items: [
            { id: 'item-1', label: 'Click Me' },
          ],
        },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={onAction} />)

      const item = screen.getByText('Click Me')
      await userEvent.click(item)

      expect(onAction).toHaveBeenCalledWith('item-click', {
        componentId: 'list-1',
        itemId: 'item-1',
      })
    })

    it('supports non-clickable items', () => {
      const component: A2UIComponent = {
        id: 'list-1',
        type: 'list',
        properties: {
          clickable: false,
          items: [
            { id: '1', label: 'Static Item' },
          ],
        },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)

      const item = screen.getByText('Static Item')
      expect(item.closest('button')).not.toBeInTheDocument()
    })
  })

  describe('Data Binding', () => {
    it('binds items from data model using JSON Pointer', () => {
      const component: A2UIComponent = {
        id: 'list-1',
        type: 'list',
        properties: {
          items: '/users',
        },
      }

      const dataModel = {
        users: [
          { id: '1', label: 'Alice' },
          { id: '2', label: 'Bob' },
        ],
      }

      render(<ComponentMapper component={component} dataModel={dataModel} onAction={vi.fn()} />)

      expect(screen.getByText('Alice')).toBeInTheDocument()
      expect(screen.getByText('Bob')).toBeInTheDocument()
    })
  })

  describe('Rendering Modes', () => {
    it('renders list with dividers', () => {
      const component: A2UIComponent = {
        id: 'list-1',
        type: 'list',
        properties: {
          dividers: true,
          items: [
            { id: '1', label: 'First' },
            { id: '2', label: 'Second' },
          ],
        },
      }

      const { container } = render(
        <ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />
      )

      // Should have separators between items
      const separators = container.querySelectorAll('[role="separator"]')
      expect(separators.length).toBeGreaterThan(0)
    })

    it('renders ordered list', () => {
      const component: A2UIComponent = {
        id: 'list-1',
        type: 'list',
        properties: {
          ordered: true,
          items: [
            { id: '1', label: 'First' },
            { id: '2', label: 'Second' },
          ],
        },
      }

      const { container } = render(
        <ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />
      )

      expect(container.querySelector('ol')).toBeInTheDocument()
    })

    it('renders unordered list', () => {
      const component: A2UIComponent = {
        id: 'list-1',
        type: 'list',
        properties: {
          ordered: false,
          items: [
            { id: '1', label: 'First' },
          ],
        },
      }

      const { container } = render(
        <ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />
      )

      expect(container.querySelector('ul')).toBeInTheDocument()
    })
  })
})
