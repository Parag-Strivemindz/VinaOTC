import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './Home';
import PaymentHistoryStack from './paymenhistory';
import SettingStack from './settings';
import ProfileStack from './profile';
import {SvgXml, Line, Svg} from 'react-native-svg';
import {SECONDARY_COLOR, WHITE} from '../styles/Fonts&Colors';
import {EMAIL_SVG} from '../constants/ImageConstant';
import {
  HOME_SVG,
  POSTCARD_SVG,
  SETTING_SVG,
  USER_SVG,
} from '../constants/IconConstant';
import {useFocusEffect} from '@react-navigation/native';
import PaymentHistory from '../screens/history';

const Tab = createBottomTabNavigator();

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
      options={{
        tabBarIcon: ({focused}) => (
          <TabBarIcon focused={focused} src={SETTING_SVG} />
        ),
      }}
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
