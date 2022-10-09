import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
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
import {getUserAction, updateUserAction} from '../../redux/account/action';
import FormButton from '../../component/FormButton';
import FormCustomButton from '../../component/FormCustomButton';
import FormCustomInput from '../../component/FormCustomInput';
import ProfileCustomInput from '../../component/ProfileCustomInput';

const EditProfile = props => {
  const {navigation} = props;
  const [details, setDetails] = useState({});
  const dispatch = useDispatch();
  const profile = useSelector(state => state.account);
  console.log(profile, 'Edit profile');
  const [person, setPerson] = useState({});

  const {first_name, last_name, phone} = person;

  useEffect(() => {
    const fetchUser = async () => {
      let item = await dispatch(getUserAction());
      setPerson(value => ({
        ...value,
        ...item,
      }));
    };
    fetchUser();
  }, []);

  const handleInputChange = (inputName, inputValue) => {
    setPerson({
      ...person,
      [inputName]: inputValue,
    });
  };

  const onSubmit = () => {
    if (
      person?.first_name.length > 3 &&
      person?.last_name.length > 3 &&
      person?.phone >= 4
    ) {
      dispatch(updateUserAction({first_name, last_name, phone}));
    } else {
      Alert.alert('Fill the form properly');
    }
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
          Edit profile
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
            lablelText="First Name"
            value={person?.first_name}
            onChangeText={value => handleInputChange('first_name', value)}
          />

          <ProfileCustomInput
            lablelText="last Name"
            value={person?.last_name}
            onChangeText={value => handleInputChange('last_name', value)}
          />

          {/* <ProfileCustomInput
            lablelText="Email"
            placeholder="email"
            value={person?.email}
            onChangeText={value => handleInputChange('phone', value)}
          /> */}
          <ProfileCustomInput
            lablelText="Phone Number"
            value={person?.phone}
            onChangeText={value => handleInputChange('phone', value)}
            keyboardType="numeric"
          />

          <View style={{alignSelf: 'center', marginVertical: WP(3)}}>
            <Text>{profile?.msg2}</Text>
          </View>

          <FormCustomButton
            backgroundColor={COLOR.mediumBlue}
            textColor={COLOR.whiteColor}
            btnTitle={
              profile?.loading ? (
                <ActivityIndicator size="small" color={COLOR.whiteColor} />
              ) : (
                'Update'
              )
            }
            onPress={() => onSubmit()}
            fontSize={WP(5)}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default EditProfile;

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
