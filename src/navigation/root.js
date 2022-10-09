import {View, Text} from 'react-native';
import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Onboarding from '../screens/Onboarding';
import {createStackNavigator} from '@react-navigation/stack';
import AccountStack from './AccountStack';
import {DrawerStack} from './DrawerStack';
import ProductStack from './ProductStack';
import HomeSetting from '../screens/HomeSetting';
import Splash from '../screens/Splash';
import Details from '../screens/Details';
import CreateStack from '../screens/CreateStack';
import EditStack from '../screens/EditStack';
import AllFood from '../screens/AllFood';
import Soup from '../screens/Soup';
import OnlyFood from '../screens/OnlyFood';

const RootNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        {/* <Stack.Screen name="Account" component={AccountStack} /> */}
        <Stack.Screen name="Sidebar" component={DrawerStack} />

        <Stack.Screen
          name="DetailStack"
          component={Details}
          options={{
            headerShown: true,
            title: 'Food Item',
            drawerIcon: ({focused, size}) => (
              <Image source={IMAGE.bucket} style={styles.imageSize} />
              // <FontAwesome
              //   name="bitbucket"
              //   size={size}
              //   color={focused ? COLOR.primary : '#ccc'}
              // />
            ),
          }}
        />

        <Stack.Screen
          name="AllFood"
          component={AllFood}
          options={{
            headerShown: true,
            title: 'All Food',
            drawerIcon: ({focused, size}) => (
              <Image source={IMAGE.bucket} style={styles.imageSize} />
              // <FontAwesome
              //   name="bitbucket"
              //   size={size}
              //   color={focused ? COLOR.primary : '#ccc'}
              // />
            ),
          }}
        />

        <Stack.Screen
          name="Soup"
          component={Soup}
          options={{
            headerShown: true,
            title: 'Soup',
            drawerIcon: ({focused, size}) => (
              <Image source={IMAGE.bucket} style={styles.imageSize} />
              // <FontAwesome
              //   name="bitbucket"
              //   size={size}
              //   color={focused ? COLOR.primary : '#ccc'}
              // />
            ),
          }}
        />

        <Stack.Screen
          name="OnlyFood"
          component={OnlyFood}
          options={{
            headerShown: true,
            title: 'Soup',
            drawerIcon: ({focused, size}) => (
              <Image source={IMAGE.bucket} style={styles.imageSize} />
              // <FontAwesome
              //   name="bitbucket"
              //   size={size}
              //   color={focused ? COLOR.primary : '#ccc'}
              // />
            ),
          }}
        />

        <Stack.Screen
          name="CreateStack"
          component={CreateStack}
          options={{
            headerShown: true,
            title: 'Food Item',
            drawerIcon: ({focused, size}) => (
              <Image source={IMAGE.bucket} style={styles.imageSize} />
              // <FontAwesome
              //   name="bitbucket"
              //   size={size}
              //   color={focused ? COLOR.primary : '#ccc'}
              // />
            ),
          }}
        />

        <Stack.Screen
          name="EditStack"
          component={EditStack}
          options={{
            headerShown: true,
            title: 'Food Item',
            drawerIcon: ({focused, size}) => (
              <Image source={IMAGE.bucket} style={styles.imageSize} />
              // <FontAwesome
              //   name="bitbucket"
              //   size={size}
              //   color={focused ? COLOR.primary : '#ccc'}
              // />
            ),
          }}
        />

        {/* <Stack.Screen name="ProductStack" component={ProductStack} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
