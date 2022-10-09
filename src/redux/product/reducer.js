import {
  CREATE_PRODUCT_FAILED,
  CREATE_PRODUCT_LOADING,
  CREATE_PRODUCT_SUCCESS,
  GET_ALL_PRODUCT_BY_PAGINATION_FAILED,
  GET_ALL_PRODUCT_BY_PAGINATION_LOADING,
  GET_ALL_PRODUCT_BY_PAGINATION_SUCCESS,
  GET_ALL_PRODUCT_CATEGORY_FAILED,
  GET_ALL_PRODUCT_CATEGORY_LOADING,
  GET_ALL_PRODUCT_CATEGORY_SUCCESS,
  GET_ALL_PRODUCT_FAILED,
  GET_ALL_PRODUCT_LOADING,
  GET_ALL_PRODUCT_SUCCESS,
  GET_PAYMENT_OPTION_FAILED,
  GET_PAYMENT_OPTION_LOADING,
  GET_PAYMENT_OPTION_SUCCESS,
  SEARCH_PRODUCT_FAILED,
  SEARCH_PRODUCT_LOADING,
  SEARCH_PRODUCT_SUCCESS,
  SET_PAYMENT_OPTION_FAILED,
  SET_PAYMENT_OPTION_LOADING,
  SET_PAYMENT_OPTION_SUCCESS,
} from '../types';

const initialState = {
  data: {},
};
export function product_reducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL_PRODUCT_CATEGORY_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_PRODUCT_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case GET_ALL_PRODUCT_CATEGORY_FAILED:
      return {
        loading: false,
        error: action.error,
      };

    case GET_ALL_PRODUCT_LOADING:
      return {
        ...state,
        all_product_loading: true,
      };
    case GET_ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        all_product_data: action.payload,
      };
    case GET_ALL_PRODUCT_FAILED:
      return {
        all_product_loading: false,
        error: action.error,
      };

    case CREATE_PRODUCT_LOADING:
      return {
        ...state,
        product_loading: true,
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        new_product: action.payload,
      };
    case CREATE_PRODUCT_FAILED:
      return {
        loading: false,
        error: action.error,
      };

    case SEARCH_PRODUCT_LOADING:
      return {
        search_loading: true,
      };
    case SEARCH_PRODUCT_SUCCESS:
      return {
        ...state,
        search_loading: false,
        search_product: action.payload,
      };
    case SEARCH_PRODUCT_FAILED:
      return {
        search_loading: false,
        error: action.error,
      };

    case GET_PAYMENT_OPTION_LOADING:
      return {
        payment_option_loading: true,
      };
    case GET_PAYMENT_OPTION_SUCCESS:
      return {
        ...state,
        payment_option_loading: false,
        payment_option_product: action.payload,
      };
    case GET_PAYMENT_OPTION_FAILED:
      return {
        payment_option_loading: false,
        error: action.error,
      };

    case GET_ALL_PRODUCT_BY_PAGINATION_LOADING:
      return {
        pagination_loading: true,
      };
    case GET_ALL_PRODUCT_BY_PAGINATION_SUCCESS:
      return {
        ...state,
        pagination_loading: false,
        pagination_product: action.payload,
      };
    case GET_ALL_PRODUCT_BY_PAGINATION_FAILED:
      return {
        pagination_loading: false,
        error: action.error,
      };

    case SET_PAYMENT_OPTION_LOADING:
      return {
        payment_option_loading: true,
      };
    case SET_PAYMENT_OPTION_SUCCESS:
      return {
        ...state,
        payment_option_loading: false,
        payment_option: action.payload,
      };
    case SET_PAYMENT_OPTION_FAILED:
      return {
        payment_option_loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
