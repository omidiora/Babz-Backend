import instance from '../../utils/ApiServices';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {
  CREATE_STORE_LOADING,
  CREATE_STORE_FAILED,
  CREATE_STORE_SUCCESS,
} from '../types';

export const CreateStoreAction = (payload, navigation) => {
  return async dispatch => {
    dispatch({type: CREATE_STORE_LOADING});
    try {
      const {data} = await instance.post('/upload', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          charset: 'utf-8',
        },
      });
      dispatch({
        type: CREATE_STORE_SUCCESS,
        data: data,
        msg: 'Store was successfully created',
      });
      // ./.
      showMessage({
        message: 'Store was successfully created',
        position: 'top',
        type: 'success',
        backgroundColor: '#0062FF',
      });
      navigation.goBack();

      return data.data;
    } catch (error) {
      console.log(error.response.data.error, 'error from update user Action');

      const err = () => {
        showMessage({
          message: 'Something went wrong',
          position: 'top',
          type: 'danger',
        });
        for (const key in error.response.data.error) {
          if (error.response.data.error.hasOwnProperty(key)) {
            const element = error.response.data.error[key];
            return element;
          }
        }
      };
      console.log(err());

      console.log('Error', error.message, 'meeeeeeeeeag');
      dispatch({
        type: CREATE_STORE_FAILED,
        error: error,
      });
    }
  };
};
