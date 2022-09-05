import {View, Text, StyleSheet, Platform, UIManager} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {SvgXml} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';

import {Selector as languageSelector} from '../../store/redux/localization';
import {Selector as ContactusSelector} from '../../store/redux/setting/index';

import ContactUs from '../../services/setting/ContactUs';
import GetInTouch from '../../services/setting/GetInTouch';

import ActionButton from '../../component/ActionButton';
import FieldInput from '../auth/common/FieldInput';
import Container from '../../component/Container';
import CommonHeader from '../../component/CommonHeader';
import HifenDivider from '../../component/HifenDivider';
import RowContainer from '../../component/RowContainer';
import Loader from '../../component/Loader';
import {emailVerification, isFeildValid} from '../../utils/Validation';

import {EMAIL_SVG, HELPANDSUPPORT} from '../../constants/ImageConstant';
import {HP, WP} from '../../styles/Dimesions';
import {LOCATION, PHONE} from '../../constants/IconConstant';
import {HEADER_HEIGHT, PADDING_HORIZONTAL} from '../../styles/GlobalStyles';
import {
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  POPPINS_SEMIBOLD,
  ROBOTO_REGULAR,
  SECONDARY_COLOR,
  WHITE,
  WHITE_50,
} from '../../styles/Fonts&Colors';
import {i18n} from '../../i18n/lang';

const HelpAndSupport = () => {
  const contactUs = useSelector(ContactusSelector.CONTACT_US);
  const language = useSelector(languageSelector.Localization);

  const [getter, setter] = useState({
    fullName: '',
    Email: '',
    yourMessage: '',
    isLoading: false,
  });

  const [error, setError] = useState({
    fullNameErro: '',
    emailError: '',
    yourMessageError: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (contactUs.data == null) {
      dispatch(ContactUs(language));
    }
  }, [language]);

  const Submit = useCallback(() => {
    const isEmailValid = emailVerification(getter.Email);
    const [fullName, yourMessage] = isFeildValid(
      getter.fullName,
      getter.yourMessage,
    );

    if (isEmailValid == '' && fullName == '' && yourMessage == '') {
      //make api call here
      dispatch(
        GetInTouch(getter.fullName, getter.Email, getter.yourMessage, setter),
      );
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
        yourMessageError: yourMessage,
      }));
    }
    //check if any field is empty or invalid
  }, [getter, setter, Error, setError]);

  return (
    <View style={{flex: 1}}>
      <CommonHeader title={i18n[language.code].helpAndSupport} />
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
            <Text style={styles.phone}>
              {contactUs.data ? contactUs.data.data.mobile_no : '?????'}
            </Text>
          </RowContainer>
          <RowContainer style={{alignSelf: 'flex-start', marginTop: HP(22)}}>
            <SvgXml xml={EMAIL_SVG} style={{marginRight: 20}} />
            <Text style={styles.regularTxt}>
              {contactUs.data ? contactUs.data.data.email : '?????'}
            </Text>
          </RowContainer>
          <RowContainer style={{alignSelf: 'flex-start', marginTop: HP(22)}}>
            <SvgXml xml={LOCATION} style={{marginRight: 20}} />
            <Text style={styles.regularTxt}>
              {contactUs.data
                ? contactUs.data.data.branch_address.concat(
                    contactUs.data.data.address,
                  )
                : '?????'}
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
              {i18n[language.code].getInTouch}
            </Text>
            <HifenDivider style={{width: 22, marginTop: 0}} />
          </RowContainer>
          <FieldInput
            editable={getter.isLoading ? false : true}
            style={styles.inputField}
            placeholdercolor={WHITE_50}
            containerStyle={{marginTop: HP(15)}}
            placeholder={i18n[language.code].yourName}
            errorMessage={error.fullNameErro}
            value={getter.fullName}
            onChangeText={text => setter(prev => ({...prev, fullName: text}))}
          />
          <FieldInput
            editable={getter.isLoading ? false : true}
            style={styles.inputField}
            placeholdercolor={WHITE_50}
            containerStyle={{marginTop: HP(15)}}
            placeholder={i18n[language.code].Email}
            errorMessage={error.emailError}
            value={getter.Email}
            onChangeText={text => setter(prev => ({...prev, Email: text}))}
          />
          <FieldInput
            editable={getter.isLoading ? false : true}
            style={styles.inputField}
            placeholdercolor={WHITE_50}
            containerStyle={{marginTop: HP(15)}}
            placeholder={i18n[language.code].yourMessage}
            errorMessage={error.yourMessageError}
            value={getter.yourMessage}
            onChangeText={text =>
              setter(prev => ({...prev, yourMessage: text}))
            }
          />
          <ActionButton
            disabled={getter.isLoading ? true : false}
            callBack={Submit}
            style={{width: WP(187), alignSelf: 'center', marginTop: HP(30)}}>
            {getter.isLoading ? (
              <Loader />
            ) : (
              <Text style={styles.btnTxt}>{i18n[language.code].submit}</Text>
            )}
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
