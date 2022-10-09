import instance from '../../utils/ApiServices';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {
  GET_USER_SUCCESS,
  UPDATE_BUSINESS_LOADING,
  UPDATE_USER_FAILED,
  UPDATE_USER_LOADING,
  UPDATE_USER_SUCCESS,
  UPDATE_BUSINESS_SUCCESS,
  GET_USER_LOADING,
  CHANGE_PASSWORD_LOADING,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
  RESET_PASSWORD_LOADING,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
} from '../types';
import {TimeNavigator} from '../../utils/TimeNavigator';
import * as RootNavigation from '../../utils/RootNavigator';

// export const getUserAction = () => {
//   return async dispatch => {
//     dispatch({type: GET_USER_LOADING});
//     try {
//       const data = await instance.get('/get-user');
//       return data;
//     } catch (error) {
//       dispatch({
//         type: GET_USER_FAILED,
//         error: error,
//       });
//     }
//   };
// };

export const getUserAction = navigation => {
  return async dispatch => {
    dispatch({type: GET_USER_LOADING});
    try {
      const {data} = await instance.get('/get-user');
      dispatch({
        type: GET_USER_SUCCESS,
        data: data,
      });

      return data.data;
    } catch (err) {
      console.log(err.response.status);
      
      
    }
  };
};

export const updateUserAction = (payload, navigation) => {
  console.log(payload, 'payloadddd');
  return async dispatch => {
    dispatch({type: UPDATE_USER_LOADING});
    try {
      const {data} = await instance.patch('/update-user-info', payload);
      dispatch({
        type: UPDATE_USER_SUCCESS,
        data: data,
        msg: 'Personal details was submitted successfully ',
        msg2: 'Profile was updated successfully',
        msg3: 'Details was submitted successfully ',
      });
      TimeNavigator(navigation);

      return data.data;
    } catch (error) {
      console.log(error.response, 'error from update user Action');
      dispatch({
        type: UPDATE_USER_FAILED,
        error: error,
      });
    }
  };
};

export const updateBvn = payload => {
  console.log(payload, 'payloadddd');
  return async dispatch => {
    try {
      const {data} = await instance.patch('/update-user-info', payload, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      dispatch({
        type: UPDATE_USER_SUCCESS,
        data: data,
        msg: 'Personal details was submitted successfully ',
        msg2: 'Profile was updated successfully',
        msg3: 'Details was submitted successfully ',
      });
      console.log(data, 'success information');

      return data.data;
    } catch (error) {
      console.log(error.response, 'error from update user Action');
      dispatch({
        type: UPDATE_USER_FAILED,
        error: error,
      });
    }
    dispatch({type: UPDATE_USER_LOADING});
  };
};

export const VerifyBusinnesAction = details => {
  console.log(details, 'details');
  return async dispatch => {
    try {
      const {data} = await instance.post(
        '/business',
        {details},
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
        },
      );
      console.log(data, 'VerifyBusinnesAction');
      return data.data;
    } catch (error) {
      console.log(error.response.data, 'error VerifyBusinnesAction');
      dispatch({
        type: UPDATE_USER_FAILED,
        error: error,
      });
    }
  };
};

export const updateBusinessAction = (item, navigation) => {
  return async dispatch => {
    dispatch({
      type: UPDATE_BUSINESS_LOADING,
    });
    try {
      const {data} = await instance.post('/update-merchant-account', item, {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      });

      dispatch({
        type: UPDATE_BUSINESS_SUCCESS,
        data: data,
        msg: 'Profile was successfully created',
      });
      console.log(data, 'data');
      TimeNavigator(navigation);
      return data.data;
    } catch (err) {
      console.log(err.response, 'error from updateBusinessAction');
      dispatch({
        type: UPDATE_BUSINESS_FAILED,
      });
      showMessage({
        message: 'An error occur. Please try again later',
        type: 'danger',
        position: 'top',
      });
    }
  };
};

export const updateComplinaneAction = payload => {
  return async dispatch => {
    dispatch({type: UPDATE_USER_LOADING});
    try {
      const {data} = await instance.put('/update-user', payload);
      dispatch({
        type: UPDATE_USER_SUCCESS,
        data: 'Personal details was submitted successfully ',
      });
    } catch (error) {
      console.log(error.response.data, 'error from update user Action');
      dispatch({
        type: UPDATE_USER_FAILED,
        error: error,
      });
    }
  };
};

export const getAllMerchantsategories = () => {
  return async dispatch => {
    try {
      const {data} = await instance.get('/merchants/categories');
      return data.data;
    } catch (err) {
      console.log(err.response.data, 'getAllMerchantsategories');
    }
  };
};

export const ChangePasswordAction = payload => {
  return async dispatch => {
    dispatch({type: CHANGE_PASSWORD_LOADING});
    try {
      const {data} = await instance.patch('/change_password', payload, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      dispatch({
        type: CHANGE_PASSWORD_SUCCESS,
        data: data,
        msg: 'Password was updated successfully',
      });
      console.log(data, 'Password Changed succesfuly');
      return data.data;
    } catch (error) {
      console.log(error.response, 'error from ChangePasswordAction');
      dispatch({
        type: CHANGE_PASSWORD_FAILED,
        error: error,
      });
    }
  };
};

export const ForgotPasswordAction = (email, navigation) => {
  return async dispatch => {
    dispatch({type: RESET_PASSWORD_LOADING});
    try {
      const {data} = await instance.post(
        '/reset_password/initiate',
        {email},
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        data: data,
        msg: 'Kindly check your email for a link to reset password ',
      });
      navigation.navigate('Login');
      return data.data;
    } catch (error) {
      console.log(error.response, 'error from ForgotPasswordAction');
      dispatch({
        type: RESET_PASSWORD_FAILED,
        error: error,
      });
    }
  };
};
