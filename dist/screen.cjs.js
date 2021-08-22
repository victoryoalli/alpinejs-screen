var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// builds/module.js
__export(exports, {
  default: () => module_default
});

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
