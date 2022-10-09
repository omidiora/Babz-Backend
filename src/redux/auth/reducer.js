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

const initialState = {};
export function Register_Reducer(state = initialState, action) {
  switch (action.type) {
    case REGISTRATION_LOADING:
      return {
        loading: true,
      };
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.registration_success,
      };
    case REGISTRATION_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case OTP_LOADING:
      return {
        loading: true,
      };
    case OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        otp: action.otp,
      };
    case OTP_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case RESEND_OTP_LOADING:
      return {
        resend_loading_otp: true,
      };
    case RESEND_OTP_SUCCESS:
      return {
        resend_loading_otp: false,
        resend_otp: action.otp,
      };
    case RESEND_OTP_FAILED:
      return {
        resend_loading_otp: false,
        error: action.error,
      };

    case LOGIN_LOADING:
      return {
        login_loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        login_loading: false,
        login_user: action.data,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        login_loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
