"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.snapshotOf = void 0;

var _create = require("./create");

/*
	flushEffects: true  - allow useEffects to complete before creating the rendered component
				  false - default behaviour
*/
const snapshotOf = (component, options) => (0, _create.create)(component, options).toJSON();

exports.snapshotOf = snapshotOf;