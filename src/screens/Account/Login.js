import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {WP, HP, FONT, COLOR} from '../../common/theme';
import FormInput from '../../component/FormInput';
import FormButton from '../../component/FormButton';
import {useDispatch, useSelector} from 'react-redux';
import {LoginAction, register} from '../../redux/auth/action';
import Validator from 'validatorjs';
import en from 'validatorjs/src/lang/en';
import PasswordInput from '../../component/PasswordInput';
import AppBar from '../../component/AppBar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

Validator.setMessages('en', en);

const Login = ({labelTitle, headerTitle, navigation}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(true);
  const {login_loading, error} = useSelector(state => state?.auth);
  const reset_password = useSelector(state => state?.account);

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const validationSchema = {
    email: 'required',
    password: 'required',

    // password_confirmation: 'required',
  };

  const onSubmit = () => {
    const validation = new Validator(values, validationSchema);
    if (validation.fails()) {
      setErrors(validation.errors);
      return;
    }
    dispatch(
      LoginAction(
        {
          username: values.email,
          password: values.password,
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
      contentContainerStyle={{paddingBottom: WP(50)}}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <AppBar type={'dark'} backgroundColor={COLOR.whiteColor} hidden={false} />

      <View style={styles.container}>
        <View style={styles._headerContainer}>
          <Text style={styles._text}>Sign In</Text>
          <Text style={styles._text1}>Log in to the account using email</Text>
        </View>
        <Text style={{color: COLOR.primaryGreen, paddingBottom: 2, top: WP(9)}}>
          {reset_password?.msg}
        </Text>

        {/* FORM input */}
        <View style={styles.inputContainer}>
          <View>
            <FormInput
              lablelText="Email"
              onChangeText={value => handleInputChange('email', value)}
            />
            <PasswordInput
              lablelText="Password"
              onChangeText={value => handleInputChange('password', value)}
            />

            {/* {Error} */}

            {Object.keys(errors).length > 0 && (
              <View style={{alignSelf: 'center'}}>
                <Text style={styles.error}>
                  {errors?.errors?.business_name}
                </Text>
                <Text style={styles.error}>{errors?.errors?.email}</Text>
                <Text style={styles.error}>{errors?.errors?.password}</Text>
              </View>
            )}

            <Text style={styles.error}>{error?.message}</Text>
            <FormButton
              // register_loading
              btnTitle={
                login_loading ? (
                  <ActivityIndicator size="small" color={COLOR.whiteColor} />
                ) : (
                  'Login'
                )
              }
              backgroundColor={COLOR.primary}
              textColor={COLOR.whiteColor}
              fontWeight={'bold'}
              onPress={() => onSubmit()}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text
                style={{
                  textAlign: 'center',
                  top: WP(3),
                  textDecorationLine: 'underline',
                  color: COLOR.deepBlue,
                }}>
                {'Click here to register'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;

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
    textAlign: 'center',
  },
});
