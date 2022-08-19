import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';

import {Menu, MenuItem} from 'react-native-material-menu';
import {SvgXml} from 'react-native-svg';
import {ARROW_DOWN} from '../constants/IconConstant';

import {
  BALCK,
  BLACK_COLOR_90,
  ROBOTO_MEDIUM,
  ROBOTO_REGULAR,
  WHITE,
  WHITE_30,
} from '../styles/Fonts&Colors';
import {setItem} from '../utils/AsyncStorage';

const menuItem = [
  {
    id: '1',
    language: {
      value: 'English',
      shortForm: 'en',
    },
  },
  {
    id: '2',
    language: {
      value: 'Vieatnam',
      shortForm: 'vi',
    },
  },
  {
    id: '3',
    language: {
      value: 'Chinese',
      shortForm: 'zh',
    },
  },
];
function Picker({callback, setter, getter}) {
  console.log(getter.language.value);
  const hideMenu = () => setter(prev => ({...prev, isVisible: false}));

  const showMenu = () => setter(prev => ({...prev, isVisible: true}));

  const ArrowDown = ({style}) => (
    <SvgXml
      style={[
        style,
        {
          width: 16,
          height: 16,
          marginLeft: 10,
        },
      ]}
      stroke={WHITE_30}
      xml={ARROW_DOWN}
    />
  );
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Menu
        style={{
          backgroundColor: BLACK_COLOR_90,
          borderRadius: 10,
          justifyContent: 'center',
        }}
        visible={getter.isVisible}
        anchor={
          <Text
            onPress={showMenu}
            style={{color: WHITE, fontSize: 14, fontFamily: ROBOTO_REGULAR}}>
            {getter.language.value}
          </Text>
        }
        onRequestClose={hideMenu}>
        {menuItem.map((item, index, array) => {
          return (
            <View key={item.id} style={{flexDirection: 'row'}}>
              <MenuItem
                textStyle={{
                  color: WHITE,
                  fontFamily: ROBOTO_MEDIUM,
                  fontSize: 14,
                }}
                onPress={() => callback(item)}>
                {item.language.value}
              </MenuItem>
              {index == 0 && (
                <ArrowDown
                  style={{
                    position: 'absolute',
                    right: 20,
                    top: 20,
                    transform: [
                      {
                        rotate: '180deg',
                      },
                    ],
                  }}
                />
              )}
            </View>
          );
        })}
      </Menu>
      <ArrowDown />
    </View>
  );
}

export default React.memo(Picker);
