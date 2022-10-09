import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  LogBox,
  KeyboardAvoidingView,
} from 'react-native';
// Entypo
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FormInput from '../../component/FormInput';
import {useDispatch, useSelector} from 'react-redux';

import {COLOR, HP, WP} from '../../common/theme';
import AccountHoc from '../../hoc/AccountHoc';
import {DotIndicator} from 'react-native-indicators';
import {DrawerActions} from '@react-navigation/native';

import {AccountHook} from '../../hooks/AccountHook';
import {getUserAction, updateUserAction} from '../../redux/account/action';
import FormButton from '../../component/FormButton';
import FormCustomButton from '../../component/FormCustomButton';
import FormCustomInput from '../../component/FormCustomInput';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const PersonalDetail = props => {
  const {navigation} = props;
  const [details, setDetails] = useState({});
  const dispatch = useDispatch();
  const [person, setPerson] = useState({});
  const Message = useSelector(state => state.account?.msg3);
  const loading = useSelector(state => state.account?.loading);
  const [locations, setLocations] = useState(null);

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

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
}, [GooglePlacesAutocomplete])

  const {
    first_name,
    last_name,
    phone,
    home_address,
    city,
    state,
    office_address,
  } = person;

  const onSubmit = () => {
    if (
      person?.first_name?.length > 3 ||
      person?.last_name?.length > 3 ||
      person?.phone?.length > 11 ||
      locations !== null

      // person?.home_address?.length > 5 ||
      // person?.city?.length > 3 ||
      // state?.length > 3 ||
      // office?.length > 3
      // city,state,office_address
    ) {
      dispatch(
        updateUserAction(
          {
            first_name,
            last_name,
            phone,
            home_address: String(locations),
            city:
              locations?.length > 5
                ? locations.substring(0, 5)
                : String(location),
            state:
              locations?.length > 5
                ? locations.substring(0, 5)
                : String(location),
            office_address: String(locations),
          },
          navigation,
        ),
      );
    } else {
      Alert.alert('Fill the form properly');
    }
  };
  if (Object.keys(person).length == 0) {
    return <DotIndicator color={COLOR.primaryBlue} />;
  }

  console.log(locations, 'locationslocationslocations');
  return (
    <KeyboardAwareScrollView
    keyboardShouldPersistTaps={true}
      style={{flex: 1, backgroundColor: COLOR.whiteColor}}>
      <View>
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
            style={{
              fontWeight: 'bold',
              fontSize: 24,
              color: COLOR.primaryBrown,
            }}>
            Personal Details
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
            Complete your profile details
          </Text>
        </View>

        {/* Form  */}
        <Text
          style={{
            textAlign: 'center',
            top: WP(16),
            zIndex: 10,
            right: WP(38),
            color: COLOR.primaryBrown,
            fontWeight: 'bold'
          }}>
          Address
        </Text>
        <View style={styles.formContainer}>
          <GooglePlacesAutocomplete
            suppressDefaultStyles={true}
            styles={{
              textInputContainer: {
                borderWidth: 0.8,
                padding: WP(3),
                borderColor: COLOR.primaryBlue,
                borderRadius: WP(5),
                color: 'black',
                top: HP(5),
              },
              textInput: {
                // width: WP(10),
                color: '#5d5d5d',
                fontSize: 16,
              },
              container: {
                bottom: WP(9),
                width: WP(90),
                alignSelf: 'center',
                backgroundColor: COLOR.whiteColor,
                marginVertical: WP(5),
              },
              listView: {
                backgroundColor: COLOR.whiteColor,
                color:COLOR.primaryBrown,
                paddinBottom:WP(3),
                top:WP(3),
                marginVertical:WP(5),
                left:WP(2)

              },
              separator:{
                marginVertical:WP(2)
              }
              
            }}
            placeholder="Search"
            onPress={(data, details = null) => {
              setLocations(data?.description);
            }}
            query={{
              key: 'AIzaSyCGPY_hsHcarYRmtuyvZCTOyoRWGN7-JGA',
              language: 'en',
            }}
          />
          {/* <KeyboardAwareScrollView> */}
          <FormCustomInput
            lablelText="First Name"
            value={person?.first_name}
            onChangeText={value => handleInputChange('first_name', value)}
            showIcon={person?.first_name?.length > 3 ? true : false}
          />
          <FormCustomInput
            lablelText="Last Name"
            value={person?.last_name}
            onChangeText={value => handleInputChange('last_name', value)}
            showIcon={person?.last_name?.length >= 3 ? true : false}
          />
          <FormCustomInput
            lablelText="Phone"
            value={person?.phone}
            onChangeText={value => handleInputChange('phone', value)}
            showIcon={person?.phone?.length == 11 ? true : false}
          />
          <View style={{paddinBottom: WP(22),marginVertical:WP(5)}}>
            <FormCustomButton
              backgroundColor={COLOR.mediumBlue}
              textColor={COLOR.whiteColor}
              btnTitle={'Update'}
              onPress={() => onSubmit()}
              fontSize={WP(5)}
            />
          </View>

          {/* <FormCustomInput
              lablelText="City"
              value={person?.city}
              onChangeText={value => handleInputChange('city', value)}
              showIcon={person?.city?.length > 2 ? true : false}
            />
            <FormCustomInput
              lablelText="State"
              value={person?.state}
              onChangeText={value => handleInputChange('state', value)}
              showIcon={person?.state?.length > 2 ? true : false}
            />

            <FormCustomInput
              lablelText="Home Address"
              value={person?.home_address}
              onChangeText={value => handleInputChange('home_address', value)}
              showIcon={person?.home_address?.length >= 5 ? true : false}
            />

            <FormCustomInput
              lablelText="Office Address"
              value={person?.office_address}
              onChangeText={value => handleInputChange('office_address', value)}
              showIcon={person?.office_address?.length >= 5 ? true : false}
            /> */}
          {/* <View>
              <FormCustomButton
                backgroundColor={COLOR.mediumBlue}
                textColor={COLOR.whiteColor}
                btnTitle={'Update'}
                onPress={() => onSubmit()}
                fontSize={WP(5)}
              />
            </View> */}
          <View style={{marginVertical: WP(3)}}>
            <View style={{alignSelf: 'center'}}>
              <Text style={{color: COLOR.primaryGreen}}>{Message}</Text>
            </View>
          </View>
          {/* </KeyboardAwareScrollView> */}
        </View>
      </View>

      {/* <View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
        
        </KeyboardAvoidingView>
      </View> */}
      <View style={{width: WP(85), left: WP(6), bottom: WP(5)}}>
        {/* <FormCustomButton
          backgroundColor={COLOR.mediumBlue}
          textColor={COLOR.whiteColor}
          btnTitle={'Update'}
          onPress={() => onSubmit()}
          fontSize={WP(5)}
        /> */}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default PersonalDetail;

const styles = StyleSheet.create({
  _mainContainer: {
    flex: 1,
    backgroundColor: COLOR.whiteColor,
    height: WP('100%'),
    paddinBottom: WP(50),
  },
  text1: {
    top: WP(10),
    color: COLOR.primaryBrown,
  },
  formContainer: {
    top: WP(15),
    width: WP('90%'),
    alignSelf: 'center',
  },
  googleContainer: {
    width: WP(90),
    position: 'absolute',
    top: WP(127),
    left: WP(5),
    paddinBottom: WP(30),
  },
});
