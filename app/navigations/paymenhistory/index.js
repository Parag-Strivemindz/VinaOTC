import React from 'react';
import {Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import WithDrawal from '../../screens/history/Tabs/Withdraw';
import Deposit from '../../screens/history/Tabs/Deposit';
import {
  BACKGROUND_COLOR,
  POPPINS_REGULAR,
  ROBOTO_REGULAR,
  SECONDARY_COLOR,
  WHITE,
} from '../../styles/Fonts&Colors';
import {HP, WP} from '../../styles/Dimesions';

const Tab = createMaterialTopTabNavigator();

const Tabbar = ({name, focused, color}) => (
  <View
    style={{
      width: '100%',
      height: HP(40),
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: WP(20),
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    }}>
    <Text
      style={{
        color: WHITE,
        fontFamily: ROBOTO_REGULAR,
        textTransform: 'capitalize',
      }}>
      {name}
    </Text>
  </View>
);

function HistoryTabs() {
  return (
    <Tab.Navigator
      showPageIndicator={false}
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: BACKGROUND_COLOR,
          elevation: 0,
        },
        tabBarIndicatorStyle: {
          width: 0,
        },
      }}>
      <Tab.Screen
        name="Deposit"
        component={Deposit}
        options={{
          tabBarScrollEnabled: false,
          tabBarLabel: ({focused}) => (
            <Tabbar focused={focused} name={'Deposite Request'} />
          ),
        }}
      />
      <Tab.Screen
        name="WithDrawal"
        component={WithDrawal}
        options={{
          tabBarScrollEnabled: false,
          tabBarLabel: ({focused}) => (
            <Tabbar focused={focused} name={'Withdrawal Request'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default HistoryTabs;
