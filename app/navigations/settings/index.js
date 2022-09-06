import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Setting from '../../screens/setting';
import HelpAndSupport from '../../screens/setting/HelpAndSupport';
import ChangePassword from '../../screens/setting/ChangePassword';
import Chat from '../../screens/setting/Chat';
import PrivacyPolicy from '../../screens/setting/PrivacyPolicy';

const Stack = createNativeStackNavigator();

const SettingStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: 'none',
    }}>
    <Stack.Screen name="Setting" component={Setting} />
    <Stack.Screen name="Chat" component={Chat} />
    <Stack.Screen name="HelpAndSupport" component={HelpAndSupport} />
    <Stack.Screen name="ChangePassword" component={ChangePassword} />
    <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
  </Stack.Navigator>
);

export default SettingStack;
