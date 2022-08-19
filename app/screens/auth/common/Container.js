import {ImageBackground, StatusBar} from 'react-native';
import React from 'react';
import {AUTH_BACKGROUND} from '../../../constants/ImageConstant';

const Container = ({children, style}) => {
  return (
    <ImageBackground
      source={AUTH_BACKGROUND}
      resizeMode="stretch"
      blurRadius={0}
      imageStyle={{flex: 1}}
      style={[
        style,
        {flex: 1, paddingHorizontal: 20, paddingTop: -StatusBar.currentHeight},
      ]}>
      {children}
    </ImageBackground>
  );
};

export default Container;
