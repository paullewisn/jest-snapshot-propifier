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
        const isMock = Boolean(value?.type?.getMockName);
        const childPropName = isMock && value?.type?.getMockName();
        return recursivelyProcessProps(childPropName || propName, value);
      });

    default:
      return propValue;
  }
};

exports.recursivelyProcessProps = recursivelyProcessProps;