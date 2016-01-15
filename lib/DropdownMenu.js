'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _util = require('./util');

var _rcMenu = require('rc-menu');

var _rcMenu2 = _interopRequireDefault(_rcMenu);

var DropdownMenu = _react2['default'].createClass({
  displayName: 'DropdownMenu',

  propTypes: {
    prefixCls: _react2['default'].PropTypes.string,
    menuItems: _react2['default'].PropTypes.any,
    search: _react2['default'].PropTypes.any
  },

  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
    // freeze when hide
    return nextProps.visible;
  },

  renderMenu: function renderMenu() {
    var props = this.props;
    var menuItems = props.menuItems;
    if (menuItems && menuItems.length) {
      var menuProps = {};
      if (props.multiple) {
        menuProps.onDeselect = props.onMenuDeselect;
        menuProps.onSelect = props.onMenuSelect;
      } else {
        menuProps.onClick = props.onMenuSelect;
      }
      var value = props.value;
      var selectedKeys = (0, _util.getSelectKeys)(menuItems, value);
      var activeKey = undefined;
      if (!props.multiple) {
        if (!activeKey && selectedKeys.length === 1) {
          activeKey = selectedKeys[0];
        }
      }
      return _react2['default'].createElement(
        _rcMenu2['default'],
        _extends({
          ref: 'menu',
          style: props.dropdownMenuStyle,
          defaultActiveFirst: true,
          activeKey: activeKey,
          multiple: props.multiple,
          focusable: false
        }, menuProps, {
          selectedKeys: selectedKeys,
          prefixCls: props.prefixCls + '-menu' }),
        menuItems
      );
    }
    return null;
  },
  render: function render() {
    return _react2['default'].createElement(
      'div',
      null,
      this.props.search,
      this.renderMenu()
    );
  }
});

exports['default'] = DropdownMenu;
module.exports = exports['default'];