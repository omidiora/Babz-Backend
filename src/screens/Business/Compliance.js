import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
// Entypo
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';

import {COLOR, IMAGE, WP} from '../../common/theme';
import {DotIndicator} from 'react-native-indicators';
import {DrawerActions} from '@react-navigation/native';

import {
  getUserAction,
  updateBvn,
  VerifyBusinnesAction,
} from '../../redux/account/action';
import FormCustomButton from '../../component/FormCustomButton';
import FormCustomInput from '../../component/FormCustomInput';
import CategorySelector from '../../component/CategorySelector';

import DocumentPicker, {types} from 'react-native-document-picker';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {BASE_URL} from '../../utils/ApiServices';
import {TimeNavigator} from '../../utils/TimeNavigator';
import AsyncStorage from '@react-native-community/async-storage';
import preferences from '../../utils/preferences';

import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';

const Compliance = props => {
  const {navigation} = props;
  const [details, setDetails] = useState({});
  const dispatch = useDispatch();
  const [complinance, setComplinance] = useState({});
  const [document, setDocument] = useState({});
  const [messsage, setMessage] = useState(null);
  console.log(document);

  const Message = useSelector(state => state.account?.msg3);

  const data = [
    {label: 'Private Limited Liability Company', value: 'PLLC'},
    {label: 'Corporate Affairs Commission', value: 'CAC'},
    {label: 'Registered Company', value: 'RC'},
    {label: 'Business Name', value: 'BN'},
    {label: 'Nigeria Export Processing Zones Authority', value: 'NEPZA'},
  ];
  const {PickerSelector, value} = CategorySelector(data);

  useEffect(() => {
    const fetchUser = async () => {
      let item = await dispatch(getUserAction());
      setComplinance(comply => ({
        ...comply,
        ...item?.merchant,
        ...item,
      }));
    };
    fetchUser();
  }, []);

  const {
    first_name,
    last_name,
    business_reg_document,
    business_reg_number,
    business_reg_type,
    bvn,
  } = complinance;

  const handleInputChange = (inputName, inputValue) => {
    setComplinance({
      ...complinance,
      [inputName]: inputValue,
    });
  };

  const pickFiles = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
    }).then(image => {
      setDocument(image);
    });
  };

  const onSubmit = async () => {
    if (
      value == null ||
      value == undefined ||
      bvn.length !== 11 ||
      Object.keys(document).length == 0 ||
      document?.size / 1000 > 999
    ) {
      Alert.alert('Kindly fill all the information');
    } else {
      dispatch(updateBvn({first_name, last_name, bvn}));
      let form_data = new FormData();
      let file = {
        uri: document.path,
        type: document.mime,
        name: document?.modificationDate,
      };
      form_data.append('type', value);
      form_data.append('number', business_reg_number);
      Object.keys(document).length == 0
        ? null
        : form_data.append('document', file);
      console.log(form_data, 'formdata');
      const token = await AsyncStorage.getItem(preferences.KEYS.ACCESS_TOKEN);
      fetch(`${BASE_URL}/business`, {
        method: 'post',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'multipart/form-data',
        },
        body: form_data,
      })
        .then(response => {
          response.json().then(data => console.log(data, 'data'));
          if (response.ok) {
            TimeNavigator(navigation);
            setMessage('Details was submitted successfully ');
          }
        })
        .catch(error => {
          console.log(error, 'error');
        });
    }
  };

  console.log(
    complinance?.merchant?.status == 'pending',
    'verified',
    'aaaaaaaaaaaa',
  );

  if (Object.keys(complinance).length == 0) {
    return <DotIndicator color={COLOR.primaryBlue} />;
  }

  return (
    <KeyboardAwareScrollView
      style={styles._mainContainer}
      resetScrollToCoords={{x: 0, y: 0}}
      contentContainerStyle={{paddingBottom: WP(30)}}>
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
          Compliance
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
          Submit the following compliance details
        </Text>
      </View>

      {/* Form_aform_data  */}

      <View style={styles.formContainer}>
        <View contentContainerStyle={{paddingBottom: WP(40)}}>
          {/* <FormCustomInput
            lablelText="Registration Type"
            value={complinance?.first_name}
            onChangeText={value => handleInputChange('first_name', value)}
            showIcon={complinance?.first_name.length > 3 ? true : false}
          /> */}

          <View style={{marginVertical: WP(5)}}>
            <Text
              style={{
                color: COLOR.blackColor,
                fontWeight: '600',

                left: WP(1),
                marginVertical: WP(3),
              }}>
              Registration Type
            </Text>
            {PickerSelector()}
          </View>

          <FormCustomInput
            lablelText="Registration No"
            keyboardType={'numeric'}
            value={complinance?.business_reg_number}
            onChangeText={value =>
              handleInputChange('business_reg_number', value)
            }
            showIcon={
              complinance?.business_reg_number?.length > 3 ? true : false
            }
          />

          <FormCustomInput
            lablelText="BVN / NIN"
            keyboardType={'numeric'}
            value={complinance?.bvn}
            onChangeText={value => handleInputChange('bvn', value)}
            showIcon={bvn?.length == 11 ? true : false}
          />

          {Object.keys(document).length == 0 ? (
            <>
              <Text style={{top: WP(3)}}>File size must be less than 1mb</Text>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => pickFiles()}>
                <Text style={{color: COLOR.primaryBrown}}>
                  {document?.name ? document?.name : 'Choose file'}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={{top: WP(-1)}}>File size must be less than 1mb</Text>
              <TouchableOpacity onPress={() => pickFiles()}>
                <Image
                  source={{uri: document.path}}
                  style={{width: WP(25), height: WP(30)}}
                />
              </TouchableOpacity>
            </>
          )}

          <View style={{top: WP(5)}}>
            <FormCustomButton
              backgroundColor={COLOR.mediumBlue}
              textColor={COLOR.whiteColor}
              btnTitle={'Submit'}
              onPress={() => onSubmit()}
              fontSize={WP(5)}
            />
          </View>

          <View style={{alignSelf: 'center', top: WP(7)}}>
            <Text style={{color: COLOR.primaryGreen}}>{messsage}</Text>
          </View>
        </View>


          {/* pending */}
        {complinance?.merchant?.status == 'pending' && (
          <>
            <Modal isVisible={true}>
              <View
                style={{
                  height: WP(30),
                  width: WP(70),
                  backgroundColor: COLOR.whiteColor,
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    color: COLOR.primaryBrown,
                    fontWeight: 'bold',
                    top: WP(6),
                    textAlign: 'center',
                  }}>
                  Your account is under review
                </Text>
              </View>
              <View style={{top: WP(-17), width: WP(30), alignSelf: 'center'}}>
                <FormCustomButton
                  backgroundColor={COLOR.mediumBlue}
                  textColor={COLOR.whiteColor}
                  btnTitle={'Continue'}
                  onPress={() =>navigation.goBack()}
                  fontSize={WP(5)}
                />
              </View>
            </Modal>
          </>
        )}

        {complinance?.merchant?.status == 'verified' && (
          <>
            <Modal isVisible={true}>
              <View
                style={{
                  height: WP(30),
                  width: WP(70),
                  backgroundColor: COLOR.whiteColor,
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    color: COLOR.primaryBrown,
                    fontWeight: 'bold',
                    top: WP(6),
                    textAlign: 'center',
                  }}>
                  Your account is verified
                </Text>
              </View>
              <View style={{top: WP(-17), width: WP(30), alignSelf: 'center'}}>
                <FormCustomButton
                  backgroundColor={COLOR.mediumBlue}
                  textColor={COLOR.whiteColor}
                  btnTitle={'Continue'}
                  onPress={() =>navigation.goBack()}
                  fontSize={WP(5)}
                />
              </View>
            </Modal>
          </>
        )}



      </View>
    </KeyboardAwareScrollView>
  );
};

export default Compliance;

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
  uploadButton: {
    borderWidth: 0.8,
    padding: WP(5),
    borderColor: COLOR.primaryBlue,
    borderRadius: WP(5),
    color: 'black',
    marginVertical: WP(5),
  },
});
