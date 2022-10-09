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

import {COLOR, IMAGE, WP} from '../../common/theme';
import AccountHoc from '../../hoc/AccountHoc';
import {DotIndicator} from 'react-native-indicators';
import {DrawerActions} from '@react-navigation/native';
import {AccountHook} from '../../hooks/AccountHook';
import {getUserAction, updateUserAction} from '../../redux/account/action';
import FormButton from '../../component/FormButton';
import FormCustomButton from '../../component/FormCustomButton';
import FormCustomInput from '../../component/FormCustomInput';
import {
  createBankAction,
  deleteUserBankDetailsAction,
  getAllBankAction,
  getUserBankDetailsAction,
  VeriyfUserBankDetailsAction,
} from '../../redux/bank/action';
import Validator from 'validatorjs';
import CategorySelector from '../../component/CategorySelector';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import {CheckBox} from '@rneui/themed';
import Modal from 'react-native-modal';
import {Image} from 'react-native';
import {TimeNavigator} from '../../utils/TimeNavigator';
import AsyncStorage from '@react-native-community/async-storage';
import preferences from '../../utils/preferences';
import {BASE_URL} from '../../utils/ApiServices';
import {showMessage, hideMessage} from 'react-native-flash-message';

const BankDetail = props => {
  const {navigation} = props;
  const [details, setDetails] = useState({});
  const dispatch = useDispatch();
  const [errors, setErrors] = useState();
  const errorBackend = useSelector(state => state?.bank?.error);
  // const loading = useSelector(state => state?.bank?.loading);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const banks = useSelector(state => state?.bank.bank?.data || []);
  const userBankDetail = useSelector(
    state => state?.bank?.bank_user_details?.data?.data || [],
  );
  const [checkDefault, setCheckDefault] = useState(0);

  const userDB = [
    {
      id: 2,
      user_id: 2,
      bank_id: 2,
      bank_name: 'Diamond Bank',
      bank_account_name: 'Samuel Smith',
      bank_account_number: '012921112',
      status: 'pending',
      created_at: '2020-01-13 16:54:18',
    },
  ];
  const listOfBankDetails = () => {
    return banks.map(item => {
      return {
        value: item?.id,
        label: item?.name,
        ...item,
      };
    });
  };

  const {PickerSelector, value} = CategorySelector(listOfBankDetails());

  useEffect(() => {
    dispatch(getAllBankAction());
  }, []);

  const initialState = {
    bank_account_number: '',
    bank_account_name: '',
    bank_id: '',
  };
  const [bankDetails, setBankDetails] = useState(initialState);

  const validationSchema = {
    bank_account_number: 'required|min:6',
    bank_account_name: 'required|min:6',
    bank_id: 'required',

    // password_confirmation: 'required',
  };

  // const onSubmit = () => {
  //   if (
  //     bankDetails?.bank_id?.length == 0 ||
  //     bankDetails?.bank_account_number.length !== 10
  //   ) {
  //     Alert.alert('Kindly complete the missing information');
  //     return;
  //   }
  //   dispatch(
  //     createBankAction({
  //       bank_id: bankDetails?.bank_id,
  //       bank_account_number: bankDetails.bank_account_number,
  //       default: checkDefault,
  //     }),
  //   );
  // };

  const onSubmit = async () => {
    setLoading(true);
    let form_data = new FormData();
    form_data.append('bank_id', bankDetails?.bank_id);
    form_data.append('bank_account_number', bankDetails?.bank_account_number);
    form_data.append('default', checkDefault);
    const token = await AsyncStorage.getItem(preferences.KEYS.ACCESS_TOKEN);
    fetch(`${BASE_URL}/bank-details`, {
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      },
      body: form_data,
    })
      .then(response => {
        setLoading(false);
        response.json().then(data => {
          console.log(data.error);
          for (const key in data.error) {
            if (data.error.hasOwnProperty(key)) {
              const element = data.error[key];
              console.log(element, 'elelememnt');
              setErrors(...element);
            }
          }
        });
        console.log(response.status);
        if (response.ok) {
          setSuccess(true);
          dispatch(getUserBankDetailsAction());
          // TimeNavigator(navigation);
          // setMessage('Details was submitted successfully ');
        }

        if (response.status === 422) {
          showMessage({
            message:
              'Either something went wrong or you have registered this bank details',
            type: 'danger',
            position: 'top',
          });
        }
      })
      .catch(error => {
        setLoading(false);
      });
  };

  const DeleteUserDetails = id => {
    dispatch(deleteUserBankDetailsAction(id));
    setSuccess(false);
    setBankDetails(initialState);
  };
  const ConformUserDetails = id => {
    dispatch(VeriyfUserBankDetailsAction(id, navigation));
    setSuccess(false);
    setBankDetails(initialState);
  };

  const handleInputChange = (inputName, inputValue) => {
    setBankDetails({
      ...bankDetails,
      [inputName]: inputValue,
    });
  };

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
          Add Bank Details
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
          Add your bank account to recieve {'\n'} payments
        </Text>
      </View>

      {/* Form  */}

      <View style={styles.formContainer}>
        <ScrollView contentContainerStyle={{paddingBottom: WP(40)}}>
          <Text
            style={{
              color: COLOR.blackColor,
              top: WP(5),
            }}>
            Banks
          </Text>
          <View
            style={{
              borderWidth: 1,
              padding: WP(2),
              borderColor: COLOR.primaryBlue,
              borderRadius: WP(5),
              color: 'black',
              marginVertical: WP(7),
              height: WP(16),
            }}>
            <RNPickerSelect
             style = {
              {
                inputIOS: {color: COLOR.blackColor},
                inputAndroid: {color: COLOR.blackColor},
                placeholder: {color: COLOR.blackColor},
              }
            }
              onValueChange={value => handleInputChange('bank_id', value)}
              items={listOfBankDetails()}
              placeholder="Select"
            />
          </View>
          {/* <FormCustomInput
            lablelText="Bank"
            onChangeText={value => handleInputChange('bank', value)}
            // showIcon={person?.first_name.length > 3 ? true : false}
          /> */}
          <FormCustomInput
            lablelText="Account Number"
            onChangeText={value =>
              handleInputChange('bank_account_number', value)
            }
            keyboardType={'numeric'}
            showIcon={
              bankDetails?.bank_account_number.length == 10 ? true : false
            }
          />

          <CheckBox
            title="Set has default bank "
            checked={checkDefault}
            onPress={() => setCheckDefault(prev => (prev === 0 ? 1 : 0))}
          />
          <View>
            <Text style={{color: COLOR.redColor, marginVertical: WP(3)}}>
              {errorBackend}
            </Text>
          </View>

          <FormCustomButton
            backgroundColor={COLOR.mediumBlue}
            textColor={COLOR.whiteColor}
            btnTitle={
              loading ? (
                <ActivityIndicator size="small" color={COLOR.whiteColor} />
              ) : (
                'Submit'
              )
            }
            onPress={() => onSubmit()}
            fontSize={WP(5)}
          />
        </ScrollView>
      </View>

      {/* Modal */}

      <View>
        <Modal isVisible={success}>
          <View style={styles._modalContainer}>
            <View style={styles._modal}>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontFamily: 'Montserrat-Black',
                  color: COLOR.blackColor,
                  fontSize: WP(5),
                  marginVertical: WP(3),
                }}>
                {'Confirm account details'}
              </Text>

              {userBankDetail.map(details => (
                <View key={details?.id}>
                  <View
                    style={{
                      flexDirection: 'row',
                      // justifyContent: 'space-between',
                      justifyContent: 'space-evenly',
                    }}>
                    <View style={{marginRight: WP(10)}}>
                      <Text style={styles.modalTextContainer}>
                        Account Name
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.modalTextContainer}>
                        {details?.bank_account_name}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      // justifyContent: 'space-between',
                      justifyContent: 'space-evenly',
                    }}>
                    <View style={{marginRight: WP(10)}}>
                      <Text style={styles.modalTextContainer}>
                        Account Number
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.modalTextContainer}>
                        {details?.bank_account_number}
                      </Text>
                    </View>
                  </View>
                  {/* Action Btn */}

                  <View
                    style={{
                      flexDirection: 'row',
                      // justifyContent: 'space-between',
                      justifyContent: 'space-evenly',
                    }}>
                    <View style={{marginRight: WP(10)}}>
                      <Text style={styles.modalTextContainer}>
                        <FormCustomButton
                          btnTitle="Delete"
                          borderWidth={WP(0.1)}
                          borderColor={COLOR.primaryBrown}
                          textColor={COLOR.blackColor}
                          onPress={() => DeleteUserDetails(details?.id)}
                        />
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.modalTextContainer}>
                        <FormCustomButton
                          btnTitle="Confirm"
                          borderWidth={WP(0.1)}
                          borderColor={COLOR.primaryBrown}
                          textColor={COLOR.whiteColor}
                          backgroundColor={COLOR.mediumBlue}
                          onPress={() => ConformUserDetails(details?.id)}
                        />
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default BankDetail;

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
  _modalContainer: {
    height: WP(88),
    width: WP(95),
    backgroundColor: COLOR.whiteColor,
    alignSelf: 'center',
    borderRadius: WP(4),
  },
  _modal: {
    // alignSelf: 'center',
    top: WP(8),
  },
  modalTextContainer: {
    color: COLOR.primaryBrown,
    fontWeight: '400',
    fontFamily: 'Gilroy-Light',
    marginVertical: WP(5),
  },
});
