import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
// Entypo
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FormInput from '../../component/FormInput';
import {useDispatch, useSelector} from 'react-redux';

import {COLOR, WP} from '../../common/theme';
import AccountHoc from '../../hoc/AccountHoc';
import {DotIndicator} from 'react-native-indicators';
import {DrawerActions} from '@react-navigation/native';

import {AccountHook} from '../../hooks/AccountHook';
import {
  ChangePasswordAction,
  getUserAction,
  updateUserAction,
} from '../../redux/account/action';
import FormButton from '../../component/FormButton';
import FormCustomButton from '../../component/FormCustomButton';
import FormCustomInput from '../../component/FormCustomInput';
import ProfileCustomInput from '../../component/ProfileCustomInput';

const ChangePassword = props => {
  const {navigation} = props;
  const [details, setDetails] = useState({});
  const dispatch = useDispatch();
  const [password, setPassword] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  const userPasswordState= useSelector(state=>state.accoun?.password_changed_loading);
  console.log(userPasswordState, 'userPasswordState')

  const {current_password, new_password, confirm_password} = password;

  const handleInputChange = (inputName, inputValue) => {
    setPassword({
      ...password,
      [inputName]: inputValue,
    });
  };

  const onSubmit = () => {
    dispatch(
      ChangePasswordAction({
        old_password: current_password,
        password: new_password,
        confirm_password,
      }),
    );
  };

  return (
    <View style={styles._mainContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          top: WP(2),
        }}>
        <TouchableOpacity
          style={{left: WP(3)}}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={22} color={COLOR.primaryBrown} />
        </TouchableOpacity>
        <Text
          style={{fontWeight: 'bold', fontSize: 24, color: COLOR.primaryBrown}}>
          Update Password
        </Text>
        <TouchableOpacity
          style={{
            right: WP(3),
            backgroundColor: COLOR.lightBlue,
            padding: WP(2),
            borderRadius: WP(5),
          }}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Entypo
            name="dots-three-horizontal"
            size={22}
            color={COLOR.primaryBrown}
          />
        </TouchableOpacity>
      </View>
      {/*
       */}

      <View style={styles.formContainer}>
        <ScrollView contentContainerStyle={{paddingBottom: WP(40)}}>
          <ProfileCustomInput
            lablelText="Current Password"
            placeholder="Enter your current password"
            onChangeText={value => handleInputChange('current_password', value)}
          />

          <ProfileCustomInput
            lablelText="New Password"
            placeholder="Choose a new password"
            onChangeText={value => handleInputChange('new_password', value)}
          />
          <ProfileCustomInput
            lablelText="Confirm Password"
            placeholder="Confirm new password"
            onChangeText={value => handleInputChange('confirm_password', value)}
          />

          <FormCustomButton
            backgroundColor={COLOR.mediumBlue}
            textColor={COLOR.whiteColor}
            btnTitle={'Update'}
            onPress={() => onSubmit()}
            fontSize={WP(5)}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  _mainContainer: {
    flex: 1,
    backgroundColor: COLOR.whiteColor,
  },
  text1: {
    top: WP(10),
    color: COLOR.primaryBrown,
    paddingBottom: WP(5),
  },
  formContainer: {
    top: WP(15),
    width: WP('90%'),
    alignSelf: 'center',
  },
});
