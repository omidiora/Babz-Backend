import instance from '../../utils/ApiServices';
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
  GET_SINGLE_PRODUCT_FAILED,
  GET_SINGLE_PRODUCT_LOADING,
  GET_SINGLE_PRODUCT_SUCCESS,
  MAKE_FEATURED_PRODUCT_FAILED,
  MAKE_FEATURED_PRODUCT_LOADING,
  MAKE_FEATURED_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_FAILED,
  SEARCH_PRODUCT_LOADING,
  SEARCH_PRODUCT_SUCCESS,
  SET_PAYMENT_OPTION_FAILED,
  SET_PAYMENT_OPTION_LOADING,
  SET_PAYMENT_OPTION_SUCCESS,
} from '../types';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {COLOR} from '../../common/theme';

export const getAllProductCategoryAction = () => {
  return async dispatch => {
    dispatch({
      type: GET_ALL_PRODUCT_CATEGORY_LOADING,
    });
    try {
      const {data} = await instance.get('/products/categories');
      dispatch({
        type: GET_ALL_PRODUCT_CATEGORY_SUCCESS,
        payload: data.data,
      });
      return data.data;
    } catch (err) {
      console.log(err, 'error');
      dispatch({
        type: GET_ALL_PRODUCT_CATEGORY_FAILED,
      });
    }
  };
};

export const getAllProductAction = () => {
  return async dispatch => {
    dispatch({
      type: GET_ALL_PRODUCT_LOADING,
    });
    try {
      const {data} = await instance.get('/products');
      dispatch({
        type: GET_ALL_PRODUCT_SUCCESS,
        payload: data.data,
      });
      return data.data;
    } catch (err) {
      console.log(err, 'error');
      dispatch({
        type: GET_ALL_PRODUCT_FAILED,
      });
    }
  };
};

export const getProductByIdAction = id => {
  return async dispatch => {
    dispatch({
      type: GET_ALL_PRODUCT_LOADING,
    });
    try {
      const {data} = await instance.get(`/products/${id}`);
      dispatch({
        type: GET_ALL_PRODUCT_SUCCESS,
        payload: data.data,
      });
      return data.data;
    } catch (err) {
      console.log(err, 'error');
      dispatch({
        type: GET_ALL_PRODUCT_FAILED,
      });
    }
  };
};

export const getAllProductActionByPagination = page => {
  return async dispatch => {
    dispatch({
      type: GET_ALL_PRODUCT_BY_PAGINATION_LOADING,
    });
    try {
      const {data} = await instance.get(`/products?page=${page}`);
      dispatch({
        type: GET_ALL_PRODUCT_BY_PAGINATION_SUCCESS,
        payload: data.data,
      });
      // dispatch(getAllProductAction());
      return data.data;
    } catch (err) {
      console.log(err.response, 'error');
      dispatch({
        type: GET_ALL_PRODUCT_BY_PAGINATION_FAILED,
      });
    }
  };
};

export const AddProductAction = value => {
  console.log(value);
  return async dispatch => {
    dispatch({
      type: CREATE_PRODUCT_LOADING,
    });
    try {
      const {data} = await instance.post('/products', value, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch({
        type: CREATE_PRODUCT_SUCCESS,
        payload: data.data,
      });
      console.log(data, 'data');
      return data.data;
    } catch (err) {
      console.log(err.response.data, 'error from AddProductAction');
      dispatch({
        type: CREATE_PRODUCT_FAILED,
      });
    }
  };
};

export const SearchProductAction = item => {
  // https://api.myodiopay.com/v1/products/search?keyword=mac&product=true
  return async dispatch => {
    dispatch({
      type: SEARCH_PRODUCT_LOADING,
    });
    try {
      const {data} = await instance.post(
        `/products/search?keyword=${item}&product=true`,
      );
      dispatch(getAllProductAction()),
        dispatch({
          type: SEARCH_PRODUCT_SUCCESS,
          payload: data.data,
        });
      console.log(data, 'Search Product');
      return data.data;
    } catch (err) {
      console.log(err.response.data, 'error from AddProductAction');
      dispatch({
        type: SEARCH_PRODUCT_FAILED,
      });
    }
  };
};

export const getSingleProductAction = () => {
  return async dispatch => {
    dispatch({
      type: GET_SINGLE_PRODUCT_LOADING,
    });
    try {
      const {data} = await instance.get('/products');
      dispatch({
        type: GET_SINGLE_PRODUCT_SUCCESS,
        payload: data.data,
      });
      return data.data;
    } catch (err) {
      console.log(err, 'error');
      dispatch({
        type: GET_SINGLE_PRODUCT_FAILED,
      });
    }
  };
};

export const MakeFeaturedProduct = item => {
  console.log(item, 'item');
  return async dispatch => {
    dispatch({
      type: MAKE_FEATURED_PRODUCT_LOADING,
    });
    try {
      const {data} = await instance.post('/products/add-to-featured', item);
      dispatch(getAllProductAction());

      return data.data;
    } catch (err) {
      console.log(err.response, 'ressssss');
      dispatch({
        type: MAKE_FEATURED_PRODUCT_FAILED,
      });
    }
  };
};

export const DeleteProductAction = (id,page) => {
  return async dispatch => {
    dispatch({
      type: MAKE_FEATURED_PRODUCT_LOADING,
    });
    try {
      const {data} = await instance.delete(`/products/deleteProduct/${id}`);
      dispatch(getAllProductActionByPagination(page));
      showMessage({
        message: 'Deleted the product successfully',
        backgroundColor: COLOR.deepBlue,
        color: COLOR.whiteColor,
        position:'top'
      });
      console.log(data)
      return data.data;
    } catch (err) {
      console.log(err.response, 'ressssss');
      dispatch({
        type: MAKE_FEATURED_PRODUCT_FAILED,
      });
    }
  };
};



export const DeactivateProductAction = (id,page) => {
  return async dispatch => {
    dispatch({
      type: MAKE_FEATURED_PRODUCT_LOADING,
    });
    try {
      const {data} = await instance.delete(`/products/deactivateProduct/${id}`);
      dispatch(getAllProductActionByPagination(page));
      showMessage({
        message: 'Product deactivated  successfully',
        backgroundColor: COLOR.deepBlue,
        color: COLOR.whiteColor,
        position:'top'
      });
      console.log(data)
      return data.data;
    } catch (err) {
      console.log(err.response, 'ressssss');
      dispatch({
        type: MAKE_FEATURED_PRODUCT_FAILED,
      });
    }
  };
};


export const getPaymentOption = () => {
  return async dispatch => {
    dispatch({
      type: GET_PAYMENT_OPTION_LOADING,
    });
    try {
      const {data} = await instance.get('/payment_options');
      console.log(data, 'data');
      dispatch({
        type: GET_PAYMENT_OPTION_SUCCESS,
        payload: data.data,
      });
      return data.data;
    } catch (err) {
      console.log(err, 'error');
      dispatch({
        type: GET_PAYMENT_OPTION_FAILED,
      });
    }
  };
};

export const setPaymentOption = item => {
  return async dispatch => {
    dispatch({
      type: SET_PAYMENT_OPTION_LOADING,
    });
    try {
      const {data} = await instance.patch('/products_payment_options', item);
      console.log(data, 'data');
      dispatch({
        type: SET_PAYMENT_OPTION_SUCCESS,
        payload: data.data,
      });
      return data.data;
    } catch (err) {
      console.log(err.response.data, 'error');
      dispatch({
        type: SET_PAYMENT_OPTION_FAILED,
      });
    }
  };
};
