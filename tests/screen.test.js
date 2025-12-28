import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import Alpine from 'alpinejs'
import screen from '../src/index.js'

// Mock ResizeObserver
class ResizeObserverMock {
    constructor(callback) {
        this.callback = callback
        this.elements = []
        ResizeObserverMock.instances.push(this)
    }
    observe(el) {
        this.elements.push(el)
    }
    disconnect() {
        this.elements = []
    }
    // Helper to trigger resize
    trigger() {
        this.callback(this.elements.map(el => ({ target: el })))
    }
}
ResizeObserverMock.instances = []

beforeEach(() => {
    ResizeObserverMock.instances = []
    global.ResizeObserver = ResizeObserverMock
    document.body.innerHTML = ''
})

afterEach(() => {
    delete global.ResizeObserver
})

describe('Alpine.js v3 - Screen Plugin', () => {
    beforeEach(() => {
        Alpine.plugin(screen)
    })

    afterEach(() => {
        Alpine.stopObservingMutations()
        document.body.innerHTML = ''
    })

    describe('$width magic', () => {
        it('returns window.outerWidth', async () => {
            document.body.innerHTML = `
                <div x-data="{ w: 0 }">
                    <span x-text="$width" data-testid="width"></span>
                </div>
            `
            Alpine.start()
            await vi.waitFor(() => {
                const el = document.querySelector('[data-testid="width"]')
                expect(el.textContent).toBe(String(window.outerWidth))
            })
        })
    })

    describe('$height magic', () => {
        it('returns window.outerHeight', async () => {
            document.body.innerHTML = `
                <div x-data="{ h: 0 }">
                    <span x-text="$height" data-testid="height"></span>
                </div>
            `
            Alpine.start()
            await vi.waitFor(() => {
                const el = document.querySelector('[data-testid="height"]')
                expect(el.textContent).toBe(String(window.outerHeight))
            })
        })
    })

    describe('x-screen directive', () => {
        it('executes expression on resize', async () => {
            document.body.innerHTML = `
                <div x-data="{ count: 0 }" x-screen="count++">
                    <span x-text="count" data-testid="count"></span>
                </div>
            `
            Alpine.start()

            await vi.waitFor(() => {
                expect(ResizeObserverMock.instances.length).toBeGreaterThan(0)
            })

            const observer = ResizeObserverMock.instances[0]
            observer.trigger()

            await vi.waitFor(() => {
                const el = document.querySelector('[data-testid="count"]')
                expect(Number(el.textContent)).toBeGreaterThan(0)
            })
        })

        it('supports .once modifier', async () => {
            document.body.innerHTML = `
                <div x-data="{ count: 0 }" x-screen.once="count++">
                    <span x-text="count" data-testid="count"></span>
                </div>
            `
            Alpine.start()

            await vi.waitFor(() => {
                expect(ResizeObserverMock.instances.length).toBeGreaterThan(0)
            })

            const observer = ResizeObserverMock.instances[0]

            // Trigger multiple times
            observer.trigger()
            observer.trigger()
            observer.trigger()

            await vi.waitFor(() => {
                const el = document.querySelector('[data-testid="count"]')
                // Should only increment once due to .once modifier
                expect(Number(el.textContent)).toBe(1)
            })
        })
    })
})

describe('Version detection', () => {
    it('detects Alpine v3 via Alpine.magic function', () => {
        expect(typeof Alpine.magic).toBe('function')
    })
})
