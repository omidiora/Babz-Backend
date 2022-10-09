import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BrandStore from '../screens/Store/BrandStore';
import ViewStore from '../screens/Store/ViewStore';
import CreateStore from '../screens/Store/CreateStore';

const StoreStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
 <Stack.Screen name="ViewStore" component={ViewStore} />
      <Stack.Screen name="CreateStore" component={CreateStore}  />
      <Stack.Screen name="BrandView" component={BrandStore} />
    </Stack.Navigator>
  );
};

export default StoreStack;
