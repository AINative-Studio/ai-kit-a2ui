# @ainative/ai-kit-a2ui

> Production-ready A2UI renderer for React 18.3+ using shadcn/ui components.

[![npm version](https://img.shields.io/npm/v/@ainative/ai-kit-a2ui)](https://www.npmjs.com/package/@ainative/ai-kit-a2ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://react.dev/)

React renderer for [A2UI protocol (v0.9)](https://github.com/google/a2ui) that enables AI agents to dynamically generate rich, interactive user interfaces using declarative JSON. Built with shadcn/ui for beautiful, accessible components.

## 🚀 Features

- **✅ 11/17 Components Implemented** (64.7% complete) - Text, Heading, Button, Container, Divider, TextField, CheckBox, Slider, Tabs, List, ChoicePicker
- **🎨 shadcn/ui Integration** - Production-ready, accessible Radix UI components
- **⚛️ React Hooks** - `useA2UIAgent`, `useComponentState`, `useAgentAction` (coming soon)
- **🔒 TypeScript** - Full type safety with strict mode
- **📍 JSON Pointer Data Binding** - RFC 6901 compliant reactivity
- **🔌 WebSocket Support** - Real-time agent communication
- **♿ Accessible** - WCAG 2.1 AA compliant components
- **🎭 Customizable** - Tailwind CSS theming support
- **✅ 70 Tests Passing** - Comprehensive test coverage with Vitest

## 📦 Installation

```bash
npm install @ainative/ai-kit-a2ui
```

```bash
yarn add @ainative/ai-kit-a2ui
```

```bash
pnpm add @ainative/ai-kit-a2ui
```

### Peer Dependencies

This package requires React 18.3+ and React DOM:

```bash
npm install react@^18.3.0 react-dom@^18.3.0
```

### Tailwind CSS Setup

Add the package to your Tailwind config:

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@ainative/ai-kit-a2ui/dist/**/*.{js,ts,jsx,tsx}'
  ],
  // ... rest of config
}
```

## 🎯 Quick Start

### Basic Usage

```tsx
import { A2UIRenderer } from '@ainative/ai-kit-a2ui'
import '@ainative/ai-kit-a2ui/styles.css' // Optional: Default styles

function App() {
  return (
    <A2UIRenderer
      agentUrl="wss://api.ainative.studio/agents/dashboard"
      onAction={(action, context) => {
        console.log('User action:', action, context)
      }}
      onError={(error) => {
        console.error('A2UI error:', error)
      }}
      theme="light" // or "dark"
    />
  )
}
```

### With Manual Component Rendering

```tsx
import { ComponentMapper } from '@ainative/ai-kit-a2ui/components'
import type { A2UIComponent } from '@ainative/ai-kit-a2ui-core/types'

const component: A2UIComponent = {
  id: 'card-1',
  type: 'container',
  properties: {},
  children: [
    {
      id: 'heading-1',
      type: 'heading',
      properties: { value: 'Welcome', level: 1 }
    },
    {
      id: 'text-1',
      type: 'text',
      properties: { value: 'This is a dynamic UI from an AI agent!' }
    }
  ]
}

function ManualRender() {
  const dataModel = {}
  const handleAction = (action: string, context: Record<string, unknown>) => {
    console.log('Action:', action, context)
  }

  return (
    <ComponentMapper
      component={component}
      dataModel={dataModel}
      onAction={handleAction}
    />
  )
}
```

## 🧩 Component Catalog

### ✅ Implemented Components (11/17)

#### Content Components

| Component | Type | Description | Properties | Example |
|-----------|------|-------------|------------|---------|
| **Text** | `text` | Display static or dynamic text | `value` | `{ type: 'text', properties: { value: 'Hello World' } }` |
| **Heading** | `heading` | Heading with configurable level | `value`, `level` (1-6) | `{ type: 'heading', properties: { value: 'Title', level: 2 } }` |

#### Input Components

| Component | Type | Description | Properties | Example |
|-----------|------|-------------|------------|---------|
| **Button** | `button` | Clickable button with action | `label`, `action` | `{ type: 'button', properties: { label: 'Submit', action: 'form-submit' } }` |
| **TextField** | `textField` | Text input with label | `label`, `value`, `placeholder`, `inputType`, `disabled`, `required`, `action` | `{ type: 'textField', properties: { label: 'Email', placeholder: 'you@example.com' } }` |
| **CheckBox** | `checkBox` | Checkbox with label | `label`, `checked`, `disabled`, `required`, `action` | `{ type: 'checkBox', properties: { label: 'Accept terms', checked: false } }` |
| **Slider** | `slider` | Range slider input | `label`, `value`, `min`, `max`, `step`, `disabled`, `showValue`, `action` | `{ type: 'slider', properties: { label: 'Volume', min: 0, max: 100, value: 50 } }` |
| **ChoicePicker** | `choicePicker` | Select dropdown | `label`, `value`, `placeholder`, `options`, `disabled`, `required`, `action` | `{ type: 'choicePicker', properties: { label: 'Country', options: [...] } }` |

#### Layout Components

| Component | Type | Description | Properties | Example |
|-----------|------|-------------|------------|---------|
| **Container** | `container` | Generic container for children | N/A | `{ type: 'container', children: [...] }` |
| **Tabs** | `tabs` | Tabbed navigation | `defaultValue`, `tabs`, `action` | `{ type: 'tabs', properties: { tabs: [{ value: 'tab1', label: 'Tab 1' }] } }` |
| **List** | `list` | Ordered or unordered list | `items`, `ordered`, `clickable`, `dividers`, `action` | `{ type: 'list', properties: { items: [{ id: '1', label: 'Item 1' }] } }` |

#### Utility Components

| Component | Type | Description | Properties | Example |
|-----------|------|-------------|------------|---------|
| **Divider** | `divider` | Horizontal separator | N/A | `{ type: 'divider' }` |

### 🚧 Coming Soon (6/17)

| Component | Type | Status | Estimated |
|-----------|------|--------|-----------|
| **Modal** | `modal` | In development | Issue #7 |
| **DateTimeInput** | `dateTimeInput` | Planned | Issue #8 |
| **Image** | `image` | Planned | Issue #9 |
| **Video** | `video` | Planned | Issue #9 |
| **AudioPlayer** | `audioPlayer` | Planned | Issue #9 |
| **Icon** | `icon` | Planned | Issue #9 |

## 📖 API Reference

### A2UIRenderer

Main component that connects to an agent via WebSocket and renders the UI.

```tsx
interface A2UIRendererProps {
  /** WebSocket URL to connect to agent */
  agentUrl: string

  /** Callback when user performs an action */
  onAction?: (action: string, context: Record<string, unknown>) => void

  /** Callback when an error occurs */
  onError?: (error: Error) => void

  /** Theme mode */
  theme?: 'light' | 'dark'

  /** Custom class name */
  className?: string

  /** Loading component to show during connection */
  loadingComponent?: React.ReactNode

  /** Error component to show on connection failure */
  errorComponent?: (error: Error) => React.ReactNode
}

function A2UIRenderer(props: A2UIRendererProps): JSX.Element
```

**Example:**

```tsx
<A2UIRenderer
  agentUrl="wss://api.ainative.studio/agents/chat"
  onAction={(action, context) => {
    if (action === 'send-message') {
      console.log('Message sent:', context.message)
    }
  }}
  onError={(error) => {
    console.error('Connection failed:', error)
  }}
  theme="dark"
  loadingComponent={<div>Connecting to agent...</div>}
  errorComponent={(error) => <div>Error: {error.message}</div>}
/>
```

### ComponentMapper

Renders a single A2UI component with data binding and action handling.

```tsx
interface ComponentMapperProps {
  /** The A2UI component to render */
  component: A2UIComponent

  /** The current data model for data binding */
  dataModel: Record<string, unknown>

  /** Callback when user performs an action */
  onAction: (action: string, context: Record<string, unknown>) => void
}

function ComponentMapper(props: ComponentMapperProps): JSX.Element
```

**Example:**

```tsx
const component = {
  id: 'field-1',
  type: 'textField',
  properties: {
    label: 'Username',
    value: '/user/username', // JSON Pointer
    action: 'update-username'
  }
}

const dataModel = {
  user: { username: 'alice' }
}

<ComponentMapper
  component={component}
  dataModel={dataModel}
  onAction={(action, context) => {
    console.log(action, context) // "update-username", { componentId: 'field-1', value: 'bob' }
  }}
/>
```

### React Hooks (Coming Soon)

```tsx
// useA2UIAgent - Connect to agent and manage state
const { components, dataModel, surfaceId, status } = useA2UIAgent(agentUrl)

// useComponentState - Access data by JSON Pointer
const userName = useComponentState('/user/name')

// useAgentAction - Send actions to agent
const sendAction = useAgentAction()
sendAction('submit', { formData: {...} })

// useA2UIConnection - Connection status
const { isConnected, isReconnecting } = useA2UIConnection()
```

## 🎨 Styling & Theming

### Using Tailwind CSS

Components are built with Tailwind utility classes and support custom theming:

```tsx
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Custom A2UI component colors
        'a2ui-primary': '#3b82f6',
        'a2ui-secondary': '#64748b',
      }
    }
  }
}
```

### Dark Mode

Components support dark mode via Tailwind's `dark:` variant:

```tsx
<A2UIRenderer
  agentUrl="wss://..."
  theme="dark" // Applies dark mode classes
/>
```

### Custom Styles

Override component styles using CSS modules or global styles:

```css
/* Custom styles for A2UI components */
.a2ui-textfield input {
  border-radius: 0.5rem;
  border-color: #3b82f6;
}

.a2ui-button {
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
}
```

## 📍 Data Binding

Components support JSON Pointer (RFC 6901) for data binding:

```tsx
const component = {
  id: 'email-field',
  type: 'textField',
  properties: {
    label: 'Email',
    value: '/user/profile/email', // JSON Pointer reference
    placeholder: 'you@example.com'
  }
}

const dataModel = {
  user: {
    profile: {
      email: 'alice@example.com' // Automatically bound to TextField
    }
  }
}

<ComponentMapper component={component} dataModel={dataModel} onAction={...} />
// TextField will display: alice@example.com
```

**Supported Binding Properties:**
- `value` - Initial value or JSON Pointer
- `options` - Array of options or JSON Pointer (for ChoicePicker)
- `items` - Array of items or JSON Pointer (for List)
- Any string property starting with `/` is treated as a JSON Pointer

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# UI mode (Vitest UI)
npm run test:ui
```

### Test Status

```
Test Files  8 passed (8)
     Tests  70 passed | 1 skipped (71)
  Coverage  TBD (run npm run test:coverage)
```

