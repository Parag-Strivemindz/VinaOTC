import {BackHandler, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {useSelector, useDispatch} from 'react-redux';

import Container from '../../component/Container';
import Header from '../../component/Header';
import RowContainer from '../../component/RowContainer';

import {
  ARROW_BACK,
  CHAT,
  SERVICES,
  THUMB,
  UNLOCK,
  LOGOUT,
  LOGO_VERSION,
} from '../../constants/IconConstant';
import {
  BACKGROUND_COLOR,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_REGULAR,
  SECONDARY_COLOR,
  WHITE,
  WHITE_50,
} from '../../styles/Fonts&Colors';
import {SignOut} from '../../services/auth';
import {HP, WP} from '../../styles/Dimesions';
import {
  HEADER_HEIGHT,
  PADDING_HORIZONTAL,
  PADDING_VERTICAL,
} from '../../styles/GlobalStyles';
import {Selector as UserSelector} from '../../store/redux/user';
import Loader from '../../component/Loader';
import WantToExit from '../../component/WantToExit';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';

const Setting = ({navigation}) => {
  const userInfo = useSelector(UserSelector.User_Info);

  const [isLoader, setLoader] = useState(false);

  const navigateTo = screenName => {
    navigation.navigate(screenName);
  };

  const dispatch = useDispatch();

  const [getter, setter] = useState({
    isVisible: false,
  });
  const onClose = () => setter(prev => ({...prev, isVisible: !prev.isVisible}));

  const onQuite = () => {
    BackHandler.exitApp();
  };

  useFocusEffect(
    useCallback(() => {
      console.log('called');
      const unsubscribe = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          onClose();
          return true;
        },
      );
      return () => unsubscribe.remove();
    }),
  );
  // useEffect(() => {
  //   const unsubscribe = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     () => {
  //       onClose();
  //       return true;
  //     },
  //   );
  //   return () => {
  //     unsubscribe.remove();
  //   };
  // }, []);

  const ItemContainer = ({icon, title, callback}) => {
    return (
      <RowContainer
        callback={callback}
        style={{
          borderRadius: 5,
          borderWidth: 0.5,
          borderColor: 'rgba(255,255,255,0.15)',
          marginTop: HP(20),
          height: HP(63),
          alignItems: 'center',
          paddingHorizontal: 20,
          elevation: 3,
          shadowRadius: 2,
          shadowColor: 'rgba(255,255,255,0.7)',
          backgroundColor: BACKGROUND_COLOR,
          marginHorizontal: PADDING_HORIZONTAL,
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <SvgXml xml={icon} style={{marginRight: 15}} />
          <Text
            style={{
              color: WHITE,
              fontFamily: MONTSERRAT_MEDIUM,
              fontSize: WP(16),
            }}>
            {title}
          </Text>
        </View>
        <SvgXml xml={ARROW_BACK} rotation={180} />
      </RowContainer>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header />
      <Container
        scrollViewContainerStyle={{flexGrow: 1}}
        containerStyles={{
          paddingTop: HP(HEADER_HEIGHT + PADDING_VERTICAL),
        }}>
        <ItemContainer
          icon={CHAT}
          title={'Chat With Us'}
          callback={() => navigateTo('Chat')}
        />
        <ItemContainer
          icon={SERVICES}
          title={'Help & Support'}
          callback={() => navigateTo('HelpAndSupport')}
        />
        <ItemContainer
          callback={() => navigateTo('PrivacyPolicy')}
          icon={THUMB}
          title={'Privacy Policy'}
        />
        <ItemContainer
          callback={() => navigateTo('ChangePassword')}
          icon={UNLOCK}
          title={'Change Password'}
        />
        {isLoader ? (
          <Loader size={'large'} color={SECONDARY_COLOR} />
        ) : (
          <ItemContainer
            icon={LOGOUT}
            title={'Log Me Out'}
            callback={() => dispatch(SignOut(setLoader))}
          />
        )}
        <View
          style={{
            width: '100%',
            position: 'absolute',
            alignItems: 'center',
            bottom: HP(57),
          }}>
          <SvgXml xml={LOGO_VERSION} />
          <Text
            style={{
              color: WHITE_50,
              fontFamily: MONTSERRAT_REGULAR,
              marginTop: HP(5),
            }}>
            v16.3.3(0)
          </Text>
        </View>
      </Container>
      <WantToExit
        isVisible={getter.isVisible}
        onClose={onClose}
        onQuit={onQuite}
      />
    </View>
  );
};

export default Setting;
