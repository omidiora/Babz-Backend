import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ViewProduct from '../screens/Product/ViewProduct';
import AddProduct from '../screens/Product/AddProduct';
import EditProduct from '../screens/Product/EditProduct';

const ProductStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ViewProduct" component={ViewProduct} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="EditProduct" component={EditProduct} />
    </Stack.Navigator>
  );
};

export default ProductStack;
