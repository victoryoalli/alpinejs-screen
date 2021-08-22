(() => {
  // src/index.js
  var Screen = function(Alpine) {
    Alpine.directive("screen", (el, obj, { evaluateLater, effect, cleanup }) => {
      let { value, expression, modifiers } = obj;
      let evaluate = evaluateLater(expression);
      let resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          evaluate((value2) => {
          });
          modifiers.includes("once") && observer.disconnect();
        });
      });
      resizeObserver.observe(el);
      cleanup(() => observer.disconnect());
    });
  };
  var src_default = Screen;

  // builds/cdn.js
  document.addEventListener("alpine:init", () => {
    window.Alpine.plugin(src_default);
  });
})();
