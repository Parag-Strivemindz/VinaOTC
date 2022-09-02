import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import {
  getFocusedRouteNameFromRoute,
  useFocusEffect,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeStack from './Home';
import SettingStack from './settings';
import ProfileStack from './profile';
import {SvgXml} from 'react-native-svg';
import {SECONDARY_COLOR, WHITE} from '../styles/Fonts&Colors';

import {
  HOME_SVG,
  POSTCARD_SVG,
  SETTING_SVG,
  USER_SVG,
} from '../constants/IconConstant';
import PaymentHistory from '../screens/history';

const Tab = createBottomTabNavigator();

const getRouteName = route => {
  const hideOnRoute = ['home', 'Setting', 'Profile'];
  const routeName = getFocusedRouteNameFromRoute(route);
  if (routeName != undefined) {
    const onHide = hideOnRoute.indexOf(routeName);
    return onHide != -1 ? 'flex' : 'none';
  }
};

const TabBarIcon = ({focused, route, src}) => {
  return (
    <View>
      <SvgXml
        width={18}
        height={18}
        xml={src}
        style={styles.tabImg}
        stroke={focused ? SECONDARY_COLOR : WHITE}></SvgXml>
      {focused && (
        <Animated.View
          style={{
            width: 18,
            position: 'absolute',
            //   height: 10,
            borderColor: 'orange',
            borderBottomWidth: 2,
            borderBottomColor: SECONDARY_COLOR,
            alignSelf: 'center',
            bottom: -6,
            borderRadius: 10,
          }}></Animated.View>
      )}
    </View>
  );
};

const BottomTab = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
    }}>
    <Tab.Screen
      name="HomeStack"
      component={HomeStack}
      options={({route}) => ({
        tabBarStyle: {
          display: getRouteName(route),
        },
        tabBarIcon: ({focused}) => (
          <TabBarIcon focused={focused} route={route} src={HOME_SVG} />
        ),
      })}
    />
    <Tab.Screen
      name="SettingStack"
      component={SettingStack}
      options={({route, navigation}) => ({
        tabBarStyle: {
          display: getRouteName(route),
        },
        tabBarIcon: ({focused}) => (
          <TabBarIcon focused={focused} route={route} src={SETTING_SVG} />
        ),
      })}
    />

    <Tab.Screen
      name="PaymentHistory"
      component={PaymentHistory}
      options={({route}) => ({
        tabBarIcon: ({focused}) => (
          <TabBarIcon focused={focused} route={route} src={POSTCARD_SVG} />
        ),
      })}
    />
    <Tab.Screen
      name="ProfileStack"
      component={ProfileStack}
      options={({route}) => ({
        tabBarStyle: {
          display: getRouteName(route),
        },
        tabBarIcon: ({focused}) => (
          <TabBarIcon focused={focused} route={route} src={USER_SVG} />
        ),
      })}
    />
  </Tab.Navigator>
);
const styles = StyleSheet.create({
  tabImg: {
    width: '100%',
    height: '100%',
    // marginBottom: 5,
  },
});

export default BottomTab;
