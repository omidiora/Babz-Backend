import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ViewProduct from '../screens/Product/ViewProduct';
import AddProduct from '../screens/Product/AddProduct';
import ViewProfile from '../screens/Profile/ViewProfile';
import EditProfile from '../screens/Profile/EditProfile';
import ChangePassword from '../screens/Profile/ChangePassword';

const ProfileStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="ViewProduct" component={ViewProduct} /> */}
      <Stack.Screen name="IndexProfile" component={ViewProfile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
     
      {/* ForgotPassword */}
    </Stack.Navigator>
  );
};

export default ProfileStack;
