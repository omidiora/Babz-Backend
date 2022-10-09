import axios from 'axios';
import {BASE_URL as API_URL} from '../../utils/ApiServices';
import {_showErrorMessage} from '../../utils/Message';
import preferences from '../../utils/preferences';
import {
  LOGIN_FAILED,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  OTP_FAILED,
  OTP_LOADING,
  OTP_SUCCESS,
  REGISTRATION_FAILED,
  REGISTRATION_LOADING,
  REGISTRATION_SUCCESS,
  RESEND_OTP_FAILED,
  RESEND_OTP_LOADING,
  RESEND_OTP_SUCCESS,
} from '../types';

export const register = (payload, navigation) => {
  return async dispatch => {
    dispatch({
      type: REGISTRATION_LOADING,
    });
    try {
      const {data} = await axios.post(API_URL + '/register', payload);
      dispatch({
        type: REGISTRATION_SUCCESS,
        registration_success: data,
      });
      _showErrorMessage('Registraiton Successfully ', 'success');
      preferences._setItem('email', payload.email);
      // _setItem
      navigation.navigate('Login');
      return data;
    } catch (err) {
      _showErrorMessage('Unauthorized details ', 'danger');
      const error = err.response.data;
      console.log(error, 'error');

      dispatch({
        type: REGISTRATION_FAILED,
        error: error,
      });
      // throw err;
    }
  };
};

export const otpVerification = (payload, navigation) => {
  return async dispatch => {
    dispatch({
      type: OTP_LOADING,
    });
    try {
      const {data} = await axios.post(API_URL + '/verify', payload);
      const token = data?.token;
      preferences.setAuthSession({accessToken: token});
      dispatch({
        type: OTP_SUCCESS,
      });
      navigation.navigate('Success_1');
      return data;
    } catch (err) {
      const error = err.response.data.message;
      _showErrorMessage(error, 'danger');

      dispatch({
        type: OTP_FAILED,
        error: error,
      });
      throw err;
    }
  };
};

export const resendOtpVerification = (email, navigation) => {
  return async dispatch => {
    dispatch({
      type: RESEND_OTP_LOADING,
    });

    try {
      const {data} = await axios.post(API_URL + '/verify/resend', email);
      dispatch({
        type: RESEND_OTP_SUCCESS,
        otp: data,
      });

      return data;
    } catch (err) {
      const error = err.response.data.message;
      _showErrorMessage(error, 'danger');
      dispatch({
        type: RESEND_OTP_FAILED,
        error: error,
      });
      throw err;
    }
  };
};

export const LoginAction = (payload, navigation) => {
  return async dispatch => {
    dispatch({
      type: LOGIN_LOADING,
    });
    try {
      const {data} = await axios.post(API_URL + '/api-token-auth', payload);
      const token = data?.token;
      console.log(data?.user, 'data?.user?data?.user?');

      preferences.setAuthSession({accessToken: token});
      navigation.navigate('Sidebar', {
        screen: 'Home',
      });
      // if (
      //   data?.user?.home_address !== null &&
      //   data?.user?.phone !== null &&
      //   data?.user?.merchant?.business_address !== null &&
      //   data?.user?.merchant?.business_name !== null &&
      //   data?.user?.merchant?.business_email !== null &&
      //   data?.user?.merchant?.business_reg_type !== null &&
      //   data?.user?.bvn !== null &&
      //   data?.user?.business_reg_document !== null &&
      //   data?.user?.bank_details.length !== 0 &&
      //   data?.user?.merchant.stores.length !== 0
      // ) {
      //   navigation.navigate('Sidebar', {
      //     screen: 'Home',
      //   });
      // } else {
      //   navigation.navigate('Sidebar', {
      //     screen: 'BusinessStack',
      //   });
      // }
      dispatch({
        type: LOGIN_SUCCESS,
        data: data,
      });

      preferences._setItem('email', payload.email);
      console.log(data, ' datateta');

      // _setItem
      // navigation.navigate('Otp');
      return data;
    } catch (err) {
      const error = err.response.data;
      console.log(error, 'LOGIN fAILDED');
      dispatch({
        type: LOGIN_FAILED,
        error: error,
      });
      throw err;
    }
  };
};
