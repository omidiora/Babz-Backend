import instance from '../../utils/ApiServices';
import {
  GET_ALL_PAYMENT_FAILED,
  GET_ALL_PAYMENT_LOADING,
  GET_ALL_PAYMENT_SUCCESS,
  GET_ALL_TRANSACTION_FAILED,
  GET_ALL_TRANSACTION_LOADING,
  GET_ALL_TRANSACTION_SUCCESS,
  GET_ALL_WITHDRAW_FAILED,
  GET_ALL_WITHDRAW_LOADING,
  GET_ALL_WITHDRAW_SUCCESS,
  MAKE_REQEUST_FAILED,
  MAKE_REQEUST_LOADING,
  MAKE_REQEUST_SUCCESS,
  MAKE_WITHDRAW_FAILED,
  MAKE_WITHDRAW_LOADING,
  MAKE_WITHDRAW_SUCCESS,
} from '../types';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {withs} from '../../../withs';

export const getAllTransactionAction = () => {
  return async dispatch => {
    dispatch({
      type: GET_ALL_TRANSACTION_LOADING,
    });
    try {
      const {data} = await instance.get('/food');

      console.log(data, 'adlndknknksnknskn');
      dispatch({
        //
        type: GET_ALL_TRANSACTION_SUCCESS,
        payload: data,
      });
      return data.data;
    } catch (err) {
      console.log(err.response.data, 'error');
      dispatch({
        type: GET_ALL_TRANSACTION_FAILED,
      });
    }
  };
};

// https://api.myodiopay.com/v1/transactions?page=2
export const getAllTransactionByPaginationAction = number => {
  return async dispatch => {
    dispatch({
      type: GET_ALL_TRANSACTION_LOADING,
    });
    try {
      const {data} = await instance.get(`/specific_food`);
      console.log(data, 'aldmadmkmkdm');
      dispatch({
        //
        type: GET_ALL_TRANSACTION_SUCCESS,
        payload: data,
      });
      return data;
    } catch (err) {
      console.log(err.response.data, 'error');
      dispatch({
        type: GET_ALL_TRANSACTION_FAILED,
      });
    }
  };
};

export const getAllWithDrawerAction = () => {
  return async dispatch => {
    dispatch({
      type: GET_ALL_WITHDRAW_LOADING,
    });
    try {
      const {data} = await instance.get('/withdrawals');
      dispatch({
        //
        type: GET_ALL_WITHDRAW_SUCCESS,
        payload: data,
      });
      return data.data;
    } catch (err) {
      console.log(err.response.data, 'error');
      dispatch({
        type: GET_ALL_WITHDRAW_FAILED,
      });
    }
  };
};

export const getAllWithPaymentAction = () => {
  return async dispatch => {
    dispatch({
      type: GET_ALL_PAYMENT_LOADING,
    });
    try {
      const {data} = await instance.get('/payment/requests');
      dispatch({
        //
        type: GET_ALL_PAYMENT_SUCCESS,
        payload: data.data,
      });
      return data.data;
    } catch (err) {
      console.log(err.response.data, 'error');
      dispatch({
        type: GET_ALL_PAYMENT_FAILED,
      });
    }
  };
};

export const MakeWithDrawalRequestAction = details => {
  return async dispatch => {
    dispatch({
      type: MAKE_WITHDRAW_LOADING,
    });
    try {
      const {data} = await instance.post('/withdraw', details);
      dispatch({
        //
        type: MAKE_WITHDRAW_FAILED,
        payload: data.data,
      });
      console.log(data, 'MakeWithDrawalRequestAction');
      return data.data;
    } catch (err) {
      showMessage({
        message: 'Something went wrong',
        type: 'danger',
      });
      console.log(err.response.data, 'error');

      dispatch({
        type: MAKE_WITHDRAW_SUCCESS,
        error: err.response.data,
      });
    }
  };
};

export const MakePaymentRequest = details => {
  console.log(details, 'payload');
  return async dispatch => {
    dispatch({
      type: MAKE_REQEUST_LOADING,
    });

    try {
      const {data} = await instance.post('/request', details);
      dispatch({
        // MAKE_WITHDRAW_SUCCESS
        //
        type: MAKE_REQEUST_SUCCESS,
        payload: data.data,
        success_msg: true,
      });

      console.log(data, 'suucessfuly');
      return data.data;
    } catch (err) {
      console.log(err.response.data, 'error');

      dispatch({
        type: MAKE_REQEUST_FAILED,
        error: err.response.data,
      });
    }
  };
};
