'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (props) {
  var mainmenu = [];
  props.menu.forEach(function (menuitem) {
    console.log(JSON.stringify(menuitem));
    mainmenu.push(_react2.default.createElement(
      'li',
      null,
      _react2.default.createElement(
        'a',
        { href: menuitem.href },
        menuitem.title
      )
    ));
  });
  return _react2.default.createElement(
    'ul',
    null,
    mainmenu
  );
};