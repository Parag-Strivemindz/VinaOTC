import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState, useMemo} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';

import {BackHandler, StatusBar, View} from 'react-native';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppIndex from './app/AppIndex';
import store from './app/store/redux/store';
import {BACKGROUND_COLOR} from './app/styles/Fonts&Colors';
import strings from './app/utils/Localization';
import * as RNLocalize from 'react-native-localize';
import {getItem} from './app/utils/AsyncStorage';
import {APP_LANGUAGE} from './app/constants/AppConstant';
import ShowNetworkError from './app/component/NetworkError';
import SplashScreen from 'react-native-splash-screen';
import WantToExit from './app/component/WantToExit';
import {useCallback} from 'react';

const App = () => {
  const netInfo = useNetInfo();

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

  useEffect(() => {
    SplashScreen.hide();
    function changeLanguage() {
      const locals = RNLocalize.getLocales();
      console.log(locals + ' locals');
      strings.setLanguage(locals[0].languageCode);
    }
    (async () => {
      try {
        console.log(strings.getInterfaceLanguage());
        console.log(strings.getAvailableLanguages());
        await getItem(APP_LANGUAGE).then(res => {
          if (res) {
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
      <NavigationContainer>
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
