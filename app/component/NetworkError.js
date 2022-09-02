import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {LOGO_SVG} from '../constants/IconConstant';

function ShowNetworkError() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
      }}>
      <StatusBar backgroundColor={'black'} />
      <SvgXml xml={LOGO_SVG} />
      <Text style={{color: 'white', fontSize: 15}}>
        no internet connection...
      </Text>
    </View>
  );
}

export default ShowNetworkError;
