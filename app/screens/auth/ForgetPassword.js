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
import {ForgetPassword as ForgetPasswordAction} from '../../services/auth';
import CommonAuthComponent from './common/ImageHeader';
import {EMAIL_SVG, FP_CENTER_IMAGE} from '../../constants/ImageConstant';
import ActionButton from '../../component/ActionButton';
import {MONTSERRAT_MEDIUM, WHITE} from '../../styles/Fonts&Colors';
import Container from './common/Container';
import {HP} from '../../styles/Dimesions';

const ForgetPassword = ({navigation}) => {
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
            disabled={getter.isLoading ? true : false}
            callBack={sendOtp}
            style={{width: 200, marginTop: HP(40)}}>
            {getter.isLoading ? (
              <Loader size={'small'} color={'#fff'} />
            ) : (
              <Text style={styles.loginTxt}>
                {`${strings.verificationLink}`}
              </Text>
            )}
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
