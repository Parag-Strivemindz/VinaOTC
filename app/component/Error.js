import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Error = ({message, color, fontSize}) => {
  return (
    <Text style={[styles.erroMessageTxt, {color, fontSize}]}>{message}</Text>
  );
};

export default Error;

const styles = StyleSheet.create({
  erroMessageTxt: {
    color: 'black',
    fontSize: 14,
  },
});
