'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Chip = function Chip(_ref) {
  var children = _ref.children,
      close = _ref.close;

  return _react2.default.createElement(
    'div',
    { className: 'chip' },
    children,
    close ? _react2.default.createElement(
      'i',
      { className: 'material-icons' },
      'close'
    ) : null
  );
};

Chip.propTypes = {
  children: _react.PropTypes.node,
  /**
   * If show a close icon
   * @default false
   */
  close: _react.PropTypes.bool
};

exports.default = Chip;