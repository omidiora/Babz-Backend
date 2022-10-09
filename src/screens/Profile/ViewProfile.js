import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
// Entypo
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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

const ViewProfile = props => {
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
          Profile
        </Text>
        <TouchableOpacity
          style={{
            right: WP(3),
            // backgroundColor: COLOR.lightBlue,
            padding: WP(2),
            borderRadius: WP(5),
          }}>
          <Text style={{textDecorationLine: 'underline'}}>EDIT</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.container}>
          <Image
            source={IMAGE.profile2}
            style={{width: WP(32), height: WP(32)}}
          />
          <View style={styles.subcontainer}>
            <Text
              style={{
                fontSize: WP(6),
                fontWeight: 'bold',
                color: COLOR.blackColor,
                width: WP(80),
              }}>
              {person?.first_name} {person?.last_name}
            </Text>
            {/* <Text>{'@Jidenna Ike'}</Text> */}
          </View>
        </View>
      </View>

      {/* Profile Details */}
      <View style={styles.profileDetailContainer}>
        <View style={{left: WP(5), top: WP(5)}}>
          <Icon name="person-outline" size={22} color={COLOR.primaryBrown} />
        </View>
        <View style={{left: WP(17)}}>
          <Text style={styles.text3}>Full Name</Text>
          <Text style={styles.text2}>
            {person?.first_name} {person?.last_name}
          </Text>
        </View>

        {/* Email */}

        <View style={{left: WP(5), top: WP(5)}}>
          <MaterialCommunityIcons
            name="email-outline"
            size={22}
            color={COLOR.primaryBrown}
          />
        </View>
        <View style={{left: WP(17)}}>
          <Text style={styles.text3}>Email</Text>
          <Text style={styles.text2}>{person?.email}</Text>
        </View>

        {/* Phone */}

        <View style={{left: WP(5), top: WP(5)}}>
          <Icon name="call-outline" size={22} color={COLOR.primaryBrown} />
        </View>
        <View style={{left: WP(17)}}>
          <Text style={styles.text3}>Phone</Text>
          <Text style={styles.text2}>{person?.phone}</Text>
        </View>
      </View>
      <View style={{top: WP(29)}}>
        <TouchableOpacity
          style={styles._button}
          onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles._btnText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      {/* ChangePassword */}

      <View style={{top: WP(32)}}>
        <TouchableOpacity
          style={styles._button}
          onPress={() => navigation.navigate('ChangePassword')}>
          <Text style={styles._btnText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ViewProfile;

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
  container: {
    flexDirection: 'row',
    top: WP(15),
    left: WP(8),
  },
  subcontainer: {
    top: WP(7),
    left: WP(2),
  },
  profileDetailContainer: {
    top: WP(20),
    left: WP(12),
    backgroundColor: '#F6F8FA',
    height: WP(55),
    width: WP(80),
    borderWidth: 0.1,
    borderColor: COLOR.extraBlue,
  },
  _button: {
    borderColor: COLOR.blackColor,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: WP(12),
    width: WP(80),
    alignSelf: 'center',
    padding: WP(3),
    opacity: 0.7,
  },
  _btnText: {
    textAlign: 'center',
    color: '#9597A6',
  },
  text2: {
    color: '#6B6E82',
    fontWeight: '500',
  },
  text3: {
    color: '#32343E',
    fontWeight: '500',
  },
});
