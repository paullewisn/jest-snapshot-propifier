"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recursivelyProcessProps = void 0;

var _react = require("react");

const recursivelyProcessProps = (propName, propValue) => {
  switch (true) {
    case propValue === null:
      return "null";

    case (0, _react.isValidElement)(propValue):
      return "[! Component to test !]";

    case typeof propValue === "function":
      return "[! Function to test !]";

    case typeof propValue === "object" && propValue.length === undefined:
      return JSON.stringify(propValue);

    case typeof propValue === "object" && propValue.length >= 0:
      return propValue.map(value => {
        var _value$type, _value$type2;

        const isMock = Boolean(value === null || value === void 0 ? void 0 : (_value$type = value.type) === null || _value$type === void 0 ? void 0 : _value$type.getMockName);
        const childPropName = isMock && (value === null || value === void 0 ? void 0 : (_value$type2 = value.type) === null || _value$type2 === void 0 ? void 0 : _value$type2.getMockName());
        return recursivelyProcessProps(childPropName || propName, value);
      });

    default:
      return propValue;
  }
};

exports.recursivelyProcessProps = recursivelyProcessProps;