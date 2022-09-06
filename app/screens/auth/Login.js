import React, {useState, useCallback} from 'react';
import {Text, View, Pressable, ScrollView, StatusBar} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {Selector as languageSelector} from '../../store/redux/localization';

import {loginUser} from '../../services/auth';
import {emailVerification, passwordVerification} from '../../utils/Validation';
import FieldInput from './common/FieldInput';
import CommonAuthComponent from './common/ImageHeader';
import ActionButton from '../../component/ActionButton';
import Container from './common/Container';
import Picker from '../../component/MenuItem';
import {Selector} from '../../store/redux/user/index';

import {WP, HP} from '../../styles/Dimesions';
import styles from './Styles';
import {BACKGROUND_COLOR} from '../../styles/Fonts&Colors';
import {
  LOCK_SVG,
  LOGIN_CENTER_IMAGE,
  EMAIL_SVG,
} from '../../constants/ImageConstant';
import Loader from '../../component/Loader';
import WantToExit from '../../component/WantToExit';
import LocalizationAction from '../../services/Localization';
import {i18n} from '../../i18n/lang';

const Login = ({navigation}) => {
  const Language = useSelector(languageSelector.Localization);
  const [getter, setter] = useState({
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
  });

  const [language, setLanguage] = useState({
    isVisible: false,
  });

  const userState = useSelector(Selector.User_Info);
  const dispatch = useDispatch();

  const languageChange = useCallback(item => {
    try {
      setLanguage(prev => ({
        ...prev,
        isVisible: false,
      }));
      // setItem(APP_LANGUAGE, JSON.stringify(preferdLanguage));
      dispatch(LocalizationAction(item));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const emptyState = useCallback(() => {
    setter(prev => ({
      ...prev,
      emailError: '',
      passwordError: '',
    }));
  }, []);

  useFocusEffect(emptyState);

  const makeLoginCall = () => {
    const isValid = emailVerification(getter.email, Language);
    const [passwordError] = passwordVerification(getter.password, '', Language);

    if (isValid == '' && passwordError == '') {
      dispatch(loginUser(getter.email, getter.password));
      setter(prev => ({
        ...prev,
        emailError: '',
        passwordError: '',
      }));
    } else {
      setter(prev => ({
        ...prev,
        emailError: isValid,
        passwordError: passwordError,
      }));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={BACKGROUND_COLOR}
        barStyle={'light-content'}
      />
      <Container>
        <ScrollView
          contentContainerStyle={{paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View
            style={{
              alignSelf: 'flex-start',
              marginTop: HP(20),
              marginBottom: HP(-20),
            }}>
            {/**
             * language Picker
             */}
            <Picker
              callback={languageChange}
              setter={setLanguage}
              getter={language}
            />
          </View>
          <CommonAuthComponent
            containerStyle={{marginTop: HP(50)}}
            source={LOGIN_CENTER_IMAGE}
            text={i18n[Language.code].signYou}
          />
          <View style={{marginTop: HP(30)}}>
            <FieldInput
              keyboardType="email-address"
              value={getter.email}
              iconLeft={EMAIL_SVG}
              showhideIcon={false}
              onChangeText={text => {
                setter(prev => ({
                  ...prev,
                  email: text,
                }));
              }}
              errorMessage={getter.emailError}
              placeholder={i18n[Language.code].Email}
              placeholderTextColor={'gray'}></FieldInput>

            <FieldInput
              containerStyle={{marginTop: HP(20)}}
              placeholder={i18n[Language.code].Password}
              iconLeft={LOCK_SVG}
              errorMessage={getter.passwordError}
              value={getter.password}
              onChangeText={text => {
                setter(prev => ({
                  ...prev,
                  password: text,
                }));
              }}
              showhideIcon={true}></FieldInput>
            <Text
              style={[styles.forgetPasswordTxt]}
              onPress={() => navigation.navigate('forgetpassword')}>
              {i18n[Language.code].Forgetpassword}
            </Text>
            <ActionButton
              disabled={userState.isLoading ? true : false}
              callBack={makeLoginCall}
              style={{
                marginTop: HP(58),
                width: WP(200),
                alignSelf: 'center',
              }}>
              {userState.isLoading ? (
                <Loader size={'small'} color={'#fff'} />
              ) : (
                <Text style={styles.loginTxt}>{i18n[Language.code].login}</Text>
              )}
            </ActionButton>
          </View>
          <Pressable
            onPress={() => {
              navigation.navigate('signup');
            }}
            style={[
              styles.haveAnAccountContainer,
              {
                marginTop: HP(48),
              },
              // {borderWidth: 1, borderColor: 'red'},
            ]}>
            <Text style={styles.notHaveAccontTxt}>
              {i18n[Language.code].donthaveanaccount} ?{' '}
            </Text>
            <Text style={styles.haveAnAccount}>
              {i18n[Language.code].RegisterNow}
            </Text>
          </Pressable>
        </ScrollView>
      </Container>
      <WantToExit />
    </View>
  );
};

export default Login;
