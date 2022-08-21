import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../screens/home';
import AllPortfolio from '../../screens/home/AllPortfolio';
import Portfolio from '../../screens/home/Portfolio';
import BuyShares from '../../screens/home/BuyShares';
import AddMoney from '../../screens/home/AddMoney';
import SellShare from '../../screens/home/SellShare';

const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="home" component={Home} />
    <Stack.Screen name="AllPortfolio" component={AllPortfolio} />
    <Stack.Screen name="Portfolio" component={Portfolio} />
    <Stack.Screen name="BuyShares" component={BuyShares} />
    <Stack.Screen name="AddMoney" component={AddMoney} />
    <Stack.Screen name="SellShare" component={SellShare} />
  </Stack.Navigator>
);

export default HomeStack;
