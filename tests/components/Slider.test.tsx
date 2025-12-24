/**
 * Slider Adapter Tests
 * TDD: RED phase - Write failing tests first
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ComponentMapper } from '../../src/components/ComponentMapper'
import type { A2UIComponent } from '@ainative/ai-kit-a2ui-core/types'

describe('Slider Component Adapter', () => {
  describe('Basic Rendering', () => {
    it('renders slider with label', () => {
      const component: A2UIComponent = {
        id: 'slider-1',
        type: 'slider',
        properties: {
          label: 'Volume',
          value: 50,
          min: 0,
          max: 100,
        },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)

      expect(screen.getByText('Volume')).toBeInTheDocument()
      expect(screen.getByRole('slider')).toBeInTheDocument()
    })

    it('renders slider with initial value', () => {
      const component: A2UIComponent = {
        id: 'slider-1',
        type: 'slider',
        properties: {
          label: 'Brightness',
          value: 75,
          min: 0,
          max: 100,
        },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)

      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuenow', '75')
    })

    it('renders slider with min and max', () => {
      const component: A2UIComponent = {
        id: 'slider-1',
        type: 'slider',
        properties: {
          label: 'Temperature',
          value: 20,
          min: -10,
          max: 40,
        },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)

      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuemin', '-10')
      expect(slider).toHaveAttribute('aria-valuemax', '40')
    })

    it('renders slider with step', () => {
      const component: A2UIComponent = {
        id: 'slider-1',
        type: 'slider',
        properties: {
          label: 'Rating',
          value: 5,
          min: 0,
          max: 10,
          step: 0.5,
        },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)

      const slider = screen.getByRole('slider')
      expect(slider).toBeInTheDocument()
    })
  })

  describe('User Interaction', () => {
    it('calls onAction when value changes', async () => {
      const onAction = vi.fn()
      const component: A2UIComponent = {
        id: 'slider-1',
        type: 'slider',
        properties: {
          label: 'Volume',
          value: 50,
          min: 0,
          max: 100,
          action: 'volume-change',
        },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={onAction} />)

      const slider = screen.getByRole('slider')

      // Simulate slider change
      slider.focus()
      await userEvent.keyboard('{ArrowRight}')

      expect(onAction).toHaveBeenCalled()
    })
  })

  describe('Data Binding', () => {
    it('binds value from data model using JSON Pointer', () => {
      const component: A2UIComponent = {
        id: 'slider-1',
        type: 'slider',
        properties: {
          label: 'Volume',
          value: '/settings/volume',
          min: 0,
          max: 100,
        },
      }

      const dataModel = {
        settings: { volume: 80 },
      }

      render(<ComponentMapper component={component} dataModel={dataModel} onAction={vi.fn()} />)

      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuenow', '80')
    })
  })

  describe('Validation States', () => {
    it('shows disabled state', () => {
      const component: A2UIComponent = {
        id: 'slider-1',
        type: 'slider',
        properties: {
          label: 'Disabled Slider',
          value: 50,
          min: 0,
          max: 100,
          disabled: true,
        },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)

      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('data-disabled')
    })
  })

  describe('Display Options', () => {
    it('shows current value as text', () => {
      const component: A2UIComponent = {
        id: 'slider-1',
        type: 'slider',
        properties: {
          label: 'Volume',
          value: 65,
          min: 0,
          max: 100,
          showValue: true,
        },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)

      expect(screen.getByText('65')).toBeInTheDocument()
    })
  })
})
