/**
 * Image Adapter Tests (Issue #9)
 * TDD: RED phase - Write failing tests first
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ComponentMapper } from '../../src/components/ComponentMapper'
import type { A2UIComponent } from '@ainative/ai-kit-a2ui-core/types'

describe('Image Component Adapter', () => {
  it('renders a plain img element by default', () => {
    const component: A2UIComponent = {
      id: 'img-1',
      type: 'image',
      properties: { src: 'https://example.com/photo.jpg', alt: 'A photo' },
    }

    render(<ComponentMapper component={component} componentsById={{}} dataModel={{}} onAction={() => {}} />)

    const img = screen.getByRole('img', { name: 'A photo' })
    expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg')
  })

  it('renders as a circular Avatar when circular is true', () => {
    const component: A2UIComponent = {
      id: 'img-1',
      type: 'image',
      properties: { src: 'https://example.com/avatar.jpg', alt: 'User avatar', circular: true },
    }

    const { container } = render(
      <ComponentMapper component={component} componentsById={{}} dataModel={{}} onAction={() => {}} />
    )

    expect(container.querySelector('.rounded-full')).toBeInTheDocument()
  })

  it('resolves src from the data model via JSON Pointer', () => {
    const component: A2UIComponent = {
      id: 'img-1',
      type: 'image',
      properties: { src: '/user/avatarUrl', alt: 'Avatar' },
    }

    render(
      <ComponentMapper
        component={component}
        dataModel={{ user: { avatarUrl: 'https://example.com/me.jpg' } }}
        onAction={() => {}}
      />
    )

    expect(screen.getByRole('img', { name: 'Avatar' })).toHaveAttribute(
      'src',
      'https://example.com/me.jpg'
    )
  })
})
