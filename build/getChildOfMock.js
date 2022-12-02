"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChildOfMock = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Utility method to return a nested child mock from a parent. Useful for partial snapshots. Quite slow so use sparingly.
 */
const getChildOfMock = ({
  mock,
  props = {},
  ctx = {},
  lastParent
}) => {
  var _parent$type;

  let child;
  const parent = mock(props, ctx);

  if (!(parent !== null && parent !== void 0 && (_parent$type = parent.type) !== null && _parent$type !== void 0 && _parent$type.getMockName)) {
    // eslint-disable-next-line react/display-name
    return () => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "[!Mock is not an instance of jest.fn!]");
  }

  try {
    JSON.stringify(parent, (_, val) => {
      var _val$type, _val$type$getMockName;

      if (val && ((_val$type = val.type) === null || _val$type === void 0 ? void 0 : (_val$type$getMockName = _val$type.getMockName) === null || _val$type$getMockName === void 0 ? void 0 : _val$type$getMockName.call(_val$type)) === lastParent) throw val.props.children;
      return val;
    });
  } catch (children) {
    child = () => children;
  }

  return child || (() => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, `[!No component With MockName=${lastParent} Found!]`));
};

exports.getChildOfMock = getChildOfMock;