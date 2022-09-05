import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../screens/home';
import AllPortfolio from '../../screens/home/AllPortfolio';
import Portfolio from '../../screens/home/Portfolio';
import BuyShares from '../../screens/home/BuyShares';
import AddMoney from '../../screens/home/AddMoney';
import SellShares from '../../screens/home/SellShares';

const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: 'default',
    }}>
    <Stack.Screen name="home" component={Home} />
    <Stack.Screen name="AllPortfolio" component={AllPortfolio} />
    <Stack.Screen name="Portfolio" component={Portfolio} />
    <Stack.Screen name="AddMoney" component={AddMoney} />
    <Stack.Screen name="SellShares" component={SellShares} />
    <Stack.Screen name="BuyShares" component={BuyShares} />
  </Stack.Navigator>
);

export default HomeStack;
