'use strict';

var React = require('react-native');


var {
  PropTypes,
  View,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback
} = React;

var ItemCheckbox = React.createClass({
  propTypes: {
    icon: PropTypes.func,
    icon_check: PropTypes.string,
    icon_open: PropTypes.string,
    onCheck: React.PropTypes.func,
    onUncheck: React.PropTypes.func,
    size: React.PropTypes.number,
    backgroundColor: React.PropTypes.String,
    color: React.PropTypes.String,
    iconSize: React.PropTypes.String,
    checked: React.PropTypes.bool,
    style: React.PropTypes.func,
    text: PropTypes.string,
    disabled: PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      icon: null,
      onCheck: null,
      onUncheck: null,
      icon_check: "check-square",
      icon_open: "square-o",
      size: 30,
      backgroundColor: 'white',
      color: 'grey',
      iconSize: 'normal,',
      checked: false,
      text: 'MISSING TEXT',
      disabled: false
    };
  },

  getInitialState: function () {
    return {
      checked: this.props.checked,
      bg_color: this.props.backgroundColor
    };
  },

  _getCircleCheckStyle: function() {
    return {
      width: this.props.size,
      height: this.props.size,
      backgroundColor: this.state.bg_color,
      borderColor: this.props.color,
      borderWidth: 2,
      borderRadius: this.props.size/2,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 2,
    };
  },

  _getIconSize: function() {
    if (this.props.iconSize == 'small') {
      return this.props.size * 0.5;
    } else if (this.props.iconSize == 'normal') {
      return this.props.size * 0.6;
    } else {
      return this.props.size * 0.7;
    }
  },

  _getCircleIconStyle: function() {
    return {
      color: this.props.backgroundColor,
      flex: 1,
      width: this._getIconSize(),
      height: this._getIconSize(),
    };
  },

  _completeProgress: function() {
    if (this.state.checked) {
      this.setState({
        checked: false,
        bg_color: this.props.backgroundColor,
      });
      if (this.props.onUncheck) {
        this.props.onUncheck();
      }
    } else {
      this.setState({
        checked: true,
        bg_color: this.props.color,
      });
      if (this.props.onCheck) {
        this.props.onCheck();
      }
    }
  },

  componentDidMount: function() {
    if (this.props.checked) {
      this._completeProgress();
    }
  },

  render: function() {
    var iconName=this.props.icon_open;
    if (this.state.checked) {
      iconName=this.props.icon_check;
    }

    let Icon = this.props.icon;
    
    if (this.props.disabled) {
      iconName = this.props.checked ? this.props.icon_check : this.props.icon_open;
      return (
        <View style={this.props.style}>
          <TouchableWithoutFeedback>
            <View style={{
                flexDirection: 'row',
                flex:1
              }}>
              <Icon
                  name={iconName}
                  size={20}
                  style={this._getCircleIconStyle}
              />
              <Text> {this.props.text}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        );
      } else {
        return(
          <View style={this.props.style}>
            <TouchableHighlight
                onPress={this._completeProgress}
            >
              <View style={{
                  flexDirection: 'row',
                  flex:1
                }}>
                <Icon
                    name={iconName}
                    size={20}
                    style={this._getCircleIconStyle}
                />
                <Text> {this.props.text}</Text>
              </View>
            </TouchableHighlight>
          </View>
        ); //return
      }//else
    } //render
});

module.exports = ItemCheckbox;
