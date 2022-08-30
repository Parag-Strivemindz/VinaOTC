import React, {useRef} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useFocusEffect} from '@react-navigation/native';

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
  const hideOnRoute = ['Chat', 'PrivacyPolicy'];
  const routeName = getFocusedRouteNameFromRoute(route);
  const indexValue = hideOnRoute.indexOf(routeName);
  // console.log(routeName);
  return indexValue != -1 ? 'none' : 'flex';
};

const TabBarIcon = ({focused, src}) => {
  const ActiveBar = useRef(new Animated.Value(0)).current;

  useFocusEffect(() => {
    Animated.timing(ActiveBar, {
      toValue: focused ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  });

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
            transform: [
              {
                scale: ActiveBar,
              },
            ],
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
      options={{
        tabBarIcon: ({focused}) => (
          <TabBarIcon focused={focused} src={HOME_SVG} />
        ),
      }}
    />
    <Tab.Screen
      name="SettingStack"
      component={SettingStack}
      options={({route, navigation}) => ({
           tabBarStyle: {
          ...styles.tabBarContainer,
          display: getRouteName(route),
        },
        tabBarIcon: ({focused}) => (
          <TabBarIcon focused={focused} src={SETTING_SVG} />
        ),
      })}
    />
    <Tab.Screen
      name="PaymentHistory"
      component={PaymentHistory}
      options={{
        tabBarIcon: ({focused}) => (
          <TabBarIcon focused={focused} src={POSTCARD_SVG} />
        ),
      }}
    />
    <Tab.Screen
      name="ProfileStack"
      component={ProfileStack}
      options={{
        tabBarIcon: ({focused}) => (
          <TabBarIcon focused={focused} src={USER_SVG} />
        ),
      }}
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
