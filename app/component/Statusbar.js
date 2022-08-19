import React from 'react';
import {StyleSheet, Text, View, StatusBar as Bar} from 'react-native';

const Statusbar = ({barStyle, backgroundColor}) => {
  return (
    <Bar
      backgroundColor={'rgba(255,255,255,0.5)'}
      barStyle={barStyle}
      animated={true}
    />
  );
};

export default Statusbar;

const styles = StyleSheet.create({});
