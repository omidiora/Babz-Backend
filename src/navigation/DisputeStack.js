import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ResolveDispute from '../screens/Dispute/ResolveDispute';

const DisputeStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
    
      <Stack.Screen name="ResolveDispute" component={ResolveDispute} />
    </Stack.Navigator>
  );
};

export default DisputeStack;
