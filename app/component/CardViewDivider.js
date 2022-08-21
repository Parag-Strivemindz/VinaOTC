import {View, Text} from 'react-native';
import React from 'react';
import {BORDER_WHITE, WHITE_50} from '../styles/Fonts&Colors';
import {HP} from '../styles/Dimesions';

const CardViewDivider = ({style}) => {
  return (
    <View
      style={[
        {
          backgroundColor: BORDER_WHITE,
          height: 1,
          opacity: 0.1,
          marginVertical: HP(15),
        },
        style,
      ]}></View>
  );
};

export default CardViewDivider;
