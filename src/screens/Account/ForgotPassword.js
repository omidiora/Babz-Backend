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
import FormCustomInput from '../../component/FormCustomInput';
import FormButton from '../../component/FormButton';
import FormValidator from '../../utils/FormValidator';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../../redux/auth/action';
import Validator from 'validatorjs';
import en from 'validatorjs/src/lang/en';
import {ForgotPasswordAction} from '../../redux/account/action';

Validator.setMessages('en', en);

const ForgotPassword = (props) => {
  const {navigation}=props;
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const reset_password = useSelector(state => state?.account);
  console.log(reset_password, 'reset_password_loadingreset_password_loading');

  const [values, setValues] = useState({
    email: '',
  });

  const validationSchema = {
    email: 'required|email',

    // password_confirmation: 'required',
  };

  console.log(Object.keys(errors).length, 'errrr');

  const onSubmit = () => {
    const validation = new Validator(values, validationSchema);
    if (validation.fails()) {
      setErrors(validation.errors);
      return;
    } else {
      dispatch(ForgotPasswordAction(values, navigation));
    }

    // setErrors(validation.errors);
  };

  const handleInputChange = (inputName, inputValue) => {
    setValues({
      ...values,
      [inputName]: inputValue,
    });
  };

  console.log(values, 'value');
  return (
    <View style={styles._mainContainer}>
      <View style={styles.container}>
        <View style={styles._headerContainer}>
          <Text style={styles._text}>Forgot Password</Text>
          <Text style={styles._text1}>
            Enter your registered email below to {'\n'}receive password reset
            instruction
          </Text>
        </View>

        {/* FORM input */}
        <View style={styles.inputContainer}>
          <ScrollView contentContainerStyle={{paddingBottom: WP(90)}}>
            <FormCustomInput
              lablelText="Email"
              onChangeText={value => handleInputChange('email', value)}
            />

            {/* {Error} */}

            {Object.keys(errors).length > 0 ? (
              <View style={{alignSelf: 'center'}}>
                <Text style={styles.error}>{errors?.errors?.email}</Text>
              </View>
            ) : (
              <>
                <Text style={{color: COLOR.primaryGreen,paddingBottom:2}}>
                  {reset_password?.msg}
                </Text>
              </>
            )}

            <FormButton
              btnTitle={
                reset_password?.reset_changed_loading ? (
                  <ActivityIndicator size="small" color={COLOR.whiteColor} />
                ) : (
                  'Continue'
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
                <Text style={{textAlign: 'center'}}>Already registered? </Text>
              </View>
              <TouchableOpacity>
                <Text style={{color: COLOR.primary}}>Login</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default ForgotPassword;

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
    fontSize: WP(7),
    paddingBottom: WP(2),
    top: WP(4),
  },
  _text1: {
    top: WP(6),
    width: WP(90),
    lineHeight: WP(5),
    color: COLOR.lightGrey,
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
