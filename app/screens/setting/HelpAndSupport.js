import {
  View,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import React, {useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {useDispatch} from 'react-redux';

import FieldInput from '../auth/common/FieldInput';
import Container from '../../component/Container';
import CommonHeader from '../../component/CommonHeader';
import HifenDivider from '../../component/HifenDivider';
import {HELPANDSUPPORT} from '../../constants/ImageConstant';
import {HEADER_HEIGHT, PADDING_HORIZONTAL} from '../../styles/GlobalStyles';
import {HP, WP} from '../../styles/Dimesions';
import RowContainer from '../../component/RowContainer';
import {LOCATION, PHONE} from '../../constants/IconConstant';
import {
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  POPPINS_SEMIBOLD,
  ROBOTO_REGULAR,
  SECONDARY_COLOR,
  WHITE,
  WHITE_50,
} from '../../styles/Fonts&Colors';
import {useCallback} from 'react';
import {emailVerification, isFeildValid} from '../../utils/Validation';
import ActionButton from '../../component/ActionButton';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
const HelpAndSupport = () => {
  const [isRegister, setRegister] = useState({
    isRegister: false,
    isLoading: false,
  });
  const dispatch = useDispatch();

  const [getter, setter] = useState({
    fullName: '',
    Email: '',
    yourMessage: '',
  });

  const [error, setError] = useState({
    fullNameErro: '',
    emailError: '',
    yourMessageError: '',
  });

  const Submit = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const isEmailValid = emailVerification(getter.Email);

    const [fullName] = isFeildValid(getter.fullName);

    if (isEmailValid == '' && fullName == '' && getter.yourMessage == '') {
      //make api call here
      setError(prev => ({
        ...prev,
        emailError: '',
        fullNameErro: '',
        yourMessageError: '',
      }));
    } else {
      setError(prev => ({
        ...prev,
        emailError: isEmailValid,
        fullNameErro: fullName,
        yourMessageError: `Field can't be empty`,
      }));
    }
    //check if any field is empty or invalid
  }, [getter, setter, Error, setError]);

  return (
    <View style={{flex: 1}}>
      <CommonHeader title={'Help & Support'} />
      <Container
        scrollViewContainerStyle={{
          paddingTop: HEADER_HEIGHT,
          paddingHorizontal: PADDING_HORIZONTAL,
        }}>
        <SvgXml
          xml={HELPANDSUPPORT}
          style={{marginTop: HP(42), alignSelf: 'center'}}
        />
        <View style={{marginTop: HP(40)}}>
          <HifenDivider style={{alignSelf: 'flex-start', marginTop: 0}} />
          <RowContainer style={{alignSelf: 'flex-start', marginTop: HP(22)}}>
            <SvgXml xml={PHONE} style={{marginRight: 20}} />
            <Text style={styles.phone}>0926718080</Text>
          </RowContainer>
          <RowContainer style={{alignSelf: 'flex-start', marginTop: HP(22)}}>
            <SvgXml xml={LOCATION} style={{marginRight: 20}} />
            <Text style={styles.regularTxt}>
              Registered Office:7, Crown Yard Bedgebury, Cranbrook, Kent, United
              Kingdom 2QZ
            </Text>
          </RowContainer>
        </View>
        <View style={{marginTop: HP(40)}}>
          <RowContainer style={{alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 14,
                color: SECONDARY_COLOR,
                fontFamily: POPPINS_SEMIBOLD,
              }}>
              Get In Touch
            </Text>
            <HifenDivider style={{width: 22, marginTop: 0}} />
          </RowContainer>
          <FieldInput
            style={styles.inputField}
            placeholdercolor={WHITE_50}
            containerStyle={{marginTop: HP(15)}}
            placeholder={'Your Name'}
            errorMessage={error.fullNameErro}
            value={getter.fullName}
            onChangeText={text => setter(prev => ({...prev, fullName: text}))}
          />
          <FieldInput
            style={styles.inputField}
            placeholdercolor={WHITE_50}
            containerStyle={{marginTop: HP(15)}}
            placeholder={'Email'}
            errorMessage={error.emailError}
            value={getter.Email}
            onChangeText={text => setter(prev => ({...prev, Email: text}))}
          />
          <FieldInput
            style={styles.inputField}
            placeholdercolor={WHITE_50}
            containerStyle={{marginTop: HP(15)}}
            placeholder={'Your Message'}
            errorMessage={error.yourMessageError}
            value={getter.yourMessage}
            onChangeText={text =>
              setter(prev => ({...prev, yourMessage: text}))
            }
          />
          <ActionButton
            callBack={Submit}
            style={{width: WP(187), alignSelf: 'center', marginTop: HP(30)}}>
            <Text style={styles.btnTxt}>Submit</Text>
          </ActionButton>
        </View>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  phone: {
    fontFamily: POPPINS_REGULAR,
    fontSize: WP(13),
    color: WHITE,
    letterSpacing: 0.5,
  },
  regularTxt: {
    fontFamily: ROBOTO_REGULAR,
    // fontSize: WP(13),
    lineHeight: 21,
    color: WHITE,
  },
  inputField: {
    fontFamily: POPPINS_MEDIUM,
    fontSize: 13,
    color: WHITE,
  },
  btnTxt: {
    fontFamily: ROBOTO_REGULAR,
    color: WHITE,
    fontSize: WP(16),
  },
});

export default HelpAndSupport;
