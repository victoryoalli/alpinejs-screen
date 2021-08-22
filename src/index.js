const Screen = function (Alpine) {
    Alpine.directive('screen', (el, obj, { evaluateLater, effect, cleanup }) => {
        let { value, expression, modifiers } = obj;
        let evaluate = evaluateLater(expression);
        let resizeObserver = new ResizeObserver(entries => {
            entries.forEach(entry => {
                evaluate((value) => {
                    //console.log('condition', value)
                })
                modifiers.includes('once') && observer.disconnect()
            })
        })
        resizeObserver.observe(el);
        cleanup(() => observer.disconnect())
    })
}

export default  Screen
