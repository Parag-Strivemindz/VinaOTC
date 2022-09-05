import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import Proptypes from 'prop-types';
import Animated, {
  FadeIn,
  FadeOut,
  Easing,
  SlideInDown,
  SlideInUp,
  SlideOutDown,
  SlideOutUp,
  SlideInRight,
  Layout,
} from 'react-native-reanimated';

import {HP} from '../../../styles/Dimesions';
import {HIDE_ICON, SHOW_ICON} from '../../../constants/IconConstant';
import {
  BALCK,
  PLACEHOLDER_WHITE,
  SECONDARY_COLOR,
  WHITE,
  WHITE_30,
  WHITE_50,
} from '../../../styles/Fonts&Colors';
import Styles from '../Styles';
import {useSelector} from 'react-redux';
import {Selector} from '../../../store/redux/localization';
import {i18n} from '../../../i18n/lang';

const AnimatedError = Animated.createAnimatedComponent(Text);

const FieldInput = ({
  value,
  onChangeText,
  placeholder,
  errorMessage,
  containerStyle,
  style,
  showhideIcon = undefined,
  iconLeft,
  placeholdercolor,
  ...props
}) => {
  const [getter, setter] = useState({
    showIcon: true,
  });

  function FieldType() {
    if (showhideIcon && iconLeft) {
      return (
        <>
          <View style={styles.leftIconContainer}>
            <SvgXml xml={iconLeft} style={styles.leftIcon} />
          </View>
          <TextInput
            {...props}
            secureTextEntry={getter.showIcon}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor={
              placeholdercolor ? placeholdercolor : PLACEHOLDER_WHITE
            }
            placeholder={placeholder}
            style={[
              Styles.textInputContainer,
              {width: '80%', ...style},
            ]}></TextInput>
          <TouchableOpacity
            hitSlop={styles.hitSlop}
            onPress={() => {
              setter(prev => ({
                ...prev,
                showIcon: !prev.showIcon,
              }));
            }}
            activeOpacity={0.9}
            style={styles.leftIconContainer}>
            <Image
              source={getter.showIcon ? HIDE_ICON : SHOW_ICON}
              style={[styles.leftIcon, {tintColor: WHITE_30}]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </>
      );
    }
    if (iconLeft) {
      return (
        <>
          <View style={styles.leftIconContainer}>
            <SvgXml xml={iconLeft} style={styles.leftIcon} />
          </View>
          <TextInput
            {...props}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor={
              placeholdercolor ? placeholdercolor : PLACEHOLDER_WHITE
            }
            placeholder={placeholder}
            style={[
              Styles.textInputContainer,
              {
                width: '90%',
                ...style,
              },
            ]}></TextInput>
        </>
      );
    }
    return (
      <TextInput
        {...props}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={
          placeholdercolor ? placeholdercolor : PLACEHOLDER_WHITE
        }
        placeholder={placeholder}
        style={[
          Styles.textInputContainer,
          {
            width: '100%',
            ...style,
          },
        ]}></TextInput>
    );
  }

  return (
    <View
      View
      style={{
        ...containerStyle,
      }}>
      {
        <View
          style={[
            styles.container,
            {
              borderWidth: 1,
              borderColor: errorMessage != '' ? 'red' : WHITE_50,
            },
          ]}>
          {FieldType()}
        </View>
      }
      {errorMessage != '' && (
        <AnimatedError
          style={[styles.erroMessageTxt]}
          entering={FadeIn}
          // layout={Layout.}
          exiting={FadeOut}>
          {errorMessage}
        </AnimatedError>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BALCK,
    borderRadius: 6,
    color: WHITE,
    flexDirection: 'row',
    borderRadius: 6,
    height: HP(50),
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  leftIconContainer: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIcon: {
    width: '60%',
    height: '60%',
    tintColor: SECONDARY_COLOR,
  },
  hitSlop: {
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
  },
  erroMessageTxt: {
    color: 'red',
    fontSize: 12,
  },
});

FieldInput.propTypes = {
  value: Proptypes.string.isRequired,
  onChangeText: Proptypes.func.isRequired,
  placeholder: Proptypes.string.isRequired,
  errorMessage: Proptypes.string.isRequired,
  containerStyle: Proptypes.object,
  style: Proptypes.object,
  showhideIcon: Proptypes.bool,
  iconLeft: Proptypes.node,
  placeholdercolor: Proptypes.string,
};

export default React.memo(FieldInput);
