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
import {DotIndicator} from 'react-native-indicators';
// Entypo
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FormInput from '../../component/FormInput';
import {useDispatch, useSelector} from 'react-redux';

import {COLOR, WP} from '../../common/theme';
import AccountHoc from '../../hoc/AccountHoc';

import {DrawerActions} from '@react-navigation/native';

import {AccountHook} from '../../hooks/AccountHook';
import {useNavigation} from '@react-navigation/native';
import {
  getUserAction,
  updateBusinessAction,
  updateUserAction,
} from '../../redux/account/action';
import FormButton from '../../component/FormButton';
import FormCustomButton from '../../component/FormCustomButton';
import FormCustomInput from '../../component/FormCustomInput';
import CategorySelector from '../../component/CategorySelector';
import MerchantHoc from '../../hoc/MerchantHoc';
import {showMessage, hideMessage} from 'react-native-flash-message';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Validator from 'validatorjs';
const BussinessDetail = props => {
  const navigation = useNavigation();
  const {merchant_category} = props;

  const [details, setDetails] = useState({});
  const dispatch = useDispatch();
  const [business, setbusiness] = useState({});
  const [error, setError] = useState({});
  const businessSelector = useSelector(state => state.account);

  const merchant_category_data = () => {
    return merchant_category?.data?.map(item => {
      return {
        value: item?.id,
        label: item?.name,
        ...item,
      };
    });
  };

  let {PickerSelector, value} = CategorySelector(merchant_category_data());

  const data = {
    name: business?.business_name,
    location: business?.business_address,
    value: value,
    email: business?.business_email,
    website: business?.business_website,
  };
  const rules = {
    name: 'required|min:4',
    email: 'required|email',
    location: 'required|min:4',
    value: 'required',
   
  };
  console.log(value);

  useEffect(() => {
    const fetchUser = async () => {
      let item = await dispatch(getUserAction() || {});
      setbusiness(value => ({
        ...value,
        ...item?.merchant,
      }));
    };
    fetchUser();
  }, []);

  const handleInputChange = (inputName, inputValue) => {
    setbusiness({
      ...business,
      [inputName]: inputValue,
    });
  };

  const onSubmit = () => {
    let validator = new Validator(data, rules, {
      'required.location': 'The Business address field is required',
      'required.value': 'The business category field is required',
      'required.name': 'The business name field is required',
    
    });

    if (validator.fails()) {
      setError(validator.errors.all());
    } else {
      dispatch(
        updateBusinessAction(
          {
            business: {
              name: business?.business_name,
              email: business?.business_email,
              address: business?.business_address,
              category_id: value,
              website: business?.business_website,
            },
          },
          navigation,
        ),
      );
    }
    // if (
    //   business?.business_name?.length > 3 &&
    //   business?.business_address?.length > 3 &&
    //   business?.business_email?.length > 3 &&
    //   value !== null
    // ) {
    // dispatch(
    //   updateBusinessAction({
    //     name: business?.business_name,
    //     email: business?.business_email,
    //     address: business?.business_address,
    //     category_id: value,
    //   }),
    // );
    // } else {
    //   Alert.alert('Fill the form properly');
    // }
  };
  if (Object.keys(business).length == 0) {
    return <DotIndicator color={COLOR.primaryBlue} />;
  }

  return (
    <KeyboardAwareScrollView
      style={styles._mainContainer}
      resetScrollToCoords={{x: 0, y: 0}}
      contentContainerStyle={{paddingBottom: WP(20)}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          top: WP(2),
        }}>
        <TouchableOpacity
          style={{left: WP(3)}}
          onPress={() => navigation.navigate('HomeSetting')}>
          <Icon name="arrow-back" size={22} color={COLOR.primaryBrown} />
        </TouchableOpacity>
        <Text
          style={{fontWeight: 'bold', fontSize: 24, color: COLOR.primaryBrown}}>
          Business Profile
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
          Complete your business information
        </Text>
      </View>

      {/* Form  */}

      <View style={styles.formContainer}>
        <View contentContainerStyle={{paddingBottom: WP(40)}}>
          <FormCustomInput
            lablelText="Business Name"
            value={business?.business_name}
            onChangeText={value => handleInputChange('business_name', value)}
            showIcon={business?.business_name?.length > 3 ? true : false}
          />
          <FormCustomInput
            lablelText="Business Location"
            value={business?.business_address}
            onChangeText={value => handleInputChange('business_address', value)}
            showIcon={business?.business_address?.length > 3 ? true : false}
          />
          <FormCustomInput
            lablelText="Business Email"
            value={business?.business_email}
            onChangeText={value => handleInputChange('business_email', value)}
            
          />

          <View style={{marginVertical: WP(3)}}>
            <Text
              style={{
                paddingBottom: WP(2),
                fontWeight: '600',
                color: COLOR.blackColor,
                left: WP(1),
              }}>
              {'Business Category'}
            </Text>
            {PickerSelector()}
          </View>

          {/* <FormCustomInput
            lablelText="Business Catergory"
            value={business?.business_email}
            onChangeText={value => handleInputChange('business_email', value)}
            showIcon={business?.business_email?.length ? true : false}
          /> */}

          <FormInput
            lablelText="Website (If any)"
            value={business?.business_website}
            onChangeText={value => handleInputChange('business_website', value)}
            showIcon={business?.business_website > 5 ? true : false}
          />

          {businessSelector.msg ? (
            <View style={{alignSelf: 'center'}}>
              <Text
                style={{
                  color: COLOR.primaryGreen,
                  fontWeight: 'bold',
                  marginVertical: WP(3),
                }}>
                {businessSelector?.msg}
              </Text>
            </View>
          ) : (
            <View>
              {Object.keys(error).length > 0 && (
                <>
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorMsg}>{error?.email}</Text>
                    <Text style={styles.errorMsg}>{error?.location}</Text>
                    <Text style={styles.errorMsg}>{error?.value}</Text>
                    <Text style={styles.errorMsg}>{error?.website}</Text>
                  </View>
                </>
              )}
            </View>
          )}
          {/* Phone */}

          {/* {Object.keys(error).length > 0 && 
            <>
              <View style={styles.errorContainer}>
                <Text style={styles.errorMsg}>{error?.email}</Text>
                <Text style={styles.errorMsg}>{error?.location}</Text>
                <Text style={styles.errorMsg}>{error?.value}</Text>
                <Text style={styles.errorMsg}>{error?.website}</Text>
              </View>
            </>:
            <>
            <View>
              <Text>{businessSelector.msg}</Text>
            </View>
            </>
          )} */}
          {/*  ActivityIndicator */}

          <FormCustomButton
            backgroundColor={COLOR.mediumBlue}
            textColor={COLOR.whiteColor}
            btnTitle={
              businessSelector.business_loading ? (
                <ActivityIndicator size="small" color={COLOR.whiteColor} />
              ) : (
                'Submit'
              )
            }
            onPress={() => onSubmit()}
            fontSize={WP(5)}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default MerchantHoc(BussinessDetail);

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
  errorContainer: {
    alignSelf: 'center',
  },
  errorMsg: {
    color: 'red',
  },
});
