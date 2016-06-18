'use strict';
// react

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _MainMenu = require('./MainMenu');

var _MainMenu2 = _interopRequireDefault(_MainMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_server2.default.renderToStaticMarkup(_react2.default.createElement(_MainMenu2.default, null)));