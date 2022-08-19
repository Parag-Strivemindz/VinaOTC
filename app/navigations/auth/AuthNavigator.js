import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  SignUp,
  Login,
  ForgetPassword,
  ResetPassword,
} from '../../screens/auth/index';

const Stack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={SignUp} />
      <Stack.Screen name="forgetpassword" component={ForgetPassword} />
      <Stack.Screen name="resetpassword" component={ResetPassword} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
