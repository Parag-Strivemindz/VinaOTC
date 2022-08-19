import React, {useCallback, useContext, useState} from 'react';
import {
  Pressable,
  Text,
  View,
  Image,
  LayoutAnimation,
  UIManager,
  Platform,
  ScrollView,
  I18nManager,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import FieldInput from './common/FieldInput';
import styles from './Styles';
import {emailVerification} from '../../utils/Validation';
import Loader from '../../component/Loader';
import strings from '../../utils/Localization';
import {
  OtpVerification_Forgetpassword,
  ForgetPassword as ForgetPasswordAction,
} from '../../services/auth';
import CommonAuthComponent from './common/ImageHeader';
import {EMAIL_SVG, FP_CENTER_IMAGE} from '../../constants/ImageConstant';
import ActionButton from '../../component/ActionButton';
import {MONTSERRAT_MEDIUM, WHITE} from '../../styles/Fonts&Colors';
import Container from './common/Container';
import {HP} from '../../styles/Dimesions';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
const ForgetPassword = ({navigation}) => {
  const [getter, setter] = useState({
    email: '',
    emailError: '',
    otp: '',
    otpError: '',
    isLoading: false,
    isResend: false,
    isOtpSend: false,
  });

  const dispatch = useDispatch();

  const navigationTo = () => {
    navigation.navigate('resetpassword', {
      email: getter.email,
    });
  };
  // console.log(JSON.stringify(getter) + ' getter');
  const sendOtp = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const isEmailValid = emailVerification(getter.email);
    if (isEmailValid != '') {
      setter(prev => ({
        ...prev,
        emailError: isEmailValid,
      }));
    } else {
      setter(prev => ({
        ...prev,
        emailError: '',
        otpError: '',
        otp: '',
      }));
      dispatch(ForgetPasswordAction(getter.email, setter));
    }
  }, [getter, setter]);

  const verfiyOtp = useCallback(() => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (getter.otp == '') {
      setter(prev => ({
        ...prev,
        otpError: "Otp can't be empty",
      }));
    } else {
      setter(prev => ({
        ...prev,
        otpError: '',
      }));
      dispatch(
        OtpVerification_Forgetpassword(
          getter.otp,
          getter.email,
          navigationTo,
          setter,
        ),
      );
    }
  }, [getter, setter]);

  return (
    <View style={styles.container}>
      <Container style={styles.mainContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={[styles.blockContainer, {marginTop: HP(50)}]}>
            <CommonAuthComponent
              text={strings.Forgetpassword}
              source={FP_CENTER_IMAGE}
            />
          </View>
          <Text
            style={{
              alignSelf: 'center',
              marginVertical: HP(32),
              fontSize: 12,
              color: WHITE,
              fontFamily: MONTSERRAT_MEDIUM,
            }}>
            {`${strings.please} ${strings.enter} ${strings.Register} ${strings.Email} ${strings.id}`}
          </Text>
          <FieldInput
            iconLeft={EMAIL_SVG}
            errorMessage={getter.emailError}
            onChangeText={text => {
              setter(prev => ({
                ...prev,
                email: text,
              }));
            }}
            placeholder="Email"
            value={getter.email}
            showhideIcon={false}
          />
          <ActionButton
            callBack={sendOtp}
            style={{width: 200, marginTop: HP(40)}}>
            <Text style={styles.loginTxt}>{`${strings.verificationLink}`}</Text>
          </ActionButton>
          <Pressable
            onPress={() => navigation.goBack()}
            style={[styles.haveAnAccountContainer, {marginTop: HP(40)}]}>
            <Text style={styles.notHaveAccontTxt}>{`${strings.backto}`} </Text>
            <Text style={styles.haveAnAccount}>{`${strings.login}`}</Text>
          </Pressable>
        </ScrollView>
      </Container>
    </View>
  );
};

export default ForgetPassword;
