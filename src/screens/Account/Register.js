import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {WP, HP, FONT, COLOR} from '../../common/theme';
import FormInput from '../../component/FormInput';
import FormButton from '../../component/FormButton';
import FormValidator from '../../utils/FormValidator';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../../redux/auth/action';
import Validator from 'validatorjs';
import en from 'validatorjs/src/lang/en';
import PasswordInput from '../../component/PasswordInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import GetLocation from 'react-native-get-location';
import AppBar from '../../component/AppBar';

Validator.setMessages('en', en);

const Register = ({labelTitle, headerTitle, navigation}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const register_loading = useSelector(state => state?.auth?.loading);

  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const validationSchema = {
    last_name: 'required',
    first_name: 'required',

    email: 'required|email',
    password: 'required|min:6',
    confirm_password: 'same:password',
    // password_confirmation: 'required',
  };

  const onSubmit = () => {
    const validation = new Validator(values, validationSchema);
    if (validation.fails()) {
      setErrors(validation.errors);
      return;
    }
    dispatch(
      register(
        {
          last_name: values.last_name,
          first_name: values.first_name,
          password: values.password,
          password2: values.password,
          username: values.email,
          email: values.email,
        },
        navigation,
      ),
    );

    // setErrors(validation.errors);
  };

  const handleInputChange = (inputName, inputValue) => {
    setValues({
      ...values,
      [inputName]: inputValue,
    });
  };

  return (
    <KeyboardAwareScrollView
      style={styles._mainContainer}
      resetScrollToCoords={{x: 0, y: 0}}
      contentContainerStyle={{paddingBottom: WP(50)}}>
      <AppBar type={'dark'} backgroundColor={COLOR.whiteColor} hidden={false} />

      <View style={styles.container}>
        <View style={styles._headerContainer}>
          <Text style={styles._text} onPress={() => getLocation()}>
            Register
          </Text>
          <Text style={styles._text1}>Register an account to get started</Text>
        </View>

        {/* FORM input */}
        <View style={styles.inputContainer}>
          <View
            contentContainerStyle={{paddingBottom: WP(90)}}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <FormInput
              lablelText="First Name"
              onChangeText={value => handleInputChange('first_name', value)}
            />
            <FormInput
              lablelText="Last Name"
              onChangeText={value => handleInputChange('last_name', value)}
            />

            <FormInput
              lablelText="Email"
              onChangeText={value => handleInputChange('email', value)}
            />
            <PasswordInput
              lablelText="Password"
              onChangeText={value =>
                handleInputChange('confirm_password', value)
              }
            />

            <PasswordInput
              lablelText="Confirm Password"
              onChangeText={value => handleInputChange('password', value)}
            />

            {/* {Error} */}

            {Object.keys(errors).length > 0 && (
              <View style={{alignSelf: 'center'}}>
                <Text style={styles.error}>{errors?.errors?.email}</Text>
                <Text style={styles.error}>{errors?.errors?.last_name}</Text>
                <Text style={styles.error}>{errors?.errors?.first_name}</Text>
                <Text style={styles.error}>{errors?.errors?.password}</Text>
                <Text style={styles.error}>
                  {errors?.errors?.confirm_password}
                </Text>
              </View>
            )}
            <FormButton
              // register_loading
              btnTitle={
                register_loading ? (
                  <ActivityIndicator size="small" color={COLOR.whiteColor} />
                ) : (
                  'Register'
                )
              }
              backgroundColor={COLOR.primary}
              textColor={COLOR.whiteColor}
              fontWeight={'bold'}
              onPress={() => onSubmit()}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                top: WP(7),
              }}>
              <View>
                <Text style={{textAlign: 'center', color: COLOR.primaryBrown}}>
                  Already registered?{' '}
                </Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{color: COLOR.primary}}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  _mainContainer: {
    flex: 1,
    backgroundColor: COLOR.whiteColor,
  },
  container: {
    // left: WP(10),
    top: WP(10),
    alignSelf: 'center',
  },

  _text: {
    fontWeight: 'bold',
    fontFamily: FONT.bold,
    fontSize: WP(9),
    paddingBottom: WP(2),
    top: WP(4),
    color: COLOR.primaryBrown,
  },
  _text1: {
    top: WP(6),
    color: COLOR.primaryBrown,
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
});
