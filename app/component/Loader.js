import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';

const Loader = ({size, color}) => {
  return <ActivityIndicator size={size} color={color} animating={true} />;
};

export default Loader;
