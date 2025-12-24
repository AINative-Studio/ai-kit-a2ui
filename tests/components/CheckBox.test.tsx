/**
 * CheckBox Adapter Tests
 * TDD: RED phase - Write failing tests first
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ComponentMapper } from '../../src/components/ComponentMapper'
import type { A2UIComponent } from '@ainative/ai-kit-a2ui-core/types'

describe('CheckBox Component Adapter', () => {
  describe('Basic Rendering', () => {
    it('renders checkbox with label', () => {
      const component: A2UIComponent = {
        id: 'check-1',
        type: 'checkbox',
        properties: {
          label: 'Accept Terms',
          checked: false,
        },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)

      expect(screen.getByLabelText('Accept Terms')).toBeInTheDocument()
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
    })

    it('renders checked checkbox', () => {
      const component: A2UIComponent = {
        id: 'check-1',
        type: 'checkbox',
        properties: {
          label: 'Subscribe',
          checked: true,
        },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)

      const checkbox = screen.getByRole('checkbox') as HTMLInputElement
      expect(checkbox).toBeChecked()
    })

    it('renders unchecked checkbox', () => {
      const component: A2UIComponent = {
        id: 'check-1',
        type: 'checkbox',
        properties: {
          label: 'Agree',
          checked: false,
        },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)

      const checkbox = screen.getByRole('checkbox') as HTMLInputElement
      expect(checkbox).not.toBeChecked()
    })
  })

  describe('User Interaction', () => {
    it('calls onAction when toggled', async () => {
      const onAction = vi.fn()
      const component: A2UIComponent = {
        id: 'check-1',
        type: 'checkbox',
        properties: {
          label: 'Enable',
          action: 'toggle',
          checked: false,
        },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={onAction} />)

      const checkbox = screen.getByRole('checkbox')
      await userEvent.click(checkbox)

      expect(onAction).toHaveBeenCalledWith('toggle', {
        componentId: 'check-1',
        checked: true,
      })
    })

    it('toggles between checked and unchecked', async () => {
      const component: A2UIComponent = {
        id: 'check-1',
        type: 'checkbox',
        properties: {
          label: 'Toggle Me',
          checked: false,
        },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)

      const checkbox = screen.getByRole('checkbox') as HTMLInputElement

      expect(checkbox).not.toBeChecked()

      await userEvent.click(checkbox)
      expect(checkbox).toBeChecked()

      await userEvent.click(checkbox)
      expect(checkbox).not.toBeChecked()
    })
  })

  describe('Data Binding', () => {
    it('binds checked state from data model', () => {
      const component: A2UIComponent = {
        id: 'check-1',
        type: 'checkbox',
        properties: {
          label: 'Enabled',
          checked: '/settings/notifications',
        },
      }

      const dataModel = {
        settings: { notifications: true },
      }

      render(<ComponentMapper component={component} dataModel={dataModel} onAction={vi.fn()} />)

      const checkbox = screen.getByRole('checkbox') as HTMLInputElement
      expect(checkbox).toBeChecked()
    })
  })

  describe('Validation States', () => {
    it('shows disabled state', () => {
      const component: A2UIComponent = {
        id: 'check-1',
        type: 'checkbox',
        properties: {
          label: 'Disabled',
          disabled: true,
        },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)

      expect(screen.getByRole('checkbox')).toBeDisabled()
    })

    it('shows required state', () => {
      const component: A2UIComponent = {
        id: 'check-1',
        type: 'checkbox',
        properties: {
          label: 'Required',
          required: true,
        },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)

      expect(screen.getByRole('checkbox')).toBeRequired()
    })
  })
})
