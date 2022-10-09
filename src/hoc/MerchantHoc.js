import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getAllMerchantsategories, getUserAction} from '../redux/account/action';
import preferences from '../utils/preferences';

const MerchantHoc = Component => {
  const WithStateComponent = () => {
    const dispatch = useDispatch();
    const [item, setItem] = useState({});
    useEffect(() => {
      const fetchUserData = async () => {
        let item = await dispatch(getAllMerchantsategories());
        setItem(item);
      };
      fetchUserData();
    }, [dispatch]);

    return <Component merchant_category={item} />;
  };
  return WithStateComponent;
};

export default MerchantHoc;

// const AccountHoc = WrappedComponent => {

//   const [first, setfirst] = useState();
//   return props => <WrappedComponent {...props} />;
// };

// export default AccountHoc;
