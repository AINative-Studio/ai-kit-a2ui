/**
 * Tabs Adapter Tests
 * TDD: RED phase - Write failing tests first
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ComponentMapper } from '../../src/components/ComponentMapper'
import type { A2UIComponent } from '@ainative/ai-kit-a2ui-core/types'

describe('Tabs Component Adapter', () => {
  describe('Basic Rendering', () => {
    it('renders tabs with multiple options', () => {
      const component: A2UIComponent = {
        id: 'tabs-1',
        type: 'tabs',
        properties: {
          defaultValue: 'tab1',
          tabs: [
            { value: 'tab1', label: 'Profile', content: 'Profile content' },
            { value: 'tab2', label: 'Settings', content: 'Settings content' },
          ],
        },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)

      expect(screen.getByRole('tab', { name: 'Profile' })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: 'Settings' })).toBeInTheDocument()
    })

    it('shows default tab content', () => {
      const component: A2UIComponent = {
        id: 'tabs-1',
        type: 'tabs',
        properties: {
          defaultValue: 'tab1',
          tabs: [
            { value: 'tab1', label: 'First', content: 'First tab content' },
            { value: 'tab2', label: 'Second', content: 'Second tab content' },
          ],
        },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)

      expect(screen.getByText('First tab content')).toBeInTheDocument()
      expect(screen.queryByText('Second tab content')).not.toBeInTheDocument()
    })

    it('marks default tab as selected', () => {
      const component: A2UIComponent = {
        id: 'tabs-1',
        type: 'tabs',
        properties: {
          defaultValue: 'tab2',
          tabs: [
            { value: 'tab1', label: 'First' },
            { value: 'tab2', label: 'Second' },
          ],
        },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)

      const secondTab = screen.getByRole('tab', { name: 'Second' })
      expect(secondTab).toHaveAttribute('data-state', 'active')
    })
  })

  describe('User Interaction', () => {
    it('switches tabs on click', async () => {
      const component: A2UIComponent = {
        id: 'tabs-1',
        type: 'tabs',
        properties: {
          defaultValue: 'tab1',
          tabs: [
            { value: 'tab1', label: 'First', content: 'First content' },
            { value: 'tab2', label: 'Second', content: 'Second content' },
          ],
        },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)

      expect(screen.getByText('First content')).toBeInTheDocument()

      const secondTab = screen.getByRole('tab', { name: 'Second' })
      await userEvent.click(secondTab)

      expect(screen.getByText('Second content')).toBeInTheDocument()
      expect(screen.queryByText('First content')).not.toBeInTheDocument()
    })

    it('calls onAction when tab changes', async () => {
      const onAction = vi.fn()
      const component: A2UIComponent = {
        id: 'tabs-1',
        type: 'tabs',
        properties: {
          defaultValue: 'tab1',
          action: 'tab-change',
          tabs: [
            { value: 'tab1', label: 'First' },
            { value: 'tab2', label: 'Second' },
          ],
        },
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={onAction} />)

      const secondTab = screen.getByRole('tab', { name: 'Second' })
      await userEvent.click(secondTab)

      expect(onAction).toHaveBeenCalledWith('tab-change', {
        componentId: 'tabs-1',
        value: 'tab2',
      })
    })
  })

  describe('Tabs with Children Components', () => {
    it('renders child components in tab content', () => {
      const component: A2UIComponent = {
        id: 'tabs-1',
        type: 'tabs',
        properties: {
          defaultValue: 'tab1',
        },
        children: [
          {
            id: 'tab1-trigger',
            type: 'tab-trigger',
            properties: { value: 'tab1', label: 'Profile' },
          },
          {
            id: 'tab1-content',
            type: 'tab-content',
            properties: { value: 'tab1' },
            children: [
              {
                id: 'text-1',
                type: 'text',
                properties: { value: 'Profile information' },
              },
            ],
          },
          {
            id: 'tab2-trigger',
            type: 'tab-trigger',
            properties: { value: 'tab2', label: 'Settings' },
          },
          {
            id: 'tab2-content',
            type: 'tab-content',
            properties: { value: 'tab2' },
            children: [
              {
                id: 'text-2',
                type: 'text',
                properties: { value: 'Settings panel' },
              },
            ],
          },
        ],
      }

      render(<ComponentMapper component={component} dataModel={{}} onAction={vi.fn()} />)

      expect(screen.getByRole('tab', { name: 'Profile' })).toBeInTheDocument()
      expect(screen.getByText('Profile information')).toBeInTheDocument()
    })
  })

  describe('Data Binding', () => {
    it('binds default value from data model', () => {
      const component: A2UIComponent = {
        id: 'tabs-1',
        type: 'tabs',
        properties: {
          defaultValue: '/ui/activeTab',
          tabs: [
            { value: 'tab1', label: 'First', content: 'First content' },
            { value: 'tab2', label: 'Second', content: 'Second content' },
          ],
        },
      }

      const dataModel = {
        ui: { activeTab: 'tab2' },
      }

      render(<ComponentMapper component={component} dataModel={dataModel} onAction={vi.fn()} />)

      expect(screen.getByText('Second content')).toBeInTheDocument()
    })
  })
})
