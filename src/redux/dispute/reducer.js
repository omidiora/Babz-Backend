import {
  GET_ALL_DISPUTE_FAILED,
  GET_ALL_DISPUTE_LOADING,
  GET_ALL_DISPUTE_SUCCESS,
  GET_DISPUTE_ID_FAILED,
  GET_DISPUTE_ID_LOADING,
  GET_DISPUTE_ID_SUCCESS,
} from '../types';

const initialState = {};
export function dispute_Reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_DISPUTE_LOADING:
      return {
        dispute_loading: true,
      };
    case GET_ALL_DISPUTE_SUCCESS:
      return {
        ...state,
        dispute_loading: false,
        dispute: action.payload,
      };
    case GET_ALL_DISPUTE_FAILED:
      return {
        ...state,
        dispute_loading: false,
        error: action.error,
      };

    case GET_DISPUTE_ID_LOADING:
      return {
        dispute_loading_by_id: true,
      };
    case GET_DISPUTE_ID_SUCCESS:
      return {
        ...state,
        dispute_loading_by_id: false,
        dispute_details_id: action.payload,
      };
    case GET_DISPUTE_ID_FAILED:
      return {
        ...state,
        dispute_loading_by_id: false,
        error: action.error,
      };

    default:
      return state;
  }
}
