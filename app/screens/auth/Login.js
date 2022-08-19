import React, {useState, useCallback, useEffect} from 'react';
import {
  Text,
  View,
  Pressable,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
  StatusBar,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import strings from '../../utils/Localization';
import {WP, HP} from '../../styles/Dimesions';
import {loginUser} from '../../services/auth';
import {emailVerification} from '../../utils/Validation';
import FieldInput from './common/FieldInput';
import styles from './Styles';
import {
  LOCK_SVG,
  LOGIN_CENTER_IMAGE,
  EMAIL_SVG,
} from '../../constants/ImageConstant';
import CommonAuthComponent from './common/ImageHeader';
import ActionButton from '../../component/ActionButton';
import Container from './common/Container';
import {BACKGROUND_COLOR} from '../../styles/Fonts&Colors';
import Picker from '../../component/MenuItem';
import {Selector} from '../../store/redux/localization';
import {setItem} from '../../utils/AsyncStorage';
import {APP_LANGUAGE} from '../../constants/AppConstant';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Login = ({navigation}) => {
  //get the context value
  const [getter, setter] = useState({
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
  });

  const [language, setLanguage] = useState({
    language: {value: 'English', shortForm: 'en'},
    isVisible: false,
  });

  const languageChange = item => {
    try {
      setLanguage(prev => ({
        ...prev,
        isVisible: false,
        language: {
          value: item.language.value,
          shortForm: item.language.shortForm,
        },
      }));
      const preferdLanguage = {
        value: item.language.value,
        code: item.language.shortForm,
      };
      setItem(APP_LANGUAGE, JSON.stringify(preferdLanguage));
      strings.setLanguage(item.language.shortForm);
    } catch (error) {
      console.log(error);
    }
  };

  const dispatch = useDispatch();

  const emptyState = useCallback(() => {
    setter(prev => ({
      ...prev,
      emailError: '',
      passwordError: '',
    }));
  }, []);

  useFocusEffect(emptyState);

  const makeLoginCall = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const isValid = emailVerification(getter.email);
    if (isValid == '' && getter.password != '') {
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
        passwordError:
          getter.password == ''
            ? `${strings.emptyFldErr}${strings.Password}`
            : '',
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
            text={strings.signYou}
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
              placeholder={strings.Email}
              placeholderTextColor={'gray'}></FieldInput>

            <FieldInput
              containerStyle={{marginTop: HP(20)}}
              placeholder={strings.Password}
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
              {strings.Forgetpassword}
            </Text>
            <ActionButton
              callBack={makeLoginCall}
              style={{
                marginTop: HP(58),
                width: WP(200),
                alignSelf: 'center',
              }}>
              {/* {state.isLoading ? (
                <Loader size={'small'} color={'#fff'} />
              ) : (
              )} */}
              <Text style={styles.loginTxt}>{strings.login}</Text>
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
              {strings.donthaveanaccount} ?{' '}
            </Text>
            <Text style={styles.haveAnAccount}>{strings.RegisterNow}</Text>
          </Pressable>
        </ScrollView>
      </Container>
    </View>
  );
};

export default Login;