import React, {useCallback, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  UIManager,
  Platform,
  LayoutAnimation,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import styles from './Styles';
import FieldInput from './common/FieldInput';
import {passwordVerification} from '../../utils/Validation';
import GlobalStyles from '../../styles/GlobalStyles';
import Loader from '../../component/Loader';
import {ResetPassword as ResetPasswordAction} from '../../services/auth';

const ResetPassword = ({navigation, route}) => {
  //get the user email from Otp Verification
  const {email} = route.params;
  const [getter, setter] = useState({
    password: '',
    passwordError: '',
    confirmPassword: '',
    confirmPasswordError: '',
    isLoading: false,
  });

  const dispatch = useDispatch();

  function navigateTo() {
    return navigation.navigate('login');
  }

  const resetPassword = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const [password, confirmPassword, isEqual] = passwordVerification(
      getter.password,
      getter.confirmPassword,
    );
    console.log(password + ' password');
    console.log(confirmPassword + ' confirmPassword');
    console.log(isEqual + ' isEqual');
    if (password == '' || confirmPassword == '' || isEqual == '') {
      setter(prev => ({
        ...prev,
        passwordError: password,
        confirmPasswordError: confirmPassword || isEqual,
      }));
      dispatch(
        ResetPasswordAction(
          email,
          getter.password,
          getter.confirmPassword,
          navigateTo,
          setter,
        ),
      );
    } else {
      setter(prev => ({
        ...prev,
        passwordError: password,
        confirmPassword: confirmPassword || isEqual,
      }));
    }
  }, [getter, setter]);

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={[styles.blockContainer, {marginTop: 100}]}>
            <View style={{width: '100%', alignItems: 'center'}}>
              <Image
                resizeMode="contain"
                source={require('../../assets/images/logo.png')}
                style={{
                  width: '80%',
                }}
              />
            </View>
            <Text
              style={[GlobalStyles.headingTxt, {marginTop: 5, color: 'white'}]}>
              Welcome to AWS
            </Text>
            <Text style={styles.subTitleTxt}>Keep Your data safe</Text>
          </View>
          <FieldInput
            showhideIcon={false}
            containerStyle={{flex: 0, marginTop: 20}}
            placeholder={'Enter password'}
            errorMessage={getter.passwordError}
            onChangeText={text => setter(prev => ({...prev, password: text}))}
            value={getter.password}></FieldInput>
          <FieldInput
            showhideIcon={false}
            containerStyle={{flex: 0, marginTop: 10}}
            placeholder={'Enter confirm password'}
            errorMessage={getter.confirmPasswordError}
            onChangeText={text =>
              setter(prev => ({...prev, confirmPassword: text}))
            }
            value={getter.confirmPassword}></FieldInput>

          <Pressable
            disabled={getter.isLoading ? true : false}
            android_ripple={{
              borderless: false,
            }}
            style={styles.loginBtnContainer}
            onPress={() => {
              resetPassword();
            }}>
            {getter.isLoading ? (
              <Loader color={'white'} size="small" />
            ) : (
              <Text style={styles.loginTxt}>{'Save'}</Text>
            )}
          </Pressable>
        </ScrollView>
      </View>
    </View>
  );
};

export default ResetPassword;
