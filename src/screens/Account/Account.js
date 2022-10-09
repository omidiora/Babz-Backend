//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  COLOR,
  IMAGE,
  TEXT_SIZES,
  MOBILE_WIDTH,
  SPACING_PERCENT,
  WP,
  HP,
  APP_NAME,
  RADIUS,
  TAB_ICON_SIZE,
  FONT_SIZES,
  FONT,
} from '../../common/theme';
import AppBar from '../../component/AppBar';
import FormButton from '../../component/FormButton';

const Account = props => {
  const {navigation} = props;
  7;
  return (
    <View style={styles._mainContainer}>
      <AppBar type={'light'} backgroundColor={COLOR.deepBlue} hidden={false} />

      <View>
        <Image source={IMAGE.accountHeader} style={styles.inner_image2} />
      </View>
      <View style={styles.textContainer}>
        {/* Boost your business with Odiopay */}
        <Text style={styles.text1}>Foodie</Text>
      </View>
      <Text style={styles.text2}>Designed and developed</Text>

      <View style={styles.buttonContainer1}>
        <FormButton
          btnTitle={'Register'}
          backgroundColor="white"
          textColor="black"
          fontWeight="bold"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
      <View style={styles.buttonContainer2}>
        <FormButton
          btnTitle={'Login'}
          backgroundColor={COLOR.primaryGreen}
          textColor={COLOR.whiteColor}
          fontWeight="bold"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  _mainContainer: {
    flex: 1,
    backgroundColor: COLOR.deepBlue,
    // primaryBlue
  },
  inner_image: {
    position: 'absolute',
    top: WP('15%'),
    resizeMode: 'contain',
    padding: WP(SPACING_PERCENT),
    alignSelf: 'center',
    height: HP('25%'),
  },
  inner_image2: {
    position: 'absolute',
    top: WP('51%'),
    resizeMode: 'contain',
    padding: WP(SPACING_PERCENT),
    alignSelf: 'center',
    height: HP('25%'),
  },
  textContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: HP(46),
  },
  text1: {
    fontSize: 45,
    fontWeight: 'bold',
    color: COLOR.whiteColor,
    fontFamily: FONT.bold,
  },
  text2: {
    fontSize: WP(5),
    fontWeight: '600',
    color: COLOR.whiteColor,
    fontFamily: FONT.light,
    top: HP(58),
    textAlign: 'center',
  },
  buttonContainer1: {
    width: WP(90),
    alignSelf: 'center',
    top: HP(64),
  },
  buttonContainer2: {
    width: WP(90),
    alignSelf: 'center',
    top: HP(65),
  },
});
