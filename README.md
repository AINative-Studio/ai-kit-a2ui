# @ainative/ai-kit-a2ui

A2UI renderer for React 18.3+ using shadcn/ui components.

## Features

- **17 Standard Components** - Full A2UI v0.9 protocol support
- **shadcn/ui Integration** - Production-ready, accessible components
- **React Hooks** - `useA2UIAgent`, `useComponentState`, `useAgentAction`
- **TypeScript** - Full type safety with strict mode
- **Data Binding** - JSON Pointer-based reactivity
- **WebSocket Support** - Real-time agent communication

## Installation

```bash
npm install @ainative/ai-kit-a2ui
```

## Quick Start

```tsx
import { A2UIRenderer } from '@ainative/ai-kit-a2ui'

function App() {
  return (
    <A2UIRenderer
      agentUrl="wss://api.ainative.studio/agents/dashboard"
      onAction={(action, context) => {
        console.log('User action:', action, context)
      }}
    />
  )
}
```

## Documentation

See [docs/API.md](./docs/API.md) for full API documentation.

## License

MIT © AINative Studio
