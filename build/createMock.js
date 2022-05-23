"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMock = void 0;

var _lodash = _interopRequireDefault(require("lodash.snakecase"));

var _react = _interopRequireDefault(require("react"));

var _recursivelyProcessProps = require("./utils/recursivelyProcessProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Mock = ({
  $name,
  children,
  element = "div",
  ...props
}) => {
  const dataProps = Object.entries(props).reduce((acc, [prop, val]) => ({ ...acc,
    [`data-${(0, _lodash.default)(prop)}`]: (0, _recursivelyProcessProps.recursivelyProcessProps)(prop, val)
  }), {
    "data-component": `<${$name} />`
  });
  const childrenToRender = typeof children === "function" ? children(props) : children;

  switch (element) {
    case "div":
      return /*#__PURE__*/_react.default.createElement("div", dataProps, childrenToRender);

    case "span":
      return /*#__PURE__*/_react.default.createElement("span", dataProps, childrenToRender);

    default:
      break;
  }
};

const createMock = args => {
  let elementProps = {
    $name: ""
  };

  if (typeof args === "string") {
    elementProps.$name = args;
  } else {
    elementProps = { ...args.props,
      element: args.element,
      $name: args.name
    };
  }

  return jest.fn((override = {}) => /*#__PURE__*/_react.default.createElement(Mock, _extends({}, elementProps, override))).mockName(elementProps.$name);
};

exports.createMock = createMock;