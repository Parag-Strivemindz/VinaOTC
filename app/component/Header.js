import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {FONT_MEDIUM, HEADER_HEIGHT} from '../styles/GlobalStyles';
import {
  BACKGROUND_COLOR,
  FONT_BOLD_ITALIC_SECONDARY,
  FONT_BOLD_REGULAR_SECONDARY,
} from '../styles/Fonts&Colors';
import {BELL_ICON, LOGO_SVG} from '../constants/IconConstant';
import MenuItem from './MenuItem';
import RECT from '../assets/icons/Rectangle 29.svg';

const Header = ({icon, callback}) => {
  return (
    <View style={styles.container}>
      <SvgXml
        xml={LOGO_SVG}
        style={styles.icon}
        width={'55%'}
        // viewBox={`0 0 ${100} ${100}`}
      />
      {icon ? (
        <Pressable
          onPress={() => {
            if (callback != undefined) {
              callback();
            }
          }}
          android_ripple={{
            borderless: true,
            radius: 20,
          }}
          style={styles.iconContainer}>
          <SvgXml xml={icon} style={styles.icon} />
        </Pressable>
      ) : (
        <View>
          <SvgXml
            xml={RECT}
            width={'100%'}
            style={{alignSelf: 'center', marginBottom: 3}}
          />
          {/**
           * get Commented just for now Menu Item need a look
           */}
          {/* <MenuItem /> */}
          <SvgXml
            xml={RECT}
            width={'100%'}
            style={{alignSelf: 'center', marginTop: 3}}
          />
        </View>
      )}
    </View>
  );
};

export default React.memo(Header);

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 5,
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    shadowRadius: 5,
    shadowColor: 'rgba(255,255,255,0.7)',
    backgroundColor: BACKGROUND_COLOR,
  },
  icon: {
    width: 20,
    height: 20,
  },
  headerTitleTxt: {
    color: 'black',
    fontFamily: FONT_BOLD_REGULAR_SECONDARY,
    fontSize: 25,
  },
  iconContainer: {},
});