**Components Tested:**
- ✅ A2UIRenderer (10 tests)
- ✅ ComponentMapper (11 tests)
- ✅ TextField (11 tests)
- ✅ CheckBox (8 tests)
- ✅ Slider (8 tests)
- ✅ Tabs (7 tests)
- ✅ List (9 tests)
- ✅ ChoicePicker (7 tests, 1 skipped)

## 📦 Bundle Size

- **ESM**: ~45 KB minified, ~15 KB gzipped (excluding React)
- **Dependencies**: @ainative/ai-kit-a2ui-core, @radix-ui/react-*, clsx, tailwind-merge
- **Peer Dependencies**: React 18.3+, React DOM 18.3+

## 🛠️ Development

### Local Setup

```bash
# Clone repository
git clone https://github.com/AINative-Studio/ai-kit-a2ui.git
cd ai-kit-a2ui

# Install dependencies
npm install

# Run tests in watch mode
npm run test:watch

# Build
npm run build

# Type check
npm run type-check
```

### Project Structure

```
@ainative/ai-kit-a2ui/
├── src/
│   ├── components/
│   │   ├── A2UIRenderer.tsx        # Main renderer component
│   │   ├── ComponentMapper.tsx     # Component router
│   │   ├── ComponentRenderer.tsx   # Individual component wrapper
│   │   └── ui/                     # shadcn/ui components
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── checkbox.tsx
│   │       ├── slider.tsx
│   │       ├── tabs.tsx
│   │       └── select.tsx
│   ├── lib/
│   │   └── utils.ts                # Utility functions (cn)
│   └── index.ts                    # Public exports
├── tests/
│   ├── components/                 # Component tests
│   └── setup.ts                    # Test setup (jsdom mocks)
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

## 🔧 Configuration

### TypeScript

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Vitest

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['**/node_modules/**', '**/dist/**', '**/tests/**']
    }
  }
})
```

## 💡 Examples

### Contact Form

```tsx
const contactFormComponents: A2UIComponent[] = [
  {
    id: 'form-container',
    type: 'container',
    children: [
      {
        id: 'heading',
        type: 'heading',
        properties: { value: 'Contact Us', level: 2 }
      },
      {
        id: 'name-field',
        type: 'textField',
        properties: {
          label: 'Name',
          value: '/form/name',
          required: true,
          action: 'field-change'
        }
      },
      {
        id: 'email-field',
        type: 'textField',
        properties: {
          label: 'Email',
          value: '/form/email',
          inputType: 'email',
          required: true,
          action: 'field-change'
        }
      },
      {
        id: 'subscribe-checkbox',
        type: 'checkBox',
        properties: {
          label: 'Subscribe to newsletter',
          checked: false,
          action: 'checkbox-change'
        }
      },
      {
        id: 'submit-button',
        type: 'button',
        properties: {
          label: 'Send Message',
          action: 'submit-form'
        }
      }
    ]
  }
]

const dataModel = {
  form: { name: '', email: '' }
}

<ComponentMapper
  component={contactFormComponents[0]}
  dataModel={dataModel}
  onAction={(action, context) => {
    if (action === 'submit-form') {
      console.log('Form submitted:', dataModel.form)
    }
  }}
/>
```

