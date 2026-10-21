/**
 * DateTimeInput Adapter Tests (Issue #8)
 * TDD: RED phase - Write failing tests first
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ComponentMapper } from '../../src/components/ComponentMapper'
import type { A2UIComponent } from '@ainative/ai-kit-a2ui-core/types'

describe('DateTimeInput Component Adapter', () => {
  describe('Basic Rendering', () => {
    it('renders a trigger button with a label', () => {
      const component: A2UIComponent = {
        id: 'date-1',
        type: 'dateTimeInput',
        properties: { label: 'Due date' },
      }

      render(<ComponentMapper component={component} componentsById={{}} dataModel={{}} onAction={vi.fn()} />)

      expect(screen.getByRole('button', { name: /due date/i })).toBeInTheDocument()
    })

    it('shows a placeholder when no date is selected', () => {
      const component: A2UIComponent = {
        id: 'date-1',
        type: 'dateTimeInput',
        properties: { label: 'Due date', placeholder: 'Pick a date' },
      }

      render(<ComponentMapper component={component} componentsById={{}} dataModel={{}} onAction={vi.fn()} />)

      expect(screen.getByText('Pick a date')).toBeInTheDocument()
    })

    it('formats an initial value as a readable date', () => {
      const component: A2UIComponent = {
        id: 'date-1',
        type: 'dateTimeInput',
        properties: { label: 'Due date', value: '2026-03-15' },
      }

      render(<ComponentMapper component={component} componentsById={{}} dataModel={{}} onAction={vi.fn()} />)

      expect(screen.getByText('March 15th, 2026')).toBeInTheDocument()
    })
  })

  describe('Popover + Calendar Interaction', () => {
    it('opens a calendar popover when the trigger button is clicked', async () => {
      const component: A2UIComponent = {
        id: 'date-1',
        type: 'dateTimeInput',
        properties: { label: 'Due date' },
      }

      render(<ComponentMapper component={component} componentsById={{}} dataModel={{}} onAction={vi.fn()} />)

      await userEvent.click(screen.getByRole('button', { name: /due date/i }))

      await waitFor(() => {
        expect(screen.getByRole('grid')).toBeInTheDocument()
      })
    })
  })

  describe('Data Binding', () => {
    it('dispatches the action with the selected ISO date when a day is chosen', async () => {
      const onAction = vi.fn()
      const component: A2UIComponent = {
        id: 'date-1',
        type: 'dateTimeInput',
        properties: { label: 'Due date', value: '2026-03-15', action: 'dateChanged' },
      }

      render(<ComponentMapper component={component} componentsById={{}} dataModel={{}} onAction={onAction} />)

      await userEvent.click(screen.getByRole('button', { name: /due date/i }))
      await waitFor(() => expect(screen.getByRole('grid')).toBeInTheDocument())

      await userEvent.click(screen.getByRole('gridcell', { name: '20' }))

      await waitFor(() => {
        expect(onAction).toHaveBeenCalledWith(
          'dateChanged',
          expect.objectContaining({ componentId: 'date-1', value: expect.stringContaining('2026-03-20') })
        )
      })
    })

    it('closes the popover after a date is selected', async () => {
      const component: A2UIComponent = {
        id: 'date-1',
        type: 'dateTimeInput',
        properties: { label: 'Due date', value: '2026-03-15' },
      }

      render(<ComponentMapper component={component} componentsById={{}} dataModel={{}} onAction={vi.fn()} />)

      await userEvent.click(screen.getByRole('button', { name: /due date/i }))
      await waitFor(() => expect(screen.getByRole('grid')).toBeInTheDocument())

      await userEvent.click(screen.getByRole('gridcell', { name: '20' }))

      await waitFor(() => {
        expect(screen.queryByRole('grid')).not.toBeInTheDocument()
      })
    })

    it('binds the initial value from the data model via JSON Pointer', () => {
      const component: A2UIComponent = {
        id: 'date-1',
        type: 'dateTimeInput',
        properties: { label: 'Due date', value: '/task/dueDate' },
      }

      render(
        <ComponentMapper
          component={component}
          dataModel={{ task: { dueDate: '2026-03-15' } }}
          onAction={vi.fn()}
        />
      )

      expect(screen.getByText('March 15th, 2026')).toBeInTheDocument()
    })
  })
})
