import React from 'react';
import {View, Text, StatusBar} from 'react-native';
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
      <Text style={{color: 'white', fontSize: 15}}>
        no internet connection...
      </Text>
    </View>
  );
}

export default ShowNetworkError;
