import {StyleSheet, Text, View} from 'react-native';
import React, {Component, PureComponent} from 'react';

class Error extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Text
        style={[
          styles.erroMessageTxt,
          {color: this.props.color, fontSize: this.props.fontSize},
        ]}>
        {this.props.message}
      </Text>
    );
  }
}

export default Error;

const styles = StyleSheet.create({
  erroMessageTxt: {
    color: 'black',
    fontSize: 14,
  },
});
