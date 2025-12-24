# Product Requirements Document: @ainative/ai-kit-a2ui (React Renderer)

**Version:** 1.0
**Status:** Planning
**Timeline:** Weeks 1-4 (Phase 1)
**Story Points:** 21
**Last Updated:** 2025-12-23

---

## Executive Summary

Build a production-ready A2UI renderer for React 18.3+ that enables AI agents to dynamically generate rich, interactive user interfaces using declarative JSON. The renderer will map A2UI's 17 standard components to shadcn/ui React components, providing a secure, type-safe bridge between agent-generated UIs and React applications.

---

## Problem Statement

**Current State:**
- AI agents struggle to present rich, interactive UIs to users
- Running agent-generated code presents security risks
- Cross-platform UI generation is complex and inconsistent
- No standardized way for React apps to render agent UIs

**Target Users:**
- React developers building AI-powered applications
- Product teams integrating conversational AI with dynamic UIs
- Enterprise developers needing secure agent-to-user interfaces

**Pain Points:**
1. Security concerns with executing agent-generated code
2. Manual UI construction for each agent interaction
3. Lack of framework-specific A2UI implementation for React
4. Complex state management for agent-driven UIs

---

## Solution Overview

A React library (`@ainative/ai-kit-a2ui`) that:

1. **Renders A2UI JSON** - Converts declarative A2UI protocol into React components
2. **Maps to shadcn/ui** - Uses production-ready, accessible component library
3. **Manages State** - Handles WebSocket connections, data binding, and reactivity
4. **Provides Hooks** - Exposes React hooks for agent integration
5. **Ensures Security** - Only renders pre-approved components, no code execution

---

## Goals & Objectives

### Primary Goals
1. ✅ Render all 17 A2UI standard components in React
2. ✅ Achieve 80%+ test coverage
3. ✅ Provide production-ready package on NPM
4. ✅ Support React 18.3+ with full type safety

### Success Metrics
- **Performance:** First component render < 100ms
- **Bundle Size:** < 150 KB gzipped
- **Test Coverage:** ≥ 80%
- **Type Safety:** 100% TypeScript strict mode
- **Documentation:** All APIs documented with examples

### Non-Goals (Out of Scope)
- ❌ Support for React < 18 (hooks required)
- ❌ Server-side rendering (see Next.js package)
- ❌ Mobile-specific optimizations (focus on web)
- ❌ Custom component registries (Phase 2)

---

## Technical Requirements

### Dependencies
```json
{
  "react": "^18.3.0",
  "react-dom": "^18.3.0",
  "@radix-ui/react-*": "latest",
  "tailwindcss": "^3.4.0",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.0.0"
}
```

### Build Requirements
- **TypeScript:** 5.0+ (strict: true)
- **Build Tool:** tsup or Vite library mode
- **Output:** ESM + CJS + TypeScript definitions
- **Testing:** Vitest + @testing-library/react

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern evergreen browsers

---

## Component Mapping (17 Components)

### Layout Components
| A2UI Component | React Component | shadcn/ui | Priority |
|---------------|-----------------|-----------|----------|
| Card | `<Card>` | ✅ | P0 |
| Row | `<div style={{display: 'flex'}}>` | Native | P0 |
| Column | `<div style={{display: 'flex', flexDirection: 'column'}}>` | Native | P0 |
| Modal | `<Dialog>` | ✅ | P0 |
| Tabs | `<Tabs>` | ✅ | P0 |
| List | `<ScrollArea>` | ✅ | P0 |

### Content Components
| A2UI Component | React Component | shadcn/ui | Priority |
|---------------|-----------------|-----------|----------|
| Text | `<h1>` - `<p>` | Native | P0 |
| Image | `<Avatar>` or `<img>` | ✅ (Avatar) | P0 |
| Video | `<video>` | Native | P1 |
| AudioPlayer | Custom component | Native | P1 |
| Icon | Radix Icons | ✅ | P0 |

