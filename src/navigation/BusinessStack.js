import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BankDetail from '../screens/Business/BankDetail';
import PersonalDetail from '../screens/Business/PersonalDetail';
import BussinessDetail from '../screens/Business/BussinessDetail';
import Compliance from '../screens/Business/Compliance';
import HomeSetting from '../screens/HomeSetting';

const BusinessStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeSetting" component={HomeSetting} />
      <Stack.Screen name="PersonalDetail" component={PersonalDetail} />
      <Stack.Screen name="BusineessDetail" component={BussinessDetail} />
      <Stack.Screen name="ComplianceDetail" component={Compliance} />
      <Stack.Screen name="BankDetail" component={BankDetail} />
    </Stack.Navigator>
  );
};

export default BusinessStack;
