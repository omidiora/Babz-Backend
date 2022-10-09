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
import {getUserAction, updateUserAction} from '../../redux/account/action';
import FormButton from '../../component/FormButton';
import FormCustomButton from '../../component/FormCustomButton';
import FormCustomInput from '../../component/FormCustomInput';

const BrandStore = props => {
  const {navigation} = props;
  const [details, setDetails] = useState({});
  const dispatch = useDispatch();
  const [person, setPerson] = useState({});

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
      person?.phone >= 11 &&
      person?.home_address > 5
    ) {
      dispatch(updateUserAction(person));
    } else {
      Alert.alert('Fill the form properly');
    }
  };
  if (Object.keys(person).length == 0) {
    return <DotIndicator color={COLOR.primaryBlue} />;
  }
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
          Brand your store
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
      <View style={styles.text1}>
        <Text style={{textAlign: 'center'}}>
          Setup your store in the marketplace
        </Text>
      </View>

      {/* Form  */}

      <View style={styles.formContainer}>
        <ScrollView contentContainerStyle={{paddingBottom: WP(40)}}>
          <FormCustomInput
            lablelText="Store Logo"
            value={person?.first_name}
            onChangeText={value => handleInputChange('first_name', value)}
            showIcon={person?.first_name.length > 3 ? true : false}
          />
          <FormCustomInput
            lablelText="Cover Image(optional)"
            value={person?.last_name}
            onChangeText={value => handleInputChange('last_name', value)}
            showIcon={person?.last_name.length > 3 ? true : false}
          />
          <FormCustomButton
            backgroundColor={COLOR.mediumBlue}
            textColor={COLOR.whiteColor}
            btnTitle={'Submit'}
            onPress={() => onSubmit()}
            fontSize={WP(5)}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default BrandStore;

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