### Input Components
| A2UI Component | React Component | shadcn/ui | Priority |
|---------------|-----------------|-----------|----------|
| TextField | `<Label>` + `<Input>` | ✅ | P0 |
| Button | `<Button>` | ✅ | P0 |
| CheckBox | `<Checkbox>` | ✅ | P0 |
| Slider | `<Slider>` | ✅ | P0 |
| ChoicePicker | `<Select>` or `<RadioGroup>` | ✅ | P0 |
| DateTimeInput | `<Popover>` + `<Calendar>` | ✅ | P0 |

### Utility Components
| A2UI Component | React Component | shadcn/ui | Priority |
|---------------|-----------------|-----------|----------|
| Divider | `<Separator>` | ✅ | P0 |

---

## API Design

### Main Component
```typescript
import { A2UIRenderer } from '@ainative/ai-kit-a2ui';

<A2UIRenderer
  agentUrl="wss://api.ainative.studio/agents/dashboard"
  onAction={(action, context) => {
    console.log('User action:', action, context);
  }}
  onError={(error) => {
    console.error('A2UI error:', error);
  }}
  theme="light" | "dark"
/>
```

### React Hooks
```typescript
// WebSocket connection and state management
const { components, dataModel, surfaceId, status } = useA2UIAgent(agentUrl);

// Access data by JSON Pointer
const userName = useComponentState('/user/name');

// Send actions to agent
const sendAction = useAgentAction();
sendAction('submit', { formData: {...} });

// Connection status
const { isConnected, isReconnecting } = useA2UIConnection();
```

### Data Binding
```typescript
// Automatic two-way binding
<TextField
  text={{ path: '/user/email' }}  // Auto-binds to dataModel
  onChange={(value) => {
    // dataModel updated automatically
  }}
/>
```

---

## User Stories

### Story 1: Basic Rendering
**As a** React developer
**I want to** render agent-generated UIs
**So that** my users can interact with AI through rich interfaces

**Acceptance Criteria:**
- A2UIRenderer accepts agentUrl prop
- Connects to WebSocket and receives A2UI JSON
- Renders Card with Text components
- Updates UI on agent messages

---

### Story 2: Interactive Forms
**As a** product manager
**I want** agents to generate dynamic forms
**So that** we can collect user input without hard-coding forms

**Acceptance Criteria:**
- TextField, CheckBox, Slider render correctly
- Two-way data binding works
- Form submission sends userAction to agent
- Validation errors display

---

### Story 3: Complex Layouts
**As a** UI designer
**I want** agents to create dashboard layouts
**So that** users see personalized data visualizations

**Acceptance Criteria:**
- Tabs, Modal, DateTimeInput work
- Nested component structures render
- Responsive layouts on mobile/desktop
- Theme switching (light/dark)

---

### Story 4: Developer Experience
**As a** React developer
**I want** TypeScript types and React hooks
**So that** I can integrate A2UI with confidence

**Acceptance Criteria:**
- Full TypeScript definitions
- useA2UIAgent, useComponentState hooks work
- Auto-complete in IDE
- Comprehensive documentation

---

## Implementation Timeline

### Week 1: Core Infrastructure
- [x] Issue #1: Package setup (2 pts)
- [x] Issue #2: A2UIRenderer component (3 pts)
- [x] Issue #3: ComponentMapper (5 components) (3 pts)
- **Deliverable:** Basic rendering works

### Week 2: Component Catalog Part 1
- [x] Issue #4: TextField (2 pts)
- [x] Issue #5: CheckBox, Slider, Tabs (3 pts)
- [x] Issue #6: List, Divider, ChoicePicker (3 pts)
- **Deliverable:** Interactive components work

### Week 3: Component Catalog Part 2
- [x] Issue #7: Modal (2 pts)
- [x] Issue #8: DateTimeInput (3 pts)
- [x] Issue #9: Image, Video, AudioPlayer, Icon (3 pts)
- **Deliverable:** All 17 components complete

