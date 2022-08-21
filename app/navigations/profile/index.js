import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from '../../screens/profile/index';
import MyProfile from '../../screens/profile/MyProfile';
import EditProfile from '../../screens/profile/EditProfile';
import AddFund from '../../screens/profile/AddFund';
import WithdrawPayment from '../../screens/profile/WithdrawPayment';
import Notification from '../../screens/profile/Notification';

const Stack = createNativeStackNavigator();

const ProfileStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="MyProfile" component={MyProfile} />
    <Stack.Screen name="EditProfile" component={EditProfile} />
    <Stack.Screen name="AddFund" component={AddFund} />
    <Stack.Screen name="WithdrawPayment" component={WithdrawPayment} />
    <Stack.Screen name="Notification" component={Notification} />
  </Stack.Navigator>
);

export default ProfileStack;
