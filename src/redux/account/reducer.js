import {
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_LOADING,
  CHANGE_PASSWORD_SUCCESS,
  GET_USER_FAILED,
  GET_USER_LOADING,
  GET_USER_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_LOADING,
  RESET_PASSWORD_SUCCESS,
  UPDATE_BUSINESS_FAILED,
  UPDATE_BUSINESS_LOADING,
  UPDATE_BUSINESS_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_USER_LOADING,
  UPDATE_USER_SUCCESS,
} from '../types';

const initialState = {
  data: {},
};
export function account_reducer(state = {}, action) {
  switch (action.type) {
    case GET_USER_LOADING:
      return {
        loading: true,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case GET_USER_FAILED:
      return {
        loading: false,
        error: action.error,
      };

    case UPDATE_USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        msg2: action.msg2,
        msg3: action.msg2
      };
    case UPDATE_USER_FAILED:
      return {
        loading: false,
        error: action.error,
      };

    case UPDATE_BUSINESS_LOADING:
      return {
        ...state,
        business_loading: true,
      };
    case UPDATE_BUSINESS_SUCCESS:
      return {
        ...state,
        business_loading: false,
        data: action.data,
        msg: action.msg,
      };
    case UPDATE_BUSINESS_FAILED:
      return {
        business_loading: false,
        error: action.error,
      };

    case CHANGE_PASSWORD_LOADING:
      return {
        ...state,
        password_changed_loading: true,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        password_changed_loading: false,
        data: action.data,
        msg: action.msg,
      };
    case CHANGE_PASSWORD_FAILED:
      return {
        password_changed_loading: false,
        error: action.error,
      };

    case RESET_PASSWORD_LOADING:
      return {
        ...state,
        reset_changed_loading: true,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        reset_changed_loading: false,
        data: action.data,
        msg: action.msg,
      };
    case RESET_PASSWORD_FAILED:
      return {
        reset_changed_loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
