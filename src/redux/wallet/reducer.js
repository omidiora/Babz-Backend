import {
  GET_ALL_PAYMENT_FAILED,
  GET_ALL_PAYMENT_LOADING,
  GET_ALL_PAYMENT_SUCCESS,
  GET_ALL_TRANSACTION_FAILED,
  GET_ALL_TRANSACTION_LOADING,
  GET_ALL_TRANSACTION_SUCCESS,
  GET_ALL_WALLET_REPORT_FAILED,
  GET_ALL_WALLET_REPORT_LOADING,
  GET_ALL_WALLET_REPORT_SUCCESS,
} from '../types';

const initialState = {
  data: {},
};
export function wallet_reducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL_WALLET_REPORT_LOADING:
      return {
        ...state,
        wallet_report_loading: true,
      };
    case GET_ALL_WALLET_REPORT_SUCCESS:
      return {
        ...state,
        wallet_report_loading: false,
        data: action.payload,
      };
    case GET_ALL_WALLET_REPORT_FAILED:
      return {
        wallet_report_loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
