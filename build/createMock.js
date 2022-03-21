"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMock = void 0;

var _lodash = _interopRequireDefault(require("lodash.snakecase"));

var _react = _interopRequireDefault(require("react"));

var _recursivelyProcessProps = require("./utils/recursivelyProcessProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      return <div {...dataProps}>{childrenToRender}</div>;

    case "span":
      return <span {...dataProps}>{childrenToRender}</span>;

    default:
      break;
  }
};

const createMock = ({
  name,
  props,
  element
}) => jest.fn((override = {}) => <Mock $name={name} {...props} {...override} element={element} />).mockName(name);

exports.createMock = createMock;