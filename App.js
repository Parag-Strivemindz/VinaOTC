import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState, useMemo, useRef} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {BackHandler, StatusBar, View} from 'react-native';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import * as RNLocalize from 'react-native-localize';
import SplashScreen from 'react-native-splash-screen';

import AppIndex from './app/AppIndex';
import store from './app/store/redux/store';
import strings from './app/utils/Localization';
import {getItem} from './app/utils/AsyncStorage';
import ShowNetworkError from './app/component/NetworkError';
// import navigationRef from './app/component/NavigationRef';

import {APP_LANGUAGE} from './app/constants/AppConstant';
import {BACKGROUND_COLOR} from './app/styles/Fonts&Colors';
import useNavigationRef from './app/component/NavigationRef';

const App = () => {
  const netInfo = useNetInfo();

  // const navRef = useRef();
  const [navRef, resetNavigationState] = useNavigationRef();

  const MyTheme = {
    ...DefaultTheme,
    dark: false,
    colors: {
      primary: 'rgb(255, 45, 85)',
      background: 'rgb(242, 242, 242)',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
    },
  };

  function changeLanguage() {
    const locals = RNLocalize.getLocales();
    console.log(locals + ' locals');
    strings.setLanguage(locals[0].languageCode);
  }

  useEffect(() => {
    SplashScreen.hide();
    (async () => {
      try {
        await getItem(APP_LANGUAGE).then(res => {
          if (res) {
            console.log(res);
            const {code, value} = JSON.parse(res);
            strings.setLanguage(code);
          } else {
            RNLocalize.addEventListener('change', changeLanguage);
          }
        });
      } catch (Err) {}
    })();
    return () => RNLocalize.removeEventListener('change', changeLanguage);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: BACKGROUND_COLOR}}>
      <NavigationContainer ref={navRef}>
        <Provider store={store}>
          <SafeAreaProvider>
            <StatusBar
              backgroundColor={BACKGROUND_COLOR}
              barStyle={'light-content'}
            />
            {netInfo.isConnected ? <AppIndex /> : <ShowNetworkError />}
          </SafeAreaProvider>
        </Provider>
      </NavigationContainer>
    </View>
  );
};

export default App;
