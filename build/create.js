"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = void 0;

var _reactTestRenderer = require("react-test-renderer");

/*
	flushEffects: true  - allow useEffects to complete before creating the rendered component
				  false - default behaviour
*/
const create = (component, options) => {
  let renderer;

  if (options?.flushEffects) {
    (0, _reactTestRenderer.act)(() => {
      renderer = (0, _reactTestRenderer.create)(component);
    });
  } else {
    renderer = (0, _reactTestRenderer.create)(component);
  }

  return renderer;
};

exports.create = create;