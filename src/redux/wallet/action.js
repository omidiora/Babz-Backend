import instance from '../../utils/ApiServices';
import {
  GET_ALL_WALLET_REPORT_FAILED,
  GET_ALL_WALLET_REPORT_LOADING,
  GET_ALL_WALLET_REPORT_SUCCESS,
} from '../types';
// import * as RootNavigation from '../../Navigations/RootNavigation';
import * as RootNavigation from '../../utils/RootNavigator';

export const getAllWalletAction = () => {
  return async dispatch => {
    dispatch({
      type: GET_ALL_WALLET_REPORT_LOADING,
    });
    try {
      const {data} = await instance.get('/wallet-report');
      dispatch({
        //
        type: GET_ALL_WALLET_REPORT_SUCCESS,
        payload: data.data,
      });
      return data.data;
    } catch (err) {
      console.log(err.response.data.message, 'error');
      // if (err.response.data.message =='Unauthorized Request.') {
      //   RootNavigation.navigate('Account');
      // }
      dispatch({
        error:err.response.data.message,
        type: GET_ALL_WALLET_REPORT_FAILED,
      });
    }
  };
};
