import React, {useCallback, useContext, useState} from 'react';
import {Pressable, Text, View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './Styles';

import {ForgetPassword as ForgetPasswordAction} from '../../services/auth';
import {Selector as languageSelector} from '../../store/redux/localization';

import {emailVerification} from '../../utils/Validation';
import FieldInput from './common/FieldInput';
import Loader from '../../component/Loader';
import Container from './common/Container';
import WantToExit from '../../component/WantToExit';
import CommonAuthComponent from './common/ImageHeader';
import ActionButton from '../../component/ActionButton';

import {MONTSERRAT_MEDIUM, WHITE} from '../../styles/Fonts&Colors';
import {EMAIL_SVG, FP_CENTER_IMAGE} from '../../constants/ImageConstant';
import {HP} from '../../styles/Dimesions';
import {i18n} from '../../i18n/lang';

const ForgetPassword = ({navigation}) => {
  const Language = useSelector(languageSelector.Localization);

  const [getter, setter] = useState({
    email: '',
    emailError: '',
    isLoading: false,
    isLinkSend: false,
  });

  const dispatch = useDispatch();

  const navigationTo = () => {
    navigation.navigate('resetpassword', {
      email: getter.email,
    });
  };
  // console.log(JSON.stringify(getter) + ' getter');
  const sendOtp = useCallback(() => {
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
      }));
      dispatch(ForgetPasswordAction(getter.email, setter));
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
              text={i18n[Language.code].Forgetpassword}
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
            {`${i18n[Language.code].please} ${i18n[Language.code].enter} ${
              i18n[Language.code].Register
            } ${i18n[Language.code].Email} ${i18n[Language.code].id}`}
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
            disabled={getter.isLoading ? true : false}
            callBack={sendOtp}
            style={{width: 200, marginTop: HP(40)}}>
            {getter.isLoading ? (
              <Loader size={'small'} color={'#fff'} />
            ) : (
              <Text style={styles.loginTxt}>
                {`${i18n[Language.code].verificationLink}`}
              </Text>
            )}
          </ActionButton>
          <Pressable
            onPress={() => navigation.goBack()}
            style={[styles.haveAnAccountContainer, {marginTop: HP(40)}]}>
            <Text style={styles.notHaveAccontTxt}>
              {`${i18n[Language.code].backto}`}{' '}
            </Text>
            <Text style={styles.haveAnAccount}>{`${
              i18n[Language.code].login
            }`}</Text>
          </Pressable>
        </ScrollView>
      </Container>
      {WantToExit()}
    </View>
  );
};

export default ForgetPassword;
