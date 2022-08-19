import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../screens/home';
import AllPortfolio from '../../screens/home/AllPortfolio';
import Portfolio from '../../screens/home/Portfolio';

const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="home" component={Home} />
    <Stack.Screen name="AllPortfolio" component={AllPortfolio} />
    <Stack.Screen name="Portfolio" component={Portfolio} />
  </Stack.Navigator>
);

export default HomeStack;
