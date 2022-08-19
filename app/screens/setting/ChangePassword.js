import {
  View,
  Text,
  Image,
  UIManager,
  Platform,
  LayoutAnimation,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import Container from '../../component/Container';
import FieldInput from '../auth/common/FieldInput';
import {passwordVerification} from '../../utils/Validation';
import {
  HEADER_HEIGHT,
  PADDING_HORIZONTAL,
  PADDING_VERTICAL,
} from '../../styles/GlobalStyles';
import {LOCK_SVG} from '../../constants/ImageConstant';
import {WP, HP} from '../../styles/Dimesions';
import ActionButton from '../../component/ActionButton';
import CommonHeader from '../../component/CommonHeader';
import {
  ROBOTO_REGULAR,
  WHITE,
  WHITE_50,
  WHITE_80,
} from '../../styles/Fonts&Colors';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const ChangePassword = () => {
  const [getter, setter] = useState({
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [error, setError] = useState({
    passwordError: '',
    newPasswordError: '',
    confirmPasswordError: '',
  });

  const Submit = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const [passwordError, confirmPasswordError, isEqual] = passwordVerification(
      getter.password,
      getter.confirmPassword,
    );

    if (passwordError == '' && confirmPasswordError == '' && isEqual == '') {
      //make api call here
      setError(prev => ({
        ...prev,
        passwordError: '',
        newPasswordError: '',
        confirmPasswordError: '',
      }));
    } else {
      setError(prev => ({
        ...prev,
        newPasswordError: passwordError,
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
          containerStyle={{
            marginTop: HP(15),
          }}
          defaultValue={'********'}
          editable={false}
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
              password: text,
            }))
          }
          value={getter.password}
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
          <Text
            style={{
              fontFamily: ROBOTO_REGULAR,
              fontSize: WP(16),
              color: WHITE,
            }}>
            Update Password
          </Text>
        </ActionButton>
      </Container>
    </View>
  );
};

export default ChangePassword;
