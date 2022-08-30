import {View, Text} from 'react-native';
import React, {useState, useCallback} from 'react';
import {useDispatch} from 'react-redux';

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

const ChangePassword = () => {
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
      passwordVerification(getter.newPassword, getter.confirmPassword);
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
          : "Password field Cant't be Empty",
        newPasswordError: newpasswordError,
        confirmPasswordError: confirmPasswordError || isEqual,
      }));
    }
    //check if any field is empty or invalid
  }, [getter, setter, Error, setError]);

  return (
    <View style={{flex: 1}}>
      <CommonHeader title={'Change Password'} />
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
          placeholder={'Password'}
          iconLeft={LOCK_SVG}
          showhideIcon={true}
          errorMessage={error.passwordError}
        />
        <FieldInput
          placeholder={'New Password'}
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
          placeholder={'Confirm Password'}
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
              style={{
                fontFamily: ROBOTO_REGULAR,
                fontSize: WP(16),
                color: WHITE,
              }}>
              Update Password
            </Text>
          )}
        </ActionButton>
      </Container>
    </View>
  );
};

export default ChangePassword;
