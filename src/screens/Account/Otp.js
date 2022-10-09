import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {WP, HP, FONT, COLOR} from '../../common/theme';
import {useDispatch, useSelector} from 'react-redux';

import OtpInputs from 'react-native-otp-inputs';
import FormButton from '../../component/FormButton';
import {otpVerification, resendOtpVerification} from '../../redux/auth/action';
import preferences from '../../utils/preferences';

const Otp = ({labelTitle, headerTitle, navigation}) => {
  const [otpPin, setOtpPin] = useState(null);
  const loading = useSelector(state => state?.auth?.loading);
  const dispatch = useDispatch();

  const onSubmit = async () => {
    if (
      otpPin?.length !== 6 ||
      otpPin?.length == undefined ||
      otpPin?.length == null
    ) {
      Alert.alert('Enter the complete otp');
    } else {
      let email = await preferences._getItem('email');
      

      dispatch(otpVerification({email, verification_code: otpPin}, navigation));
    }
  };

  const resendOtp = async () => {
    dispatch(resendOtpVerification(email, navigation));
    
  };
  return (
    <View style={styles._mainContainer}>
      <View style={styles.container}>
        <View style={styles._headerContainer}>
          <Text style={styles._text}>Verify Account</Text>
          <Text style={styles._text1}>
            We have sent a Enter 6 digit code to your email and phone. Kindly
            enter it below
          </Text>
        </View>

        <View style={styles._text2}>
          <Text style={{fontWeight: 'bold', color:COLOR.primaryBrown}}>PIN</Text>
          <OtpInputs
            style={styles._otpMainContainer}
            handleChange={code => setOtpPin(code)}
            numberOfInputs={6}
            inputContainerStyles={styles._inputBox}
            inputStyles={styles._otpfInputs}
          />
        </View>
      </View>
      <View style={styles.formContainer}>
        <FormButton
          btnTitle={
            loading ? (
              <ActivityIndicator size="small" color={COLOR.whiteColor} />
            ) : (
              'Verify '
            )
          }
          backgroundColor={'#0062FF'}
          textColor={COLOR.whiteColor}
          onPress={() => onSubmit()}
        />
      </View>
      <View style={{top: WP(60), textAlign: 'center'}}>
        <Text style={{textAlign: 'center', paddingBottom: 15, color:COLOR.primaryBrown}}>
          Haven’t received verification code?
        </Text>

        <TouchableOpacity onPress={() => resendOtp()}>
          <Text style={{textAlign: 'center', color: COLOR.primaryGreen}}>
            Resend Code
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Otp;

const styles = StyleSheet.create({
  _mainContainer: {
    flex: 1,
    backgroundColor: COLOR.whiteColor,
  },
  container: {
    left: WP(10),
    top: WP(10),
  },

  _text: {
    fontWeight: 'bold',
    fontFamily: FONT.bold,
    fontSize: WP(6),
    paddingBottom: WP(2),
    top: WP(4),
    color:COLOR.primaryBrown
  },
  _text1: {
    top: WP(6),
    width: WP(90),
    color:COLOR.primaryBrown
  },
  _text2: {
    top: WP(20),
    color:COLOR.primaryBrown
  },
  inputContainer: {
    top: WP(15),
    width: WP(85),
    paddingBottom: WP(2),
  },
  error: {
    color: 'red',
    fontSize: WP(3),
    paddingBottom: WP(1),
  },
  _otpMainContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: WP(1),
    right: WP(3),
  },
  _inputBox: {
    width: WP('11%'),
    height: WP('12%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.whiteColor,
    borderColor: COLOR.lightGrey,
    // borderWidth: 2,
    borderRadius: WP(3),
  },
  _otpfInputs: {
    // fontFamily: FONT,
    fontSize: WP(4),
    color: COLOR.blackColor,
    width: '100%',
    height: '100%',
    textAlignVertical: 'center',
    borderRadius: WP(3),
    textAlign: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: COLOR.primary,
  },
  formContainer: {
    position: 'absolute',
    top: WP(78),
    // left: WP(3),
    width: '80%',
    alignSelf: 'center',
  },
});
