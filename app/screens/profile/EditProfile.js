import React, {useCallback, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {SvgXml} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import {
  launchImageLibrary,
  launchCamera,
} from '@yunfeic/react-native-imagepicker';

import updateUserProfile from '../../services/user/UpdateProfile';

import {Selector as languageSelector} from '../../store/redux/localization';
import CommonHeader from '../../component/CommonHeader';
import Container from '../../component/Container';
import FiledInput from '../../screens/auth/common/FieldInput';
import CommonFilterModal from '../../component/CommonFilterModal';
import {emailVerification, isFeildValid} from '../../utils/Validation';
import ActionButton from '../../component/ActionButton';

import styles from './styles';
import GlobalStyles, {PADDING_HORIZONTAL} from '../../styles/GlobalStyles';
import {EMAIL_SVG} from '../../constants/ImageConstant';
import {CAMERA, FILE} from '../../constants/AppConstant';
import {
  CAMERA_SVG,
  CIRCLE,
  ERROR,
  FILE_SVG,
  SORT,
  USER_SVG,
} from '../../constants/IconConstant';
import {HP, WP} from '../../styles/Dimesions';
import {
  BACKGROUND_COLOR,
  BLACK_70,
  POPPINS_REGULAR,
  ROBOTO_MEDIUM,
  ROBOTO_REGULAR,
  SECONDARY_COLOR,
  WHITE,
} from '../../styles/Fonts&Colors';
import RowContainer from '../../component/RowContainer';
import Loader from '../../component/Loader';
import {Selector} from '../../store/redux/localization';
import {i18n} from '../../i18n/lang';

const FindAttachment = ({close, callback}) => {
  const languague = useSelector(languageSelector.Localization);

  const filerItems = [
    {
      id: '1',
      name: i18n[languague.code].file,
      value: FILE,
      icon: FILE_SVG,
    },
    {
      id: '2',
      name: i18n[languague.code].camera,
      value: CAMERA,
      icon: CAMERA_SVG,
    },
  ];

  return (
    <View style={[GlobalStyles.modalContainer]}>
      <RowContainer
        style={{
          alingItems: 'center',
          paddingHorizontal: PADDING_HORIZONTAL,
          // paddingVertical: HP(15),
        }}>
        <Text
          style={{
            color: BLACK_70,
            fontFamily: ROBOTO_MEDIUM,
          }}>
          {i18n[languague.code].choose} {i18n[languague.code].photo}{' '}
          {i18n[languague.code].from}
        </Text>
        <SvgXml
          xml={ERROR}
          onPress={() => close()}
          hitSlop={{
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
          }}
        />
      </RowContainer>
      {filerItems.map((item, index) => (
        <RowContainer
          callback={() => callback(item.value)}
          key={index.toString()}
          style={{
            ...styles.rowFilteItemContainer,
            backgroundColor: WHITE,
            // marginTop: HP(15),
          }}>
          <RowContainer style={{alignItems: 'center'}}>
            <SvgXml xml={item.icon} />
            <Text
              style={{
                marginLeft: WP(15),
                color: BLACK_70,
                fontFamily: ROBOTO_MEDIUM,
              }}>
              {item.name}
            </Text>
          </RowContainer>
        </RowContainer>
      ))}
    </View>
  );
};

export default function EditProfile({route, navigation}) {
  const languague = useSelector(languageSelector.Localization);

  const {profileImg, userName, email} = route.params;

  const [getter, setter] = useState({
    fullName: userName,
    Email: email,
    isLoading: false,
    isVisible: false,
    attachment: {
      fileName: '',
      type: '',
      uri: profileImg,
    },
  });

  const onFilterSelect = useCallback(value => {
    const options = {
      mediaType: 'photo',
      selectionLimit: 1,
    };
    if (value == FILE) {
      launchImageLibrary(options, res => {
        if (res.assets) {
          const {fileName, type, uri} = res.assets[0];
          setter(prev => ({
            ...prev,
            attachment: {
              fileName,
              type,
              uri,
            },
          }));
          console.log(uri, type, fileName);
        }
      });
    }
    if (value == CAMERA) {
      launchCamera(options, res => {
        if (res.assets) {
          const {fileName, type, uri} = res.assets[0];
          setter(prev => ({
            ...prev,
            attachment: {
              fileName,
              type,
              uri,
            },
          }));
          console.log(uri, type, fileName);
        }
      });
    }
    close();
  }, []);

  const close = useCallback(() => {
    setter(prev => ({
      ...prev,
      isVisible: !prev.isVisible,
    }));
  }, [setter]);

  const [error, setError] = useState({
    fullNameError: '',
    emailError: '',
  });

  const dispatch = useDispatch();

  const onEdit = useCallback(() => {
    const isEmailValid = emailVerification(getter.Email);

    const [fullName] = isFeildValid(getter.fullName);

    if (isEmailValid == '' && fullName == '') {
      //make your api call here
      dispatch(
        updateUserProfile(
          getter.fullName,
          getter.Email,
          getter.attachment,
          setter,
          navigation,
        ),
      );
      setError(prev => ({
        ...prev,
        emailError: '',
        fullNameError: '',
      }));
    } else {
      setError(prev => ({
        ...prev,
        emailError: isEmailValid,
        fullNameError: fullName,
      }));
    }
    //check if any field is empty or invalid
  }, [getter, setter, Error, setError]);

  return (
    <View style={{flex: 1}}>
      <CommonHeader title={i18n[languague.code].editProfile} />
      <Container
        scrollViewContainerStyle={{
          ...GlobalStyles.containerStyle,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={styles.profileContainer}
          activeOpacity={0.8}
          onPress={() => close()}>
          <Image
            source={{
              uri: getter.attachment.uri,
            }}
            style={styles.profile}
            resizeMode="cover"
          />
          {/*
           * Select Photo Indicator
           */}
          <View
            style={{
              position: 'absolute',
              right: -10,
              bottom: 5,
              width: 35,
              height: 35,
              borderRadius: 27.5,
              backgroundColor: BACKGROUND_COLOR,
              padding: 3,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 27.5,
                backgroundColor: SECONDARY_COLOR,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <SvgXml
                xml={SORT}
                style={{marginTop: HP(5), marginLeft: WP(4)}}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View style={{marginTop: HP(40)}}>
          <FiledInput
            iconLeft={USER_SVG}
            style={styles.username}
            value={getter.fullName}
            onChangeText={text => {
              setter(prev => ({
                ...prev,
                fullName: text,
              }));
            }}
            errorMessage={error.fullNameError}
            placeholder={'Name'}
          />
          <FiledInput
            editable={false}
            iconLeft={EMAIL_SVG}
            style={styles.username}
            containerStyle={{marginTop: HP(15)}}
            value={getter.Email}
            onChangeText={text => {
              setter(prev => ({
                ...prev,
                Email: text,
              }));
            }}
            errorMessage={error.emailError}
            placeholder={'Email'}
          />
        </View>
        <ActionButton
          disabled={getter.isLoading ? true : false}
          style={styles.updateProfileBtn}
          callBack={() => onEdit()}>
          {getter.isLoading ? (
            <Loader color={'white'} size="small" />
          ) : (
            <Text style={styles.updateProfileTxt}>
              {i18n[languague.code].updateProfile}
            </Text>
          )}
        </ActionButton>
      </Container>
      <CommonFilterModal close={close} isVisible={getter.isVisible}>
        <FindAttachment close={close} callback={onFilterSelect} />
      </CommonFilterModal>
    </View>
  );
}

EditProfile.defaultProps = {
  userName: 'lisa harper',
  userEmail: 'lisa@gmail.com',
};

EditProfile.propTypes = {
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
};
