import {
  CREATE_STORE_FAILED,
  CREATE_STORE_LOADING,
  CREATE_STORE_SUCCESS,
  GET_ALL_INDUSTRY_FAILED,
  GET_ALL_INDUSTRY_LOADING,
  GET_ALL_INDUSTRY_SUCCESS,
} from '../types';

const initialState = {
  data: {},
};
export function industry_reducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL_INDUSTRY_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_INDUSTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case GET_ALL_INDUSTRY_FAILED:
      return {
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
