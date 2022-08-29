import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';

const Loader = ({size, color, style}) => {
  return (
    <ActivityIndicator
      size={size || 'small'}
      color={color || 'white'}
      animating={true}
      style={{...style}}
    />
  );
};

export default Loader;
