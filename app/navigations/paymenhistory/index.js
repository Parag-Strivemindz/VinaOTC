import React from 'react';
import {Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import WithDrawal from '../../screens/history/Tabs/Withdraw';
import Deposit from '../../screens/history/Tabs/Deposit';
import {
  BACKGROUND_COLOR,
  ROBOTO_REGULAR,
  SECONDARY_COLOR,
  WHITE,
} from '../../styles/Fonts&Colors';
import {HP, WP} from '../../styles/Dimesions';
import {Selector} from '../../store/redux/localization';
import {useSelector} from 'react-redux';
import {i18n} from '../../i18n/lang';

const Tab = createMaterialTopTabNavigator();

const Tabbar = ({name, focused, color}) => (
  <View
    style={{
      borderRadius: 3,
      paddingHorizontal: WP(10),
      height: HP(35),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: focused ? color : 'rgba(255,255,255,0.1)',
    }}>
    <Text
      style={{
        fontSize: WP(15),
        color: WHITE,
        fontFamily: ROBOTO_REGULAR,
        textTransform: 'capitalize',
      }}>
      {name}
    </Text>
  </View>
);

function HistoryTabs() {
  const language = useSelector(Selector.Localization);
  return (
    <Tab.Navigator
      showPageIndicator={false}
      screenOptions={{
        tabBarPressOpacity: 0,
        tabBarPressColor: BACKGROUND_COLOR,
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
          // tabBarItemStyle: {
          //   elevation: 10,
          //   shadowColor: WHITE,
          //   shadowOpacity: 10,
          // },
          swipeEnabled: false,
          tabBarLabel: ({focused}) => (
            <Tabbar
              focused={focused}
              name={i18n[language.code].depostiRequest}
              color={SECONDARY_COLOR}
            />
          ),
        }}
      />
      <Tab.Screen
        name="WithDrawal"
        component={WithDrawal}
        options={{
          swipeEnabled: false,
          tabBarLabel: ({focused}) => (
            <Tabbar
              focused={focused}
              name={i18n[language.code].withdrawalRequest}
              color={'red'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default HistoryTabs;
