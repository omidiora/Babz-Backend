import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
  Image,
} from 'react-native';
// Entypo
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FormInput from '../../component/FormInput';
import {useDispatch, useSelector} from 'react-redux';

import {COLOR, FONT, IMAGE, WP, symbols} from '../../common/theme';
import AccountHoc from '../../hoc/AccountHoc';
import {DotIndicator} from 'react-native-indicators';
import {DrawerActions} from '@react-navigation/native';

import {AccountHook} from '../../hooks/AccountHook';
import {getUserAction, updateUserAction} from '../../redux/account/action';
import FormButton from '../../component/FormButton';
import FormCustomButton from '../../component/FormCustomButton';
import FormCustomInput from '../../component/FormCustomInput';
import {ListItem, Avatar} from '@rneui/themed';
import moment from 'moment';
import {capitalizeFirstLetter} from '../../utils/FuntionServices';

const list = [
  {
    name: 'Amy Farha',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: '9 June 2021',
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: '1 June 2021',
  },
  {
    name: 'Amy Farha',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: '9 June 2021',
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: '1 June 2021',
  },
  {
    name: 'Amy Farha',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: '9 June 2021',
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: '1 June 2021',
  },
  {
    name: 'Amy Farha',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: '9 June 2021',
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: '1 June 2021',
  },
  {
    name: 'Amy Farha',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: '9 June 2021',
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: '1 June 2021',
  },
];
const DetailTransaction = props => {
  const {
    navigation,
    route: {
      params: {item = {}},
    },
  } = props;
  console.log(item, 'perops');
  const [payment, setPayment] = useState(...item?.payments);
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
          Product Name
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

      <View style={styles.detailContainer}>
        <View>
          <Image source={IMAGE.detailImage} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text2}>{item?.product?.name}</Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Light',
              fontSize: WP(3),
              paddingBottom: WP(3),
              paddingTop: WP(3),
            }}>
            {moment(item?.created_at).format('LL')}
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              fontSize: WP(4),
              color: COLOR.secondaryGreen,
              fontWeight: 'bold',
            }}>
            {'\u20A6'}
            {item?.product?.price}
          </Text>
        </View>
      </View>
      <View style={styles.detailSubContainer}>
        <View>
          <Text style={styles.productText}>Product</Text>
          <Text style={styles.productText}>Customer</Text>
          <Text style={styles.productText}>Email</Text>
          <Text style={styles.productText}>Status</Text>
          <Text style={styles.productText}>Method</Text>
        </View>
        <View style={{left: WP(10)}}>
          <Text style={styles.productText2}>{item?.product?.name}</Text>
          <Text style={styles.productText2}>
            {capitalizeFirstLetter(item?.customer?.first_name)}{' '}
            {capitalizeFirstLetter(item?.customer?.last_name)}
          </Text>
          <Text style={styles.productText2}>{item?.customer?.email}</Text>
          <Text style={styles.productText2}>
            {symbols.NAIRA}
            {payment?.amount}
          </Text>
          <Text style={styles.productText2}>{item?.customer?.email}</Text>
        </View>
      </View>

      <View>
        {/* Payment History */}
        <View
          style={{
            alignSelf: 'center',
            top: WP(10),
            backgroundColor: COLOR.lightBlue,
            top:WP(3)
          }}>
          <Text style={{textAlign: 'center', top: WP(3)}}>Payment History</Text>
          <View style={{flexDirection: 'row', top: WP(10)}}>
            <Text style={[styles.detailText, {right: WP(10)}]}>Details</Text>
            <Text style={[styles.detailText, {left: WP(3)}]}>
              Payment Method
            </Text>
            <Text style={[styles.detailText, {left: WP(16)}]}>Amount</Text>
          </View>
        </View>

        <ScrollView  contentContainerStyle={{paddingBottom: WP(50)}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.paymentHistory}>
            {/* Details */}
            <View style={[{left: WP(6)}]}>
              <Text style={styles.textColor}>
                {capitalizeFirstLetter(item?.customer?.first_name)}{' '}
                {capitalizeFirstLetter(item?.customer?.last_name)}
              </Text>
              <Text style={styles.textColor}>
                {moment(item?.created_at).format('LLL')}
              </Text>
              <Text style={styles.textColor}> {payment?.status}</Text>
            </View>

            <View style={styles.WIDTH}>
              <Text style={styles.textColor}>{payment?.payment_type}</Text>
            </View>

            <View style={styles.WIDTH}>
              <Text style={styles.textColor}>
                {symbols.NAIRA}
                {payment?.amount}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default DetailTransaction;

const styles = StyleSheet.create({
  _mainContainer: {
    flex: 1,
    backgroundColor: COLOR.whiteColor,
  },
  text1: {
    color: COLOR.primaryBrown,
    fontSize: WP(7),
    fontWeight: 'bold',
  },
  formContainer: {
    top: WP(15),
    width: WP('90%'),
    alignSelf: 'center',
  },
  detailContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    left: WP(13),
    top: WP(10),
    flexDirection: 'row',
  },
  textContainer: {
    left: WP(3),
    top: WP(3),
  },
  text2: {
    fontSize: WP(4),
    fontColor: FONT.lightGrey,
    fontFamily: 'Montserrat-Black',
  },
  detailSubContainer: {
    flexDirection: 'row',
    top: WP(6),
    left: WP(13),
    marginVertical: WP(10),
  },
  productText: {
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Black',
    marginVertical: WP(2),
  },
  productText2: {
    marginVertical: WP(2),
  },
  subDetails: {
    left: WP(3),
  },
  paymentHistory: {
    flexDirection: 'row',
    top: WP(18),
    justifyContent: 'space-between',
  },
  detailText: {
    fontWeight: 'bold',
    color: COLOR.blackColor,
    fontFamily: 'Montserrat-Black',
  },
  WIDTH: {
    width: WP(30),
    right: WP(-10),
  },
  textColor: {
    color: COLOR.primaryBrown,
  },
});
