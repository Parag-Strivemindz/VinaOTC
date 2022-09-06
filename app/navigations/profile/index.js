import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from '../../screens/profile/index';
import MyProfile from '../../screens/profile/MyProfile';
import EditProfile from '../../screens/profile/EditProfile';
import WithdrawPayment from '../../screens/profile/WithdrawPayment';
import Notification from '../../screens/profile/Notification';
import AddMoney from '../../screens/home/AddMoney';
import Portfolio from '../../screens/home/Portfolio';
import AllPortfolio from '../../screens/home/AllPortfolio';
import BuyShares from '../../screens/home/BuyShares';
import SellShares from '../../screens/home/SellShares';

const Stack = createNativeStackNavigator();

const ProfileStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: 'none',
    }}>
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="MyProfile" component={MyProfile} />
    <Stack.Screen name="EditProfile" component={EditProfile} />
    <Stack.Screen name="WithdrawPayment" component={WithdrawPayment} />
    <Stack.Screen name="Notification" component={Notification} />
    <Stack.Screen name="AddMoney" component={AddMoney} />
    <Stack.Screen name="Portfolio" component={Portfolio} />
    <Stack.Screen name="AllPortfolio" component={AllPortfolio} />
    <Stack.Screen name="BuyShares" component={BuyShares} />
    <Stack.Screen name="SellShares" component={SellShares} />
  </Stack.Navigator>
);

export default ProfileStack;
