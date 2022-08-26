import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';

const Loader = ({size, color, style}) => {
  return (
    <ActivityIndicator
      size={size}
      color={color}
      animating={true}
      style={{...style}}
    />
  );
};

export default Loader;
