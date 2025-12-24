/**
 * TextField Adapter Tests
 * TDD: RED phase - Write failing tests first
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ComponentMapper } from '../../src/components/ComponentMapper'
import type { A2UIComponent } from '@ainative/ai-kit-a2ui-core/types'

describe('TextField Component Adapter', () => {
  describe('Basic Rendering', () => {
    it('renders textfield with label', () => {
      const component: A2UIComponent = {
        id: 'field-1',
        type: 'textfield',
        properties: {
          label: 'Email Address',
          value: '',
        },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)

      expect(screen.getByLabelText('Email Address')).toBeInTheDocument()
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('renders textfield with initial value', () => {
      const component: A2UIComponent = {
        id: 'field-1',
        type: 'textfield',
        properties: {
          label: 'Username',
          value: 'john_doe',
        },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)

      const input = screen.getByRole('textbox') as HTMLInputElement
      expect(input.value).toBe('john_doe')
    })

    it('renders textfield with placeholder', () => {
      const component: A2UIComponent = {
        id: 'field-1',
        type: 'textfield',
        properties: {
          label: 'Search',
          placeholder: 'Enter search query...',
        },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)

      expect(screen.getByPlaceholderText('Enter search query...')).toBeInTheDocument()
    })
  })

  describe('Input Types', () => {
    it('renders password input', () => {
      const component: A2UIComponent = {
        id: 'field-1',
        type: 'textfield',
        properties: {
          label: 'Password',
          inputType: 'password',
        },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)

      const input = screen.getByLabelText('Password')
      expect(input).toHaveAttribute('type', 'password')
    })

    it('renders email input', () => {
      const component: A2UIComponent = {
        id: 'field-1',
        type: 'textfield',
        properties: {
          label: 'Email',
          inputType: 'email',
        },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)

      const input = screen.getByLabelText('Email')
      expect(input).toHaveAttribute('type', 'email')
    })

    it('renders number input', () => {
      const component: A2UIComponent = {
        id: 'field-1',
        type: 'textfield',
        properties: {
          label: 'Age',
          inputType: 'number',
        },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)

      const input = screen.getByLabelText('Age')
      expect(input).toHaveAttribute('type', 'number')
    })
  })

  describe('User Interaction', () => {
    it('calls onAction when user types', async () => {
      const onAction = vi.fn()
      const component: A2UIComponent = {
        id: 'field-1',
        type: 'textfield',
        properties: {
          label: 'Name',
          action: 'field-change',
        },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={onAction} />)

      const input = screen.getByRole('textbox')
      await userEvent.type(input, 'John')

      expect(onAction).toHaveBeenCalledWith('field-change', {
        componentId: 'field-1',
        value: 'John',
      })
    })

    it('calls onAction on blur', async () => {
      const onAction = vi.fn()
      const component: A2UIComponent = {
        id: 'field-1',
        type: 'textfield',
        properties: {
          label: 'Email',
          action: 'validate',
        },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={onAction} />)

      const input = screen.getByRole('textbox')
      await userEvent.click(input)
      await userEvent.tab()

      expect(onAction).toHaveBeenCalled()
    })
  })

  describe('Data Binding', () => {
    it('binds value from data model using JSON Pointer', () => {
      const component: A2UIComponent = {
        id: 'field-1',
        type: 'textfield',
        properties: {
          label: 'Username',
          value: '/user/username',
        },
      }

      const dataModel = {
        user: { username: 'alice' },
      }

      render(<ComponentMapper component={component} dataModel={dataModel} onAction={vi.fn()} />)

      const input = screen.getByRole('textbox') as HTMLInputElement
      expect(input.value).toBe('alice')
    })
  })

  describe('Validation States', () => {
    it('shows disabled state', () => {
      const component: A2UIComponent = {
        id: 'field-1',
        type: 'textfield',
        properties: {
          label: 'Disabled Field',
          disabled: true,
        },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)

      expect(screen.getByRole('textbox')).toBeDisabled()
    })

    it('shows required indicator', () => {
      const component: A2UIComponent = {
        id: 'field-1',
        type: 'textfield',
        properties: {
          label: 'Required Field',
          required: true,
        },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)

      expect(screen.getByRole('textbox')).toBeRequired()
    })
  })
})
