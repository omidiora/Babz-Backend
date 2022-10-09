import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ViewPayment from '../screens/Payment/ViewPayment';
import CreatePayment from '../screens/Payment/CreatePayment';

const PaymentStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ViewPayment" component={ViewPayment} />
      <Stack.Screen name="CreatePayment" component={CreatePayment} />

      {/* ForgotPassword */}
    </Stack.Navigator>
  );
};

export default PaymentStack;
