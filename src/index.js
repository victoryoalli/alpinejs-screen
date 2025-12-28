const Screen = function (Alpine) {
    const isV3 = typeof Alpine.magic === 'function'

    if (isV3) {
        // Alpine.js v3
        Alpine.directive('screen', (el, obj, { evaluateLater, cleanup }) => {
            let { expression, modifiers } = obj;
            let evaluate = evaluateLater(expression);
            let resizeObserver = new ResizeObserver(entries => {
                entries.forEach(() => {
                    evaluate()
                    modifiers.includes('once') && resizeObserver.disconnect()
                })
            })
            resizeObserver.observe(el);
            cleanup(() => resizeObserver.disconnect())
        })
        Alpine.magic('width', () => window.outerWidth)
        Alpine.magic('height', () => window.outerHeight)
    } else {
        // Alpine.js v2
        Alpine.addMagicProperty('width', () => window.outerWidth)
        Alpine.addMagicProperty('height', () => window.outerHeight)

        const initHandler = (el) => {
            const expression = el.getAttribute('x-screen')
            if (!expression) return

            const modifiers = []
            const attrNames = el.getAttributeNames()
            attrNames.forEach(attr => {
                if (attr.startsWith('x-screen.')) {
                    modifiers.push(attr.replace('x-screen.', ''))
                }
            })

            let resizeObserver = new ResizeObserver(() => {
                el.__x.evaluateReturnExpression(el, expression)
                modifiers.includes('once') && resizeObserver.disconnect()
            })
            resizeObserver.observe(el)

            el.__x_screen_cleanup = () => resizeObserver.disconnect()
        }

        const destroyHandler = (el) => {
            if (el.__x_screen_cleanup) {
                el.__x_screen_cleanup()
            }
        }

        if (Alpine.onBeforeComponentInitialized) {
            Alpine.onBeforeComponentInitialized((component) => {
                initHandler(component.$el)
            })
        }

        if (Alpine.onComponentInitialized) {
            Alpine.onComponentInitialized((component) => {
                initHandler(component.$el)
            })
        }

        document.addEventListener('alpine:initialized', () => {
            document.querySelectorAll('[x-screen]').forEach(initHandler)
        })
    }
}

export default Screen
