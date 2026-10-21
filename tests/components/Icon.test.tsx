/**
 * Icon Adapter Tests (Issue #9)
 * TDD: RED phase - Write failing tests first
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ComponentMapper } from '../../src/components/ComponentMapper'
import type { A2UIComponent } from '@ainative/ai-kit-a2ui-core/types'

describe('Icon Component Adapter', () => {
  it('renders a known icon name as an svg', () => {
    const component: A2UIComponent = {
      id: 'icon-1',
      type: 'icon',
      properties: { name: 'home' },
    }

    const { container } = render(
      <ComponentMapper component={component} componentsById={{}} dataModel={{}} onAction={() => {}} />
    )

    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('falls back to a question-mark icon for an unknown name instead of crashing', () => {
    const component: A2UIComponent = {
      id: 'icon-1',
      type: 'icon',
      properties: { name: 'totally-made-up-icon-name' },
    }

    const { container } = render(
      <ComponentMapper component={component} componentsById={{}} dataModel={{}} onAction={() => {}} />
    )

    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('dispatches the action when clicked, if clickable', async () => {
    const onAction = vi.fn()
    const component: A2UIComponent = {
      id: 'icon-1',
      type: 'icon',
      properties: { name: 'close', action: 'dismiss' },
    }

    render(<ComponentMapper component={component} componentsById={{}} dataModel={{}} onAction={onAction} />)

    await userEvent.click(screen.getByRole('button'))

    expect(onAction).toHaveBeenCalledWith('dismiss', { componentId: 'icon-1' })
  })

  it('is not interactive when no action is set', () => {
    const component: A2UIComponent = {
      id: 'icon-1',
      type: 'icon',
      properties: { name: 'home' },
    }

    render(<ComponentMapper component={component} componentsById={{}} dataModel={{}} onAction={() => {}} />)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
