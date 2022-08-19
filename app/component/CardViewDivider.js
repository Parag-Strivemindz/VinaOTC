import {View, Text} from 'react-native';
import React from 'react';
import {BORDER_WHITE} from '../styles/Fonts&Colors';

const CardViewDivider = ({style}) => {
  return (
    <View
      style={[
        {
          backgroundColor: BORDER_WHITE,
          height: 1,
          opacity: 0.1,
          marginVertical: 15,
        },
        style,
      ]}></View>
  );
};

export default CardViewDivider;
