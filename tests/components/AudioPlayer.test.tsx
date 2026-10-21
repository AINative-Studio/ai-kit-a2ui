/**
 * AudioPlayer Adapter Tests (Issue #9)
 * TDD: RED phase - Write failing tests first
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ComponentMapper } from '../../src/components/ComponentMapper'
import type { A2UIComponent } from '@ainative/ai-kit-a2ui-core/types'

describe('AudioPlayer Component Adapter', () => {
  it('renders an audio element with play/pause/seek controls', () => {
    const component: A2UIComponent = {
      id: 'audio-1',
      type: 'audioPlayer',
      properties: { src: 'https://example.com/track.mp3' },
    }

    const { container } = render(
      <ComponentMapper component={component} componentsById={{}} dataModel={{}} onAction={() => {}} />
    )

    const audio = container.querySelector('audio')
    expect(audio).toBeInTheDocument()
    expect(audio).toHaveAttribute('controls')
    expect(audio).toHaveAttribute('src', 'https://example.com/track.mp3')
  })

  it('shows a title label when provided', () => {
    const component: A2UIComponent = {
      id: 'audio-1',
      type: 'audioPlayer',
      properties: { src: 'https://example.com/track.mp3', title: 'Episode 12' },
    }

    render(<ComponentMapper component={component} componentsById={{}} dataModel={{}} onAction={() => {}} />)

    expect(screen.getByText('Episode 12')).toBeInTheDocument()
  })

  it('resolves src from the data model via JSON Pointer', () => {
    const component: A2UIComponent = {
      id: 'audio-1',
      type: 'audioPlayer',
      properties: { src: '/episode/audioUrl' },
    }

    const { container } = render(
      <ComponentMapper
        component={component}
        dataModel={{ episode: { audioUrl: 'https://example.com/resolved.mp3' } }}
        onAction={() => {}}
      />
    )

    expect(container.querySelector('audio')).toHaveAttribute(
      'src',
      'https://example.com/resolved.mp3'
    )
  })
})
