import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
;
import Setting from '../screens/Setting/Index';

const SettingStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile_Settings" cosmponent={Setting} />
    </Stack.Navigator>
  );
};

export default SettingStack;
