import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ViewTransaction from '../screens/Transaction/ViewTransaction';
import DetailTransaction from '../screens/Transaction/DetailTransaction';

const TransactionStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
     <Stack.Screen name="ViewTransaction" component={ViewTransaction} /> 
      <Stack.Screen name="DetailTransaction" component={DetailTransaction} />
    </Stack.Navigator>
  );
};

export default TransactionStack;
