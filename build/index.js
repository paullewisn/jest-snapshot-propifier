"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createMock = require("./createMock");

Object.keys(_createMock).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _createMock[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _createMock[key];
    }
  });
});

var _create = require("./create");

Object.keys(_create).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _create[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _create[key];
    }
  });
});

var _snapshotOf = require("./snapshotOf");

Object.keys(_snapshotOf).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _snapshotOf[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _snapshotOf[key];
    }
  });
});

var _getChildOfMock = require("./getChildOfMock");

Object.keys(_getChildOfMock).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getChildOfMock[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _getChildOfMock[key];
    }
  });
});