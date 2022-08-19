import React from 'react';
import {Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Indices from '../../screens/home/TopTab/Indices';
import IndicesFuture from '../../screens/home/TopTab/IndicesFuture';
import Shares from '../../screens/home/TopTab/Shares';
import {
  BACKGROUND_COLOR,
  POPPINS_REGULAR,
  SECONDARY_COLOR,
} from '../../styles/Fonts&Colors';

const Tab = createMaterialTopTabNavigator();

const Tabbar = ({name, focused, color}) => (
  <View>
    <Text
      style={{
        color: SECONDARY_COLOR,
        fontFamily: POPPINS_REGULAR,
        textTransform: 'capitalize',
      }}>
      {name}
    </Text>
    <View
      style={{
        width: focused ? 20 : 0,
        backgroundColor: SECONDARY_COLOR,
        height: 2,
      }}></View>
  </View>
);

function TopTab() {
  return (
    <Tab.Navigator
      showPageIndicator={false}
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: BACKGROUND_COLOR,
        },
        tabBarIndicatorStyle: {
          width: 0,
        },
      }}>
      <Tab.Screen
        name="Indices"
        component={Indices}
        options={{
          tabBarLabel: ({focused, color}) => (
            <Tabbar name={'Indices'} focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="IndicesFuture"
        component={IndicesFuture}
        options={{
          tabBarLabel: ({focused, color}) => (
            <Tabbar name={'Indices Future'} focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Shares"
        component={Shares}
        options={{
          tabBarLabel: ({focused, color}) => (
            <Tabbar name={'Shares'} focused={focused} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TopTab;
