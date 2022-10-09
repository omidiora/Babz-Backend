import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getUserAction} from '../redux/account/action';
import {getAllProductCategoryAction} from '../redux/product/action';
import preferences from '../utils/preferences';

const ProductCategoryHoc = Component => {
  const WithStateComponent = () => {
    const dispatch = useDispatch();
    const [item, setItem] = useState({});

    const product_category = useSelector(state => state.product||[]);

    useEffect(() => {
      dispatch(getAllProductCategoryAction());
    }, [dispatch]);

    return <Component productsCategory={product_category} />;
  };
  return WithStateComponent;
};

export default ProductCategoryHoc;

// const AccountHoc = WrappedComponent => {

//   const [first, setfirst] = useState();
//   return props => <WrappedComponent {...props} />;
// };

// export default AccountHoc;
