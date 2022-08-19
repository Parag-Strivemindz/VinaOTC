import {View, Text} from 'react-native';
import React from 'react';
import {HP} from '../styles/Dimesions';

const HifenDivider = ({style}) => {
  return (
    <View
      style={[
        {
          alignSelf: 'center',
          width: 13,
          height: 1,
          backgroundColor: '#FFFFFF80',
          marginTop: HP(20),
        },
        style,
      ]}></View>
  );
};

export default HifenDivider;
