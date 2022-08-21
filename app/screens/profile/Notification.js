import React, {Component} from 'react';
import {Text, ScrollView, View, StyleSheet} from 'react-native';
import Neumorphism from 'react-native-neumorphism';
import {BACKGROUND_COLOR, WHITE} from '../../styles/Fonts&Colors';

export default class Notification extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: BACKGROUND_COLOR,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Neumorphism
          //   style={{
          //     backgroundColor: BACKGROUND_COLOR,
          //   }}
          lightColor={'#FFFFFF80'}
          darkColor={'#FFFFFF80'}
          shapeType={'pressed'}
          radius={100}>
          <View style={{width: 200, height: 200}}>
            <Text>TEST</Text>
          </View>
        </Neumorphism>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  roundedButtonContainer: {
    height: 80,
    width: 80,
    backgroundColor: '#252525',
    shadowColor: '#181818',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    borderRadius: 5,
    shadowOffset: {
      height: 3,
      width: 3,
    },
    border: 1,
    marginBottom: 20,
    elevation: 5,
  },
  roundedButton: {
    height: 80,
    width: 80,
    shadowColor: '#2b2b2b',
    shadowOpacity: 0.7,
    shadowRadius: 3,
    borderRadius: 5,
    shadowOffset: {
      height: -3,
      width: -3,
    },
    border: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
  },
  text: {
    color: 'white',
    fontSize: 36,
  },
});
