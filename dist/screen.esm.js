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
  Alpine.magic("width", () => {
    return window.outerWidth;
  });
  Alpine.magic("height", () => {
    return window.outerHeight;
  });
};
var src_default = Screen;

// builds/module.js
var module_default = src_default;
export {
  module_default as default
};
