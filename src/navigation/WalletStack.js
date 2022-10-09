import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WithDrawer from '../screens/Wallet/WithDraw'

const WalletStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
       <Stack.Screen name="Wallet" component={WithDrawer} />

    </Stack.Navigator>
  );
};

export default WalletStack;
