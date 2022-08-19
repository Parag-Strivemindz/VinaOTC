import React, {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import Loader from '../../component/Loader';
import FieldInput from './common/FieldInput';
import styles from './Styles';
import {OtpVerification} from '../../services/auth';

const VerifyOtp = ({setRegister, email}) => {
  console.log(email + ' fromVerifyOtp');
  const navigation = useNavigation();
  const [otp, setOtp] = useState({
    otp: '',
    otpError: '',
    isLoading: false,
  });
  const dispatch = useDispatch();

  const navigationTo = () => {
    navigation.navigate('login');
  };

  const makeOtpCall = useCallback(() => {
    if (otp === '') {
      return setOtp(prev => ({
        ...prev,
        otpError: `Otp can't be empty`,
      }));
    } else {
      dispatch(OtpVerification(otp.otp, email, navigationTo, setOtp));
    }
  }, [otp, setOtp]);

  return (
    <View>
      <FieldInput
        containerStyle={{marginTop: 50}}
        value={otp.otp}
        onChangeText={text => {
          setOtp(prev => ({
            ...prev,
            otp: text,
          }));
        }}
        errorMessage={otp.otpError}
        maxLength={4}
        keyboardType="number-pad"
        placeholder="Enter 4 digit Otp"
        placeholderTextColor={'gray'}></FieldInput>
      <Pressable
        onPress={() => makeOtpCall()}
        disabled={otp.isLoading ? true : false}
        android_ripple={{
          borderless: false,
        }}
        style={[styles.loginBtnContainer]}>
        {otp.isLoading ? (
          <Loader color={'white'} size={'small'} />
        ) : (
          <Text style={styles.loginTxt}>Verify OTP</Text>
        )}
      </Pressable>
      <Pressable
        onPress={() =>
          setRegister(prev => ({
            ...prev,
            isRegister: false,
          }))
        }
        style={[styles.loginBtnContainer, {marginTop: 15}]}>
        <Text style={styles.loginTxt}>Register here !</Text>
      </Pressable>
    </View>
  );
};

export default VerifyOtp;
