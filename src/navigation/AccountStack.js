import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Account from '../screens/Account/Account';
import Register from '../screens/Account/Register';
import Otp from '../screens/Account/Otp';
import Success_1 from '../screens/Account/Success_1';
import Login from '../screens/Account/Login';
import ForgotPassword from '../screens/Account/ForgotPassword';

const AccountStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={Account} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="Success_1" component={Success_1} />
      <Stack.Screen name="Profile_Settings" component={Success_1} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AccountStack;
