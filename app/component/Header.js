import {Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {SvgXml} from 'react-native-svg';

import strings from '../utils/Localization';
import MenuItem from './MenuItem';
import {HEADER_HEIGHT} from '../styles/GlobalStyles';
import {BELL_ICON, LOGO_SVG} from '../constants/IconConstant';
import {
  BACKGROUND_COLOR,
  FONT_BOLD_REGULAR_SECONDARY,
} from '../styles/Fonts&Colors';
import RECT from '../assets/icons/Rectangle 29.svg';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationAction from '../services/Localization';
import {Selector} from '../store/redux/localization';

const Header = ({icon, callback}) => {
  const [getter, setter] = useState({
    isVisible: false,
  });

  const dispatch = useDispatch();

  const changeLanguage = selectedLanguage => {
    setter(prev => ({
      ...prev,
      isVisible: !prev.isVisible,
    }));
    dispatch(LocalizationAction(selectedLanguage));
    // strings.setLanguage(selected.language.shortForm);
  };

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
          <MenuItem callback={changeLanguage} getter={getter} setter={setter} />
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

export default Header;

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
