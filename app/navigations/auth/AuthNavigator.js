import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  SignUp,
  Login,
  ForgetPassword,
  ResetPassword,
} from '../../screens/auth/index';
import {BackHandler} from 'react-native';
import WantToExit from '../../component/WantToExit';

const Stack = createNativeStackNavigator();

function AuthNavigator() {
  const [getter, setter] = useState({
    isVisible: false,
  });
  const onClose = () => setter(prev => ({...prev, isVisible: !prev.isVisible}));

  const onQuite = () => {
    BackHandler.exitApp();
  };

  useEffect(() => {
    const unsubscribe = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        onClose();
        return true;
      },
    );
    return () => {
      unsubscribe.remove();
    };
  }, []);

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signup" component={SignUp} />
        <Stack.Screen name="forgetpassword" component={ForgetPassword} />
        <Stack.Screen name="resetpassword" component={ResetPassword} />
      </Stack.Navigator>
      <WantToExit
        isVisible={getter.isVisible}
        onClose={onClose}
        onQuit={onQuite}
      />
    </>
  );
}

export default AuthNavigator;
