import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import {AUTH_LOGIN} from './constants/AppConstant';
import AuthNavigator from './navigations/auth/AuthNavigator';
import BottomTab from './navigations/BottomTabNavigator';
import {getItem} from './utils/AsyncStorage';

const AppIndex = () => {
  useEffect(() => {
    getItem(AUTH_LOGIN).then(res => {
      if (!res) {
        SplashScreen.hide();
      } else {
        SplashScreen.hide();
      }
    });
  }, []);

  // return <AuthNavigator />;
  return <BottomTab />;
  // return userSession.data.token ? <BottomTabNavigator /> : <AuthNavigator />;
};

export default AppIndex;

const styles = StyleSheet.create({});
