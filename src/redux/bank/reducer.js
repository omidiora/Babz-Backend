import {
  GET_ALL_BANK_FAILED,
  GET_ALL_BANK_LOADING,
  GET_ALL_BANK_SUCCESS,
  UPDATE_BANK_FAILED,
  UPDATE_BANK_LOADING,
  UPDATE_BANK_SUCCESS,
  GET_BANK_USER_DETAILS_LOADING,
  GET_BANK_USER_DETAILS_SUCCESS,
  GET_BANK_USER_DETAILS_FAILED,
} from '../types';

const initialState = {
  data: {},
};
export function bank_reducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL_BANK_LOADING:
      return {
        loading: true,
      };
    case GET_ALL_BANK_SUCCESS:
      return {
        ...state,
        loading: false,
        bank: action.bank,
      };
    case GET_ALL_BANK_FAILED:
      return {
        loading: false,
        error: action.error,
      };

    case UPDATE_BANK_LOADING:
      return {
        loading: true,
      };
    case UPDATE_BANK_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        success:action.success
      };
    case UPDATE_BANK_FAILED:
      return {
        loading: false,
        error: action.error,
      };

    case GET_BANK_USER_DETAILS_LOADING:
      return {
        bank_user_details_loading: true,
      };
    case GET_BANK_USER_DETAILS_SUCCESS:
      return {
        ...state,
        bank_user_details_loading: false,
        bank_user_details: action.data,
      };
    case GET_BANK_USER_DETAILS_FAILED:
      return {
        bank_user_details_loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
