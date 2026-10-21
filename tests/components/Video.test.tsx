/**
 * Video Adapter Tests (Issue #9)
 * TDD: RED phase - Write failing tests first
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ComponentMapper } from '../../src/components/ComponentMapper'
import type { A2UIComponent } from '@ainative/ai-kit-a2ui-core/types'

describe('Video Component Adapter', () => {
  it('renders a video element with controls', () => {
    const component: A2UIComponent = {
      id: 'video-1',
      type: 'video',
      properties: { src: 'https://example.com/clip.mp4' },
    }

    const { container } = render(
      <ComponentMapper component={component} componentsById={{}} dataModel={{}} onAction={() => {}} />
    )

    const video = container.querySelector('video')
    expect(video).toBeInTheDocument()
    expect(video).toHaveAttribute('controls')
    expect(video).toHaveAttribute('src', 'https://example.com/clip.mp4')
  })

  it('wraps the video in a 16:9 aspect ratio container by default', () => {
    const component: A2UIComponent = {
      id: 'video-1',
      type: 'video',
      properties: { src: 'https://example.com/clip.mp4' },
    }

    const { container } = render(
      <ComponentMapper component={component} componentsById={{}} dataModel={{}} onAction={() => {}} />
    )

    expect(container.querySelector('[data-radix-aspect-ratio-wrapper]')).toBeInTheDocument()
  })

  it('resolves src from the data model via JSON Pointer', () => {
    const component: A2UIComponent = {
      id: 'video-1',
      type: 'video',
      properties: { src: '/media/clipUrl' },
    }

    const { container } = render(
      <ComponentMapper
        component={component}
        dataModel={{ media: { clipUrl: 'https://example.com/resolved.mp4' } }}
        onAction={() => {}}
      />
    )

    expect(container.querySelector('video')).toHaveAttribute(
      'src',
      'https://example.com/resolved.mp4'
    )
  })

  it('applies poster when provided', () => {
    const component: A2UIComponent = {
      id: 'video-1',
      type: 'video',
      properties: { src: 'https://example.com/clip.mp4', poster: 'https://example.com/poster.jpg' },
    }

    const { container } = render(
      <ComponentMapper component={component} componentsById={{}} dataModel={{}} onAction={() => {}} />
    )

    expect(container.querySelector('video')).toHaveAttribute(
      'poster',
      'https://example.com/poster.jpg'
    )
  })
})