### Dashboard with Tabs

```tsx
const dashboardComponents: A2UIComponent[] = [
  {
    id: 'dashboard',
    type: 'tabs',
    properties: {
      defaultValue: 'overview',
      tabs: [
        {
          value: 'overview',
          label: 'Overview',
          content: 'Dashboard overview content...'
        },
        {
          value: 'analytics',
          label: 'Analytics',
          content: 'Analytics charts and graphs...'
        },
        {
          value: 'settings',
          label: 'Settings',
          content: 'Settings panel...'
        }
      ],
      action: 'tab-change'
    }
  }
]
```

### Settings Panel

```tsx
const settingsComponents: A2UIComponent[] = [
  {
    id: 'settings',
    type: 'container',
    children: [
      {
        id: 'heading',
        type: 'heading',
        properties: { value: 'Settings', level: 1 }
      },
      {
        id: 'theme-picker',
        type: 'choicePicker',
        properties: {
          label: 'Theme',
          value: '/settings/theme',
          options: [
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'auto', label: 'Auto' }
          ],
          action: 'theme-change'
        }
      },
      {
        id: 'volume-slider',
        type: 'slider',
        properties: {
          label: 'Notification Volume',
          value: '/settings/volume',
          min: 0,
          max: 100,
          step: 10,
          showValue: true,
          action: 'volume-change'
        }
      },
      {
        id: 'notifications-checkbox',
        type: 'checkBox',
        properties: {
          label: 'Enable notifications',
          checked: '/settings/notificationsEnabled',
          action: 'notifications-toggle'
        }
      }
    ]
  }
]

const dataModel = {
  settings: {
    theme: 'dark',
    volume: 75,
    notificationsEnabled: true
  }
}
```

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Development Workflow

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/ai-kit-a2ui.git`
3. **Create branch**: `git checkout -b feature/my-feature`
4. **Make changes** following TDD (RED → GREEN → REFACTOR)
5. **Run tests**: `npm test` (all tests must pass)
6. **Commit**: `git commit -m "Add my feature"`
7. **Push**: `git push origin feature/my-feature`
8. **Create Pull Request** on GitHub

### Code Style

- **TDD Required** - Write tests first (RED), then implementation (GREEN), then refactor
- **TypeScript** - Use strict mode, no `any` types
- **Naming** - PascalCase for components, camelCase for functions
- **Formatting** - Run `npm run format` before committing

## 📝 License

MIT © [AINative Studio](https://ainative.studio)

## 🔗 Links

- **Documentation**: https://docs.ainative.studio/a2ui
- **GitHub**: https://github.com/AINative-Studio/ai-kit-a2ui
- **NPM**: https://www.npmjs.com/package/@ainative/ai-kit-a2ui
- **Core Package**: https://github.com/AINative-Studio/ai-kit-a2ui-core
- **Issues**: https://github.com/AINative-Studio/ai-kit-a2ui/issues
- **A2UI Specification**: https://github.com/google/a2ui

## 🙋 Support

- **Email**: hello@ainative.studio
- **Discord**: [AINative Community](https://discord.gg/ainative)
- **Documentation**: https://docs.ainative.studio
- **Stack Overflow**: Tag `a2ui` or `ainative`

## 🗺️ Roadmap

### v0.2.0 (Current)
- ✅ Core rendering (11/17 components)
- ✅ JSON Pointer data binding
- ✅ WebSocket transport
- ✅ TDD workflow (70+ tests)

### v0.3.0 (Next)
- 🚧 Remaining 6 components (Modal, DateTimeInput, Image, Video, AudioPlayer, Icon)
- 🚧 React Hooks (useA2UIAgent, useComponentState, useAgentAction)
- 🚧 80%+ test coverage
- 🚧 Performance optimizations

### v1.0.0 (Stable)
- 📋 All 17 standard components
- 📋 Complete React Hooks API
- 📋 Comprehensive examples
- 📋 Storybook documentation
- 📋 Chrome DevTools extension

---

**Built with ❤️ by [AINative Studio](https://ainative.studio)**

**Status**: 🟢 Alpha - 11/17 components implemented, production-ready core, active development
