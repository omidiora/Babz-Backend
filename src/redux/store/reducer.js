import {
  CREATE_STORE_FAILED,
  CREATE_STORE_LOADING,
  CREATE_STORE_SUCCESS,
  GET_USER_FAILED,
  GET_USER_LOADING,
  GET_USER_SUCCESS,
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

    case CREATE_STORE_LOADING:
      return {
        ...state,
        store_loading: true,
      };
    case CREATE_STORE_SUCCESS:
      return {
        store_loading: false,
        store: action.data,
        msg: 'Store was successfully created',
      };
    case CREATE_STORE_FAILED:
      return {
        store_loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
