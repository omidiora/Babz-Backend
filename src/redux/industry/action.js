import instance from '../../utils/ApiServices';
import {
  GET_ALL_INDUSTRY_FAILED,
  GET_ALL_INDUSTRY_LOADING,
  GET_ALL_INDUSTRY_SUCCESS,
} from '../types';

export const getAllIndustryAction = () => {
  return async dispatch => {
    dispatch({
      type: GET_ALL_INDUSTRY_LOADING,
    });
    try {
      const {data} = await instance.get('/specific_food');
      console.log(data, 'data');
      dispatch({
        //
        type: GET_ALL_INDUSTRY_SUCCESS,
        payload: data,
      });
      return data.data;
    } catch (err) {
      console.log(err, 'error');
      dispatch({
        type: GET_ALL_INDUSTRY_FAILED,
      });
    }
  };
};
