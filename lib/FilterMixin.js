'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _OptGroup = require('./OptGroup');

var _OptGroup2 = _interopRequireDefault(_OptGroup);

var _util = require('./util');

var _rcMenu = require('rc-menu');

exports['default'] = {
  filterOption: function filterOption(input, child) {
    if (!input) {
      return true;
    }
    var filterOption = this.props.filterOption;
    if (!filterOption) {
      return true;
    }
    if (child.props.disabled) {
      return false;
    }
    return filterOption.call(this, input, child);
  },
  renderFilterOptions: function renderFilterOptions(inputValue) {
    return this.renderFilterOptionsFromChildren(this.props.children, true, inputValue);
  },

  renderFilterOptionsFromChildren: function renderFilterOptionsFromChildren(children, showNotFound, iv) {
    var _this = this;

    var sel = [];
    var props = this.props;
    var inputValue = iv === undefined ? this.state.inputValue : iv;
    var childrenKeys = [];
    var tags = props.tags;
    _react2['default'].Children.forEach(children, function (child) {
      if (child.type === _OptGroup2['default']) {
        var innerItems = _this.renderFilterOptionsFromChildren(child.props.children, false);
        if (innerItems.length) {
          var label = child.props.label;
          var key = child.key;
          if (!key && typeof label === 'string') {
            key = label;
          } else if (!label && key) {
            label = key;
          }
          sel.push(_react2['default'].createElement(
            _rcMenu.ItemGroup,
            { key: key, title: label },
            innerItems
          ));
        }
        return;
      }
      var childValue = (0, _util.getValuePropValue)(child);
      if (_this.filterOption(inputValue, child)) {
        sel.push(_react2['default'].createElement(_rcMenu.Item, _extends({
          style: _util.UNSELECTABLE_STYLE,
          attribute: _util.UNSELECTABLE_ATTRIBUTE,
          value: childValue,
          key: childValue
        }, child.props)));
      }
      if (tags && !child.props.disabled) {
        childrenKeys.push(childValue);
      }
    });
    if (tags) {
      // tags value must be string
      var value = this.state.value || [];
      value = value.filter(function (singleValue) {
        return childrenKeys.indexOf(singleValue) === -1 && (!inputValue || String(singleValue).indexOf(String(inputValue)) > -1);
      });
      sel = sel.concat(value.map(function (singleValue) {
        return _react2['default'].createElement(
          _rcMenu.Item,
          {
            style: _util.UNSELECTABLE_STYLE,
            attribute: _util.UNSELECTABLE_ATTRIBUTE,
            value: singleValue,
            key: singleValue
          },
          singleValue
        );
      }));
      if (inputValue) {
        var notFindInputItem = sel.every(function (option) {
          return (0, _util.getValuePropValue)(option) !== inputValue;
        });
        if (notFindInputItem) {
          sel.unshift(_react2['default'].createElement(
            _rcMenu.Item,
            {
              style: _util.UNSELECTABLE_STYLE,
              attribute: _util.UNSELECTABLE_ATTRIBUTE,
              value: inputValue,
              key: inputValue
            },
            inputValue
          ));
        }
      }
    }
    if (!sel.length && showNotFound && props.notFoundContent) {
      sel = [_react2['default'].createElement(
        _rcMenu.Item,
        {
          style: _util.UNSELECTABLE_STYLE,
          attribute: _util.UNSELECTABLE_ATTRIBUTE,
          disabled: true,
          value: 'NOT_FOUND',
          key: 'NOT_FOUND'
        },
        props.notFoundContent
      )];
    }
    return sel;
  }
};
module.exports = exports['default'];