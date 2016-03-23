'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _rcTrigger = require('rc-trigger');

var _rcTrigger2 = _interopRequireDefault(_rcTrigger);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DropdownMenu = require('./DropdownMenu');

var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var BUILT_IN_PLACEMENTS = {
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  }
};

var SelectTrigger = _react2['default'].createClass({
  displayName: 'SelectTrigger',

  propTypes: {
    dropdownMatchSelectWidth: _react.PropTypes.bool,
    visible: _react.PropTypes.bool,
    filterOption: _react.PropTypes.any,
    options: _react.PropTypes.any,
    prefixCls: _react.PropTypes.string,
    popupClassName: _react.PropTypes.string,
    children: _react.PropTypes.any
  },

  componentDidUpdate: function componentDidUpdate() {
    if (this.props.dropdownMatchSelectWidth && this.props.visible) {
      var dropdownDOMNode = this.getPopupDOMNode();
      if (dropdownDOMNode) {
        dropdownDOMNode.style.width = _reactDom2['default'].findDOMNode(this).offsetWidth + 'px';
      }
    }
  },

  getInnerMenu: function getInnerMenu() {
    return this.popupMenu && this.popupMenu.refs.menu;
  },

  getPopupDOMNode: function getPopupDOMNode() {
    return this.refs.trigger.getPopupDomNode();
  },

  getDropdownElement: function getDropdownElement(newProps) {
    var props = this.props;
    return _react2['default'].createElement(_DropdownMenu2['default'], _extends({
      ref: this.saveMenu
    }, newProps, {
      prefixCls: this.getDropdownPrefixCls(),
      onMenuSelect: props.onMenuSelect,
      onMenuDeselect: props.onMenuDeselect,
      value: props.value,
      defaultActiveFirstOption: props.defaultActiveFirstOption,
      dropdownMenuStyle: props.dropdownMenuStyle
    }));
  },

  getDropdownTransitionName: function getDropdownTransitionName() {
    var props = this.props;
    var transitionName = props.transitionName;
    if (!transitionName && props.animation) {
      transitionName = this.getDropdownPrefixCls() + '-' + props.animation;
    }
    return transitionName;
  },

  getDropdownPrefixCls: function getDropdownPrefixCls() {
    return this.props.prefixCls + '-dropdown';
  },

  saveMenu: function saveMenu(menu) {
    this.popupMenu = menu;
  },
  render: function render() {
    var _popupClassName;

    var props = this.props;
    var multiple = props.multiple;
    var visible = props.visible;
    var inputValue = props.inputValue;

    var dropdownPrefixCls = this.getDropdownPrefixCls();
    var popupClassName = (_popupClassName = {}, _defineProperty(_popupClassName, props.dropdownClassName, !!props.dropdownClassName), _defineProperty(_popupClassName, dropdownPrefixCls + '--' + (multiple ? 'multiple' : 'single'), 1), _popupClassName);
    var search = multiple || props.combobox || !props.showSearch ? null : _react2['default'].createElement(
      'span',
      { className: dropdownPrefixCls + '-search' },
      props.inputElement
    );
    var popupElement = this.getDropdownElement({
      menuItems: props.options,
      search: search,
      multiple: multiple,
      inputValue: inputValue,
      visible: visible
    });
    return _react2['default'].createElement(
      _rcTrigger2['default'],
      _extends({}, props, {
        action: props.disabled ? [] : ['click'],
        hideAction: props.disabled ? [] : ['blur'],
        ref: 'trigger',
        popupPlacement: 'bottomLeft',
        builtinPlacements: BUILT_IN_PLACEMENTS,
        prefixCls: dropdownPrefixCls,
        popupTransitionName: this.getDropdownTransitionName(),
        onPopupVisibleChange: props.onDropdownVisibleChange,
        popup: popupElement,
        popupVisible: visible,
        popupClassName: (0, _classnames2['default'])(popupClassName),
        popupStyle: props.dropdownStyle
      }),
      props.children
    );
  }
});

exports['default'] = SelectTrigger;
module.exports = exports['default'];