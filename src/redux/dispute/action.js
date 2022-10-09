import axios from 'axios';
import {API_URL} from '../../utils/API';
import instance from '../../utils/ApiServices';
import {_showErrorMessage} from '../../utils/Message';
import preferences from '../../utils/preferences';
import {
  GET_ALL_DISPUTE_FAILED,
  GET_ALL_DISPUTE_LOADING,
  GET_ALL_DISPUTE_SUCCESS,
  GET_DISPUTE_ID_FAILED,
  GET_DISPUTE_ID_LOADING,
  GET_DISPUTE_ID_SUCCESS,
} from '../types';

export const getAllDisputes = () => {
  return async dispatch => {
    dispatch({
      type: GET_ALL_DISPUTE_LOADING,
    });
    try {
      const {data} = await instance.get('/disputes?fields=products');
      dispatch({
        type: GET_ALL_DISPUTE_SUCCESS,
        payload: data.data,
      });
      return data.data;
    } catch (err) {
      console.log(err, 'error');
      dispatch({
        type: GET_ALL_DISPUTE_FAILED,
      });
    }
  };
};


export const getAllDisputesById = (id) => {
  return async dispatch => {
    dispatch({
      type: GET_DISPUTE_ID_LOADING,
    });
    try {
      const {data} = await instance.get(`/disputes/${id}`);
      dispatch({
        type: GET_DISPUTE_ID_SUCCESS,
        payload: data.data,
      });
      return data.data;
    } catch (err) {
      console.log(err.response.data, 'error');
      dispatch({
        type: GET_DISPUTE_ID_FAILED,
      });
    }
  };
};
