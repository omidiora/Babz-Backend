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
import preferences from '../utils/preferences';

const AccountHoc = Component => {
  const WithStateComponent = () => {
    const dispatch = useDispatch();
    const [item, setItem] = useState({});

    const user = useSelector(state => state.account);

    useEffect(() => {
      const fetchUserData = async () => {
        let item = await dispatch(getUserAction());
        setItem(item);
      };
      fetchUserData();
    }, [dispatch] );

    return <Component user={item} />;
  };
  return WithStateComponent;
};

export default AccountHoc;

// const AccountHoc = WrappedComponent => {

//   const [first, setfirst] = useState();
//   return props => <WrappedComponent {...props} />;
// };

// export default AccountHoc;
