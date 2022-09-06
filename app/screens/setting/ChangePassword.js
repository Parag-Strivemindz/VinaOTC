import {View, Text} from 'react-native';
import React, {useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {Selector as languageSelector} from '../../store/redux/localization';
import ChangePasswordAction from '../../services/setting/ChangePassword';

import Container from '../../component/Container';
import FieldInput from '../auth/common/FieldInput';
import ActionButton from '../../component/ActionButton';
import CommonHeader from '../../component/CommonHeader';
import {passwordVerification} from '../../utils/Validation';

import {
  HEADER_HEIGHT,
  PADDING_HORIZONTAL,
  PADDING_VERTICAL,
} from '../../styles/GlobalStyles';
import {LOCK_SVG} from '../../constants/ImageConstant';
import {WP, HP} from '../../styles/Dimesions';
import {ROBOTO_REGULAR, WHITE, WHITE_80} from '../../styles/Fonts&Colors';
import Loader from '../../component/Loader';
import {i18n} from '../../i18n/lang';

const ChangePassword = () => {
  const language = useSelector(languageSelector.Localization);

  const [getter, setter] = useState({
    password: '',
    newPassword: '',
    confirmPassword: '',
    isLoading: false,
  });

  const [error, setError] = useState({
    passwordError: '',
    newPasswordError: '',
    confirmPasswordError: '',
  });

  const dispatch = useDispatch();

  const Submit = useCallback(() => {
    const [newpasswordError, confirmPasswordError, isEqual] =
      passwordVerification(
        getter.newPassword,
        getter.confirmPassword,
        language,
      );
    const iscurrentPasswordError = getter.password >= 8 ? true : false;
    console.log(iscurrentPasswordError + ' currentPasswordError');
    if (
      newpasswordError == '' &&
      confirmPasswordError == '' &&
      isEqual == '' &&
      iscurrentPasswordError
    ) {
      console.log('called');
      //make api call here
      dispatch(
        ChangePasswordAction(getter.password, getter.newPassword, setter),
      );
      setError(prev => ({
        ...prev,
        passwordError: '',
        newPasswordError: '',
        confirmPasswordError: '',
      }));
    } else {
      setError(prev => ({
        ...prev,
        passwordError: iscurrentPasswordError
          ? ''
          : `${i18n[language.code].emptyFldErr} ${
              i18n[language.code].Password
            }`,
        newPasswordError: newpasswordError,
        confirmPasswordError: confirmPasswordError || isEqual,
      }));
    }
    //check if any field is empty or invalid
  }, [getter, setter, Error, setError]);

  return (
    <View style={{flex: 1}}>
      <CommonHeader title={i18n[language.code].changepassword} />
      <Container
        containerStyles={{
          paddingHorizontal: PADDING_HORIZONTAL,
          paddingTop: HEADER_HEIGHT + PADDING_VERTICAL,
        }}>
        <FieldInput
          onChangeText={text => {
            setter(prev => ({
              ...prev,
              password: text,
            }));
          }}
          value={getter.password}
          containerStyle={{
            marginTop: HP(15),
          }}
          placeholder={i18n[language.code].Password}
          iconLeft={LOCK_SVG}
          showhideIcon={true}
          errorMessage={error.passwordError}
        />
        <FieldInput
          placeholder={i18n[language.code].newPassword}
          placeholdercolor={WHITE_80}
          containerStyle={{
            marginTop: HP(15),
          }}
          onChangeText={text =>
            setter(prev => ({
              ...prev,
              newPassword: text,
            }))
          }
          value={getter.newPassword}
          iconLeft={LOCK_SVG}
          showhideIcon={true}
          errorMessage={error.newPasswordError}
        />
        <FieldInput
          placeholder={i18n[language.code].confirmPassword}
          placeholdercolor={WHITE_80}
          containerStyle={{
            marginTop: HP(15),
          }}
          onChangeText={text =>
            setter(prev => ({
              ...prev,
              confirmPassword: text,
            }))
          }
          value={getter.confirmPassword}
          iconLeft={LOCK_SVG}
          showhideIcon={true}
          errorMessage={error.confirmPasswordError}
        />
        <ActionButton
          callBack={Submit}
          style={{width: WP(187), alignSelf: 'center', marginTop: HP(50)}}>
          {getter.isLoading ? (
            <Loader />
          ) : (
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={{
                fontFamily: ROBOTO_REGULAR,
                fontSize: WP(16),
                color: WHITE,
              }}>
              {i18n[language.code].update}
              {i18n[language.code].Password}
            </Text>
          )}
        </ActionButton>
      </Container>
    </View>
  );
};

export default ChangePassword;
