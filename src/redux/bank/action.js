import instance from '../../utils/ApiServices';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {
  GET_ALL_BANK_FAILED,
  GET_ALL_BANK_LOADING,
  GET_ALL_BANK_SUCCESS,
  GET_BANK_USER_DETAILS_FAILED,
  GET_BANK_USER_DETAILS_LOADING,
  GET_BANK_USER_DETAILS_SUCCESS,
  UPDATE_BANK_FAILED,
  UPDATE_BANK_LOADING,
  UPDATE_BANK_SUCCESS,
} from '../types';
import {bank} from '../../utils/bank';
import {TimeNavigator} from '../../utils/TimeNavigator';

export const getAllBankAction = payload => {
  return async dispatch => {
    dispatch({type: GET_ALL_BANK_LOADING});
    try {
      const {data} = await instance.get('/soup');
      dispatch({
        type: GET_ALL_BANK_SUCCESS,
        bank: data,
      });

      return data.data;
    } catch (error) {
      console.log(error.response.data, 'error from update z Action');
      dispatch({
        type: GET_ALL_BANK_FAILED,
        error: error,
      });
    }
  };
};

export const getUserBankDetailsAction = () => {
  return async dispatch => {
    dispatch({type: GET_BANK_USER_DETAILS_LOADING});
    try {
      const {data} = await instance.get('/bank-details');
      dispatch(getAllBankAction());
      dispatch({
        type: GET_BANK_USER_DETAILS_SUCCESS,
        data: data,
        msg: 'Personal details was submitted successfully ',
      });
      console.log(data, 'successfully createBankAction');
      return data.data;
    } catch (error) {
      dispatch(getAllBankAction());
      dispatch({
        type: GET_BANK_USER_DETAILS_FAILED,
        error: error.response.data.message,
      });
    }
  };
};

export const createBankAction = payload => {
  return async dispatch => {
    dispatch({type: UPDATE_BANK_LOADING});
    try {
      const {data} = await instance.post('/bank-details', payload);
      dispatch({
        type: UPDATE_BANK_SUCCESS,
        data: data,
        msg: 'Personal details was submitted successfully ',
        success: true,
      });
      dispatch(getAllBankAction());
      dispatch(getUserBankDetailsAction());

      console.log(data, 'successfully createBankAction');
      return data.data;
    } catch (error) {
      dispatch(getAllBankAction());
      dispatch({
        type: UPDATE_BANK_FAILED,
        error: error.response.data.message,
      });
    }
  };
};

export const deleteUserBankDetailsAction = id => {
  return async dispatch => {
    dispatch({type: GET_BANK_USER_DETAILS_LOADING});
    try {
      const data = await instance.delete(
        `/food/${id}`,

        {headers: {'Content-Type': 'application/json'}},
      );

      dispatch(getAllBankAction());
      showMessage({
        message: 'Deleted successfully',
        type: 'success',
        position: 'top',
      });

      return data.data;
    } catch (error) {
      console.log(error, 'error  from deleteUserBankDetailsAction ');
      console.log(error.response, 'error  from deleteUserBankDetailsAction ');
      dispatch(getAllBankAction());
    }
  };
};

export const VeriyfUserBankDetailsAction = (id, navigation) => {
  return async dispatch => {
    dispatch({type: UPDATE_BANK_LOADING});
    try {
      const {data} = await instance.patch('/banks/verify', {
        bank_detail_id: id,
      });
      dispatch({
        type: UPDATE_BANK_SUCCESS,
        data: data,
        msg: 'Personal details was submitted successfully ',
        success: true,
      });
      dispatch(getAllBankAction());
      dispatch(getUserBankDetailsAction());
      TimeNavigator(navigation);

      console.log(data, 'successfully createBankAction');
      return data.data;
    } catch (error) {
      console.log(error);
      console.log(error.response, 'error from VeriyfUserBankDetailsAction ');
      dispatch(getAllBankAction());
      showMessage({
        message: 'Something went wrong',
        type: 'danger',
        position: 'top',
      });
    }
  };
};
