import '@testing-library/jest-dom'

// Mock ResizeObserver for Radix UI components (Slider, etc.)
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock pointer capture APIs for Radix UI Select
if (typeof Element !== 'undefined') {
  Element.prototype.hasPointerCapture = function () {
    return false
  }
  Element.prototype.setPointerCapture = function () {}
  Element.prototype.releasePointerCapture = function () {}
  Element.prototype.scrollIntoView = function () {}
}
