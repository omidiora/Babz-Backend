import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Success_1 from '../screens/Account/Success_1';
import Icon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// FontAwesome

import {WP, COLOR, IMAGE, HP} from '../common/theme';
import Home from '../screens/HomeSetting';
import BusinessStack from './BusinessStack';
import StoreStack from './StoreStack';
import CreateStore from '../screens/Store/CreateStore';
import BrandStore from '../screens/Store/BrandStore';
import ProductStack from './ProductStack';
import TransactionStack from './TransactionStack';
import ProfileStack from './ProfileStack';
import Dashboard from '../screens/Dashboard';
import {getUserAction} from '../redux/account/action';
import {useDispatch, useSelector} from 'react-redux';
import DisputeStack from './DisputeStack';
import PaymentStack from './PaymentStack';
import WalletStack from './WalletStack';
import HomeSetting from '../screens/HomeSetting';
import Details from '../screens/Details';
import CreateStack from '../screens/CreateStack';
import Beans from '../screens/Beans';
import Rices from '../screens/Rice';
import PoundedYam from '../screens/PoundedYam';
import Egusi from '../screens/Egusi';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const [person, setPerson] = useState({});
  React.useEffect(() => {
    const fetchUser = async () => {
      let item = await dispatch(getUserAction());
      setPerson(value => ({
        ...value,
        ...item,
      }));
    };
    fetchUser();
  }, []);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        paddingVertical: WP(3),
        paddingBottom: WP(60),
      }}>
      <View style={styles._mainContainer}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Image source={IMAGE.umeIconSmall} style={styles.image} />
          </View>

          <View>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => navigation.closeDrawer()}>
              <Icon
                style={{paddingLeft: 10}}
                name="ios-close-outline"
                size={WP(10)}
                color={COLOR.blackColor}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.textContaininer1}>
          <Text style={{left: WP(9), color: COLOR.primaryBrown}}>
            {'Welcome'}
            <Text style={{fontWeight: 'bold', color: COLOR.brown}}>
              {' '}
              {person?.first_name}
            </Text>
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: WP(-18),
            left: WP(12),
            fontFamily: 'Open Sans',
            fontWeight: 'bold',
          }}>
          <Text
            style={{
              fontFamily: 'Open Sans',
              fontWeight: 'bold',
              color: COLOR.primaryBrown,
            }}>
            Babalola Hammed
          </Text>
          <Text style={{color: COLOR.primaryBrown}}>App Version 1.0</Text>
        </View>

        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
}

export const DrawerStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: 'transparent',
        drawerStyle: {
          // width: '100%',
          backgroundColor: COLOR.whiteColor,
        },
      }}
      //    screenOfTptions={{
      //     //options for drawer
      //     drawerLabel
      //     drawerIcon
      //     drawerActiveTintColor
      //     drawerActiveBackgroundColor
      //     drawerInactiveTintColor
      //     drawerInactiveBackgroundColor
      //     drawerItemStyle
      //     drawerLabelStyle
      //     drawerContentContainerStyle
      //     drawerContentStyle
      //     drawerStyle
      // }}
      // activeBackgroundColor: 'red',
      // activeTintColor: 'red',

      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Dashboard}
        options={{
          title: 'Home',
          drawerIcon: ({focused, size}) => (
            <Icon
              name="home"
              size={size}
              color={focused ? COLOR.primary : '#ccc'}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="BeanStack"
        component={Beans}
        options={{
          headerShown: true,
          title: 'Beans',
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

      <Drawer.Screen
        name="RiceStack"
        component={Rices}
        options={{
          headerShown: true,
          title: 'Jollof Rice',
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

      <Drawer.Screen
        name="PoundedYamStack"
        component={PoundedYam}
        options={{
          headerShown: true,
          title: 'Pounded Yam',
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

      <Drawer.Screen
        name="EgusiStack"
        component={Egusi}
        options={{
          headerShown: true,
          title: 'Egusi',
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

      {/* <Drawer.Screen name="Create" component={CreateStore} /> */}
      {/* <Drawer.Screen name="Store" component={StoreStack} /> */}
      {/* <Drawer.Screen name="Product" component={ProductStack} /> */}
      {/*  TransactionStack */}
      {/* <Drawer.Screen name="WithDrawalStack" component={WithDrawalStack} /> */}
      {/* <Drawer.Screen name="DisputeStack" component={Dispute} /> */}
      {/* <Drawer.Screen name="ProfileStack" component={ProfileStack} /> */}
      {/* WithDrawalStack */}

      {/* StoreStack */}
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  _mainContainer: {
    left: WP(4),
  },
  image: {
    width: WP(10),
    height: HP(6),
    top: WP(4),
  },
  icon: {
    left: WP(65),
    top: WP(3),
  },
  textContaininer1: {
    paddingBottom: WP(20),
    top: WP(14),
  },
  imageSize: {
    width: WP(5),
    height: WP(5),
  },
});
