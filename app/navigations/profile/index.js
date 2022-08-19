import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from '../../screens/profile';

const Stack = createNativeStackNavigator();

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Profile" component={Profile} />
  </Stack.Navigator>
);

export default ProfileStack;
