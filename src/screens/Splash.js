import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLOR, IMAGE, WP} from '../common/theme';
import AppBar from '../component/AppBar';
import preferences from '../utils/preferences';
import {getUserAction} from '../redux/account/action';
import {useDispatch, useSelector} from 'react-redux';
import {CommonActions} from '@react-navigation/native';

const Splash = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    preferences
      ._getItem('onboarding')
      .then(value => {
        if (value == '1') {
          preferences
            .getAuthSession()
            .then(async session => {
              console.log({session});
              if (session) {
                navigation.dispatch({
                  ...CommonActions.reset({
                    index: 0,
                    routes: [
                      {
                        name: 'Sidebar',
                        state: {
                          routes: [
                            {
                              name: 'Welcome',
                            },
                          ],
                        },
                      },
                    ],
                  }),
                });
              } else {
                navigation.dispatch({
                  ...CommonActions.reset({
                    index: 0,
                    routes: [
                      {
                        name: 'Sidebar',
                        state: {
                          routes: [
                            {
                              name: 'Welcome',
                            },
                          ],
                        },
                      },
                    ],
                  }),
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          navigation.navigate('Onboarding');
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  return (
    <View style={styles._mainContainer}>
      <AppBar type="dark" backgroundColor={COLOR.whiteColor} />
      <View style={styles._container}>
        <Image source={IMAGE.foodie} style={styles.image} />
        <Text style={styles.text}>Foodie</Text>
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  _mainContainer: {
    backgroundColor: COLOR.whiteColor,
    flex: 1,
  },

  _container: {
    alignSelf: 'center',
    top: WP(70),
    left: WP(7),
  },
  image: {
    width: WP(15),
    height: WP(15),
  },
  text: {
    fontWeight: 'bold',
    fontSize: WP(8),
    textAlign: 'center',
    right: WP(8),
  },
});