### Week 4: Polish & Examples
- [x] Issue #10: React hooks (3 pts)
- [x] Issue #11: Data binding (2 pts)
- [x] Issue #12: Unit tests (3 pts)
- [x] Issue #13: Contact form example (2 pts)
- [x] Issue #14: Dashboard & Chat examples (2 pts)
- **Deliverable:** Production-ready v0.1.0

**Total:** 21 story points

---

## Testing Strategy

### Unit Tests (Vitest)
- All 17 component adapters
- React hooks (useA2UIAgent, useComponentState, etc.)
- Data binding logic
- WebSocket connection management

### Integration Tests
- A2UIRenderer with mock agent
- Component interactions (click, input, etc.)
- Data flow (agent → UI → agent)

### E2E Tests (Playwright)
- Full agent communication flow
- Example applications run correctly

### Coverage Target
- **Minimum:** 80%
- **Ideal:** 90%+

---

## Dependencies & Risks

### Critical Dependencies
1. **@ainative/ai-kit-a2ui-core** (Phase 5) - Core utilities
   - JSON Pointer implementation
   - WebSocket transport
   - Protocol types

2. **shadcn/ui Components** - React components
   - Must stay compatible with latest versions
   - Radix UI updates may break components

### Risks & Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|-----------|------------|
| A2UI spec changes | High | Medium | Lock to v0.9, add migration guide |
| shadcn/ui breaking changes | Medium | Low | Pin versions, test upgrades |
| Bundle size too large | Medium | Low | Tree-shaking, code splitting |
| Performance issues | High | Low | Profiling, React.memo, virtual scrolling |

---

## Success Criteria

### Must Have (P0)
- ✅ All 17 components render correctly
- ✅ 80%+ test coverage
- ✅ TypeScript strict mode
- ✅ Published to NPM
- ✅ 3 working examples

### Should Have (P1)
- Custom component registry
- Performance optimizations (virtual scrolling)
- Storybook documentation
- Chrome DevTools extension

### Nice to Have (P2)
- Figma plugin for A2UI generation
- Visual component builder
- Real-time collaboration features

---

## Launch Plan

### Phase 1: Alpha (Week 1-2)
- Core rendering works
- Internal testing only
- Version: 0.1.0-alpha.1

### Phase 2: Beta (Week 3)
- All components complete
- Public beta testing
- Version: 0.1.0-beta.1

### Phase 3: Stable (Week 4)
- Production-ready
- Full documentation
- Version: 1.0.0

### Post-Launch
- Community feedback
- Bug fixes
- Performance improvements

---

## Open Questions

1. **Q:** Should we support React 17?
   **A:** No, focus on React 18.3+ for hooks and concurrent features

2. **Q:** Should we include CSS-in-JS styling?
   **A:** No, use Tailwind CSS for consistency with shadcn/ui

3. **Q:** Should we support custom themes beyond light/dark?
   **A:** Phase 2 feature, not in initial release

4. **Q:** Should we support server-side rendering?
   **A:** No, that's the Next.js package's responsibility

---

## Appendix

### Related Documents
- A2UI Protocol v0.9: `/Users/aideveloper/a2ui/specification/0.9/`
- Implementation Strategy: `/Users/aideveloper/core/docs/reports/AIKIT_A2UI_MODERNIZATION_STRATEGY_FINAL.md`
- Repository: https://github.com/AINative-Studio/ai-kit-a2ui

### References
- React Docs: https://react.dev
- shadcn/ui: https://ui.shadcn.com
- Radix UI: https://radix-ui.com
- A2UI Protocol: https://github.com/google/a2ui

---

**Approval:**
- [ ] Product Manager
- [ ] Engineering Lead
- [ ] Design Lead
- [ ] QA Lead

**Sign-off Date:** _____________
