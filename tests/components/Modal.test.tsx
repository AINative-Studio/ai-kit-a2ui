/**
 * Modal (Dialog) Adapter Tests (Issue #7)
 * TDD: RED phase - Write failing tests first
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ComponentMapper } from '../../src/components/ComponentMapper'
import type { A2UIComponent } from '@ainative/ai-kit-a2ui-core/types'

/** Builds an id-keyed lookup from a flat list of components, as the real
 *  A2UI protocol represents a surface. */
function byId(components: A2UIComponent[]): Record<string, A2UIComponent> {
  return Object.fromEntries(components.map((c) => [c.id, c]))
}

describe('Modal Component Adapter', () => {
  describe('Basic Rendering', () => {
    it('does not render dialog content when closed', () => {
      const component: A2UIComponent = {
        id: 'modal-1',
        type: 'modal',
        properties: { open: false },
      }

      render(
        <ComponentMapper
          component={component}
          componentsById={byId([component])}
          dataModel={{}}
          onAction={vi.fn()}
        />
      )

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('renders dialog content when open', () => {
      const component: A2UIComponent = {
        id: 'modal-1',
        type: 'modal',
        properties: { open: true },
      }

      render(
        <ComponentMapper
          component={component}
          componentsById={byId([component])}
          dataModel={{}}
          onAction={vi.fn()}
        />
      )

      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('extracts DialogTitle from the first text child', () => {
      const title: A2UIComponent = {
        id: 'title-1',
        type: 'text',
        properties: { value: 'Confirm deletion' },
      }
      const body: A2UIComponent = {
        id: 'body-1',
        type: 'text',
        properties: { value: 'Are you sure?' },
      }
      const component: A2UIComponent = {
        id: 'modal-1',
        type: 'modal',
        properties: { open: true },
        children: ['title-1', 'body-1'],
      }

      render(
        <ComponentMapper
          component={component}
          componentsById={byId([component, title, body])}
          dataModel={{}}
          onAction={vi.fn()}
        />
      )

      expect(screen.getByText('Confirm deletion')).toBeInTheDocument()
      expect(screen.getByText('Are you sure?')).toBeInTheDocument()
    })

    it('renders remaining children in the dialog body', () => {
      const title: A2UIComponent = { id: 'title-1', type: 'text', properties: { value: 'Title' } }
      const button: A2UIComponent = { id: 'btn-1', type: 'button', properties: { label: 'OK' } }
      const component: A2UIComponent = {
        id: 'modal-1',
        type: 'modal',
        properties: { open: true },
        children: ['title-1', 'btn-1'],
      }

      render(
        <ComponentMapper
          component={component}
          componentsById={byId([component, title, button])}
          dataModel={{}}
          onAction={vi.fn()}
        />
      )

      expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument()
    })
  })

  describe('Open/Close Behavior', () => {
    it('calls onAction with the close action when the close button is clicked', async () => {
      const onAction = vi.fn()
      const title: A2UIComponent = { id: 'title-1', type: 'text', properties: { value: 'Title' } }
      const component: A2UIComponent = {
        id: 'modal-1',
        type: 'modal',
        properties: { open: true, action: 'closeModal' },
        children: ['title-1'],
      }

      render(
        <ComponentMapper
          component={component}
          componentsById={byId([component, title])}
          dataModel={{}}
          onAction={onAction}
        />
      )

      await userEvent.click(screen.getByRole('button', { name: /close/i }))

      await waitFor(() => {
        expect(onAction).toHaveBeenCalledWith('closeModal', { componentId: 'modal-1', open: false })
      })
    })

    it('calls onAction when the overlay is clicked', async () => {
      const onAction = vi.fn()
      const title: A2UIComponent = { id: 'title-1', type: 'text', properties: { value: 'Title' } }
      const component: A2UIComponent = {
        id: 'modal-1',
        type: 'modal',
        properties: { open: true, action: 'closeModal' },
        children: ['title-1'],
      }

      render(
        <ComponentMapper
          component={component}
          componentsById={byId([component, title])}
          dataModel={{}}
          onAction={onAction}
        />
      )

      await userEvent.keyboard('{Escape}')

      await waitFor(() => {
        expect(onAction).toHaveBeenCalledWith('closeModal', { componentId: 'modal-1', open: false })
      })
    })
  })

  describe('Data Binding', () => {
    it('binds the open state from the data model', () => {
      const title: A2UIComponent = { id: 'title-1', type: 'text', properties: { value: 'Title' } }
      const component: A2UIComponent = {
        id: 'modal-1',
        type: 'modal',
        properties: { open: '/ui/modalOpen' },
        children: ['title-1'],
      }

      render(
        <ComponentMapper
          component={component}
          componentsById={byId([component, title])}
          dataModel={{ ui: { modalOpen: true } }}
          onAction={vi.fn()}
        />
      )

      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
  })
})
