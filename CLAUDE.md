# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run build          # Build all distribution files (CDN, ESM, CJS)
npm run build --watch  # Build with watch mode for development
npm test               # Run tests once
npm run test:watch     # Run tests in watch mode
```

## Architecture

This is an Alpine.js plugin that monitors screen/element resize events. **Supports both Alpine.js v2 and v3** with automatic version detection.

The plugin provides:

- **`x-screen` directive**: Executes an expression when the element is resized (uses ResizeObserver)
- **`$width` magic**: Returns `window.outerWidth`
- **`$height` magic**: Returns `window.outerHeight`

### Project Structure

- `src/index.js` - Main plugin source exporting the Screen function that registers the directive and magic helpers with Alpine
- `builds/cdn.js` - CDN entry point (auto-registers plugin on `alpine:init`)
- `builds/module.js` - Module entry point (exports plugin for manual registration)
- `scripts/build.js` - esbuild configuration generating three output formats:
  - `dist/screen.min.js` - Minified browser bundle for CDN/script tags
  - `dist/screen.esm.js` - ES module format
  - `dist/screen.cjs.js` - CommonJS format for Node

### Plugin Registration Pattern

For CDN usage, the plugin auto-registers via the `alpine:init` event. For module usage, consumers must manually call `Alpine.plugin(screen)` before `Alpine.start()`.

### Version Detection

The plugin detects Alpine version by checking `typeof Alpine.magic === 'function'`:
- **v3**: Uses `Alpine.directive()` and `Alpine.magic()`
- **v2**: Uses `Alpine.addMagicProperty()` and manual directive handling via `alpine:initialized` event

### Testing

Tests use Vitest with jsdom. ResizeObserver is mocked since jsdom doesn't support it natively. Tests are located in `tests/screen.test.js`.
