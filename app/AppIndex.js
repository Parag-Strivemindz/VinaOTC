import React, {useEffect, useState} from 'react';
import {StyleSheet, ImageBackground, BackHandler} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {useSelector, useDispatch} from 'react-redux';

import AuthNavigator from './navigations/auth/AuthNavigator';
import {AUTH_LOGIN, STATUS_ACTIVE} from './constants/AppConstant';
import BottomTab from './navigations/BottomTabNavigator';
import {getItem} from './utils/AsyncStorage';
import {Selector} from './store/redux/user/index';
import {getUserInfo} from './services/user/Index';
import {LAUNCH_SCREEN} from './constants/ImageConstant';
import WantToExit from './component/WantToExit';
import {useNavigation} from '@react-navigation/native';

const AppIndex = () => {
  const [loader, isLoader] = useState(false);

  const navigation = useNavigation();

  const userInfo = useSelector(Selector.User_Info);
  const dispatch = useDispatch();

  useEffect(() => {
    getItem(AUTH_LOGIN).then(res => {
      if (res) {
        dispatch(getUserInfo(isLoader));
      }
    });
  }, []);

  if (!loader) {
    if (userInfo.data) {
      if (userInfo.data.data.Status === STATUS_ACTIVE) {
        return <BottomTab />;
      }
    } else {
      return <AuthNavigator />;
    }
  }

  return (
    <>
      <ImageBackground
        source={LAUNCH_SCREEN}
        style={{flex: 1}}
        resizeMode="cover"
        imageStyle={{flex: 1}}></ImageBackground>
    </>
  );
};

export default AppIndex;

const styles = StyleSheet.create({});
