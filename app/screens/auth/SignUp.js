import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  Pressable,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {SvgXml} from 'react-native-svg';

import Error from '../../component/Error';
import Loader from '../../component/Loader';
import {Register} from '../../services/auth';
import strings from '../../utils/Localization';
import ActionButton from '../../component/ActionButton';

import {
  emailVerification,
  isFeildValid,
  passwordVerification,
} from '../../utils/Validation';
import FieldInput from './common/FieldInput';
import styles from './Styles';
import CommonAuthComponent from './common/ImageHeader';
import {
  LOGIN_CENTER_IMAGE,
  EMAIL_SVG,
  CIRCLE_SVG,
} from '../../constants/ImageConstant';
import Container from './common/Container';
import {SECONDARY_COLOR} from '../../styles/Fonts&Colors';
import {HP} from '../../styles/Dimesions';
import SnackBar from '../../component/SnackBar';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const SignUp = ({navigation}) => {
  const [getter, setter] = useState({
    fullName: '',
    Email: '',
    password: '',
    confirmPassword: '',
    termAndCondition: false,
    isLoading: false,
  });

  const [error, setError] = useState({
    fullNameErro: '',
    emailError: '',
    passwordError: '',
    passwordConfirmError: '',
  });

  const dispatch = useDispatch();

  const toggleTermAndCondition = () => {
    setter(prev => ({
      ...prev,
      termAndCondition: !prev.termAndCondition,
    }));
  };

  const makeSignUpCall = useCallback(() => {
    const isEmailValid = emailVerification(getter.Email);
    const [password, confirmPassword, isEqual] = passwordVerification(
      getter.password,
      getter.confirmPassword,
    );

    const [fullName] = isFeildValid(getter.fullName);

    if (
      isEmailValid == '' &&
      password == '' &&
      fullName == '' &&
      isEqual == '' &&
      confirmPassword == '' &&
      getter.termAndCondition
    ) {
      dispatch(
        Register(getter.fullName, getter.Email, getter.password, setter),
      );
      setError(prev => ({
        ...prev,
        passwordConfirmError: '',
        emailError: '',
        passwordError: '',
        fullNameErro: '',
      }));
    } else {
      setError(prev => ({
        ...prev,
        passwordConfirmError: confirmPassword || isEqual,
        emailError: isEmailValid,
        passwordError: password,
        fullNameErro: fullName,
      }));
      SnackBar('Please Accept TermA&Condition');
    }
    //check if any field is empty or invalid
  }, [getter, setter, Error, setError]);

  return (
    <View style={styles.container}>
      <Container style={styles.mainContainer}>
        <ScrollView
          contentContainerStyle={{paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <CommonAuthComponent
            text={strings.Register}
            source={LOGIN_CENTER_IMAGE}
            imageContainer={{height: HP(120)}}
            containerStyle={{marginTop: HP(40)}}
          />
          <View style={{marginTop: HP(35)}}>
            <FieldInput
              iconLeft={EMAIL_SVG}
              showhideIcon={false}
              value={getter.fullName}
              onChangeText={text => {
                setter(prev => ({
                  ...prev,
                  fullName: text,
                }));
              }}
              errorMessage={error.fullNameErro}
              placeholder={strings.Fullname}></FieldInput>

            <FieldInput
              iconLeft={EMAIL_SVG}
              containerStyle={{marginTop: HP(14)}}
              showhideIcon={false}
              value={getter.Email}
              onChangeText={text => {
                setter(prev => ({
                  ...prev,
                  Email: text,
                }));
              }}
              errorMessage={error.emailError}
              placeholder={strings.Email}></FieldInput>

            {/*Password block*/}
            <FieldInput
              iconLeft={EMAIL_SVG}
              containerStyle={{marginTop: HP(15)}}
              showhideIcon={true}
              errorMessage={error.passwordError}
              value={getter.password}
              onChangeText={text => {
                setter(prev => ({
                  ...prev,
                  password: text,
                }));
              }}
              placeholder={strings.Password}></FieldInput>
            <FieldInput
              iconLeft={EMAIL_SVG}
              containerStyle={{marginTop: HP(15)}}
              showhideIcon={true}
              errorMessage={error.passwordConfirmError}
              value={getter.confirmPassword}
              onChangeText={text => {
                setter(prev => ({
                  ...prev,
                  confirmPassword: text,
                }));
              }}
              placeholder={strings.confirmPassword}></FieldInput>

            <View style={{marginTop: HP(25)}}>
              {getter.termAndCondition ? (
                <Pressable
                  onPress={() => toggleTermAndCondition()}
                  style={{flexDirection: 'row'}}>
                  <SvgXml
                    stroke={SECONDARY_COLOR}
                    xml={CIRCLE_SVG}
                    style={[styles.termAndConditionImg]}
                  />
                  <Text numberOfLines={2} style={styles.termAndConditionTxt}>
                    {strings.termAndCondi}
                  </Text>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => toggleTermAndCondition()}
                  style={{flexDirection: 'row'}}>
                  <SvgXml
                    stroke={'white'}
                    xml={CIRCLE_SVG}
                    style={[styles.termAndConditionImg]}
                  />
                  <Text numberOfLines={2} style={styles.termAndConditionTxt}>
                    {strings.termAndCondi}
                  </Text>
                </Pressable>
              )}
            </View>
            <View
              style={{
                alignSelf: 'center',
                width: 13,
                height: 1,
                backgroundColor: '#FFFFFF80',
                marginTop: HP(28),
              }}></View>
            <ActionButton
              disabled={getter.isLoading ? true : false}
              callBack={makeSignUpCall}
              style={{marginTop: HP(22), width: 200}}>
              {getter.isLoading ? (
                <Loader size={'small'} color={'#fff'} />
              ) : (
                <Text style={styles.loginTxt}>{strings.signup}</Text>
              )}
            </ActionButton>
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.haveAnAccountContainer}>
              <Text style={styles.notHaveAccontTxt}>
                {strings.alreadyhaveAccount} ?{' '}
              </Text>
              <Text style={styles.haveAnAccount}>{strings.backto}</Text>
            </Pressable>
          </View>
        </ScrollView>
      </Container>
    </View>
  );
};

export default SignUp;
