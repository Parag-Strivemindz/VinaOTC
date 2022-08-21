import React, {useCallback, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import PropTypes from 'prop-types';
import {SvgXml} from 'react-native-svg';

import CommonHeader from '../../component/CommonHeader';
import Container from '../../component/Container';
import FiledInput from '../../screens/auth/common/FieldInput';
import {emailVerification, isFeildValid} from '../../utils/Validation';
import ActionButton from '../../component/ActionButton';

import GlobalStyles from '../../styles/GlobalStyles';
import {EMAIL_SVG, GIRL_PROFILE} from '../../constants/ImageConstant';
import {SORT, USER_SVG} from '../../constants/IconConstant';
import {HP, WP} from '../../styles/Dimesions';
import {
  BACKGROUND_COLOR,
  POPPINS_REGULAR,
  ROBOTO_REGULAR,
  SECONDARY_COLOR,
  WHITE,
} from '../../styles/Fonts&Colors';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function EditProfile({userName, userEmail}) {
  const [getter, setter] = useState({
    fullName: userName,
    Email: userEmail,
  });

  const [error, setError] = useState({
    fullNameError: '',
    emailError: '',
  });

  const makeSignUpCall = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const isEmailValid = emailVerification(getter.Email);

    const [fullName] = isFeildValid(getter.fullName);

    if (isEmailValid == '' && fullName == '') {
      //make your api call here
      setError(prev => ({
        ...prev,
        emailError: '',
        fullNameError: '',
      }));
    } else {
      setError(prev => ({
        ...prev,
        emailError: isEmailValid,
        fullNameError: fullName,
      }));
    }
    //check if any field is empty or invalid
  }, [getter, setter, Error, setError]);

  return (
    <View style={{flex: 1}}>
      <CommonHeader title={'Edit Profile'} />
      <Container
        scrollViewContainerStyle={{
          ...GlobalStyles.containerStyle,
          alignItems: 'center',
        }}>
        <TouchableOpacity style={styles.profileContainer} activeOpacity={0.7}>
          <Image
            source={GIRL_PROFILE}
            style={styles.profile}
            resizeMode="contain"
          />
          {/*
           * Select Photo Indicator
           */}
          <View
            style={{
              position: 'absolute',
              right: -10,
              bottom: 5,
              width: 35,
              height: 35,
              borderRadius: 27.5,
              backgroundColor: BACKGROUND_COLOR,
              padding: 3,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 27.5,
                backgroundColor: SECONDARY_COLOR,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <SvgXml
                xml={SORT}
                style={{marginTop: HP(5), marginLeft: WP(4)}}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View style={{marginTop: HP(40)}}>
          <FiledInput
            iconLeft={USER_SVG}
            style={styles.username}
            value={getter.fullName}
            onChangeText={text => {
              setter(prev => ({
                ...prev,
                fullName: text,
              }));
            }}
            errorMessage={error.fullNameError}
            placeholder={'Name'}
          />
          <FiledInput
            iconLeft={EMAIL_SVG}
            style={styles.username}
            containerStyle={{marginTop: HP(15)}}
            value={getter.Email}
            onChangeText={text => {
              setter(prev => ({
                ...prev,
                Email: text,
              }));
            }}
            errorMessage={error.emailError}
            placeholder={'Email'}
          />
        </View>
        <ActionButton
          style={styles.updateProfileBtn}
          callBack={() => makeSignUpCall()}>
          <Text style={styles.updateProfileTxt}>Update Profile</Text>
        </ActionButton>
      </Container>
    </View>
  );
}

EditProfile.defaultProps = {
  userName: 'lisa harper',
  userEmail: 'lisa@gmail.com',
};

EditProfile.propTypes = {
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  profileContainer: {
    width: WP(84),
    height: HP(84),
    borderRadius: WP(84 / 2),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: HP(12),
  },
  profile: {
    width: '100%',
    height: '100%',
  },
  updateProfileBtn: {
    height: HP(44),
    width: WP(204),
    borderRadius: 6,
    marginTop: HP(50),
  },
  updateProfileTxt: {
    fontFamily: ROBOTO_REGULAR,
    color: WHITE,
    fontSize: WP(16),
  },
  username: {
    fontFamily: POPPINS_REGULAR,
    // fontSize: WP(13),
  },
});
