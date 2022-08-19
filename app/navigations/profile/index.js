import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from '../../screens/profile/index';
import MyProfile from '../../screens/profile/MyProfile';

const Stack = createNativeStackNavigator();

const ProfileStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="MyProfile" component={MyProfile} />
  </Stack.Navigator>
);

export default ProfileStack;
