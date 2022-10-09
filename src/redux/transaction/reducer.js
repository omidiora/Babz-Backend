import {
  GET_ALL_PAYMENT_FAILED,
  GET_ALL_PAYMENT_LOADING,
  GET_ALL_PAYMENT_SUCCESS,
  GET_ALL_TRANSACTION_FAILED,
  GET_ALL_TRANSACTION_LOADING,
  GET_ALL_TRANSACTION_SUCCESS,
  MAKE_REQEUST_FAILED,
  MAKE_REQEUST_LOADING,
  MAKE_REQEUST_SUCCESS,
  MAKE_WITHDRAW_FAILED,
  MAKE_WITHDRAW_LOADING,
  MAKE_WITHDRAW_SUCCESS,
} from '../types';

const initialState = {
  data: {},
};
export function transaction_reducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL_TRANSACTION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case GET_ALL_TRANSACTION_FAILED:
      return {
        loading: false,
        error: action.error,
      };

    case GET_ALL_PAYMENT_LOADING:
      return {
        ...state,
        loading: true,
      };
    // GET_ALL_PAYMENT_SUCCESS
    case GET_ALL_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        all_payment: action.payload,
      };
    case GET_ALL_PAYMENT_FAILED:
      return {
        loading: false,
        error: action.error,
      };

    case MAKE_WITHDRAW_LOADING:
      return {
        ...state,
        make_withdraw_loading: true,
      };
    // GET_ALL_PAYMENT_SUCCESS
    case MAKE_WITHDRAW_SUCCESS:
      return {
        ...state,
        make_withdraw_loading: false,
        withdral_payment: action.payload,
      };
    case MAKE_WITHDRAW_FAILED:
      return {
        make_withdraw_loading: false,
        error: action.error,
      };

    case MAKE_REQEUST_LOADING:
      return {
        ...state,
        make_withdraw_loading: true,
        success: false,
      };
    // GET_ALL_PAYMENT_SUCCESS
    case MAKE_REQEUST_SUCCESS:
      return {
        ...state,
        make_withdraw_loading: false,
        make_request_payment: action.payload,
        success: true,
      };
    case MAKE_REQEUST_FAILED:
      return {
        make_withdraw_loading: false,
        error: action.error,
        success: false,
      };

    default:
      return state;
  }
}
