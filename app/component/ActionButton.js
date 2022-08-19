import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ROBOTO_MEDIUM, SECONDARY_COLOR, WHITE} from '../styles/Fonts&Colors';
import {HP} from '../styles/Dimesions';

const ActionButton = ({children, callBack, props, style}) => {
  return (
    <Pressable
      {...props}
      onPress={() => {
        callBack && callBack();
      }}
      android_ripple={{
        borderless: false,
      }}
      style={[styles.actionBtn, {...style}]}>
      {children}
      {/* <Text styles={styles.actionBtnTxt}>{text}</Text> */}
    </Pressable>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  actionBtn: {
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SECONDARY_COLOR,
    height: HP(45),
    alignSelf: 'center',
  },
  actionBtnTxt: {
    color: WHITE,
    fontFamily: ROBOTO_MEDIUM,
    fontSize: 16,
  },
});