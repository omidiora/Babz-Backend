import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Entypo';
import {COLOR, FONT, IMAGE, WP} from '../common/theme';
import {useDispatch, useSelector} from 'react-redux';
import FormButton from '../component/FormButton';
import {getUserAction, updateComplinaneAction} from '../redux/account/action';
import {DrawerActions} from '@react-navigation/native';
import {getAllWalletAction} from '../redux/wallet/action';

import {DotIndicator} from 'react-native-indicators';

// MaterialCommunityIcons
// Ionicons

const data = [
  'Complete personal details',
  'Create a business profile',
  'Compliance Requirements',
  'Add bank details ',
  'Setup your store',
];

const HomeSetting = props => {
  const {navigation} = props;
  const [user, setUser] = useState({});
  const wallet = useSelector(state => state?.wallet?.data);
  const dispatch = useDispatch();
  const [profiletatus, setprofiletatus] = useState(false);
  const [bussinessStatus, setBussinessStatus] = useState(false);
  const [complinanceStatus, setComplinanceStatus] = useState(false);
  const [bankStatus, setBankStatus] = useState(false);
  const [store, setStoreStatus] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      let item = await dispatch(getUserAction(navigation));
      setUser(value => ({
        ...value,
        ...item,
      }));
    };
    fetchUser();
  }, [user, dispatch]);


  
  
  useEffect(() => {
    // dispatch(getUserAction());
    dispatch(getAllWalletAction());
  }, [
    dispatch,
    profiletatus,
    complinanceStatus,
    bankStatus,
    store,
    bussinessStatus,
  ]);

  const userFunction = () => {
    if (user?.home_address !== null || user?.phone !== null) {
      setprofiletatus(true);
    } else {
      setprofiletatus(false);
    }
    if (
      user?.merchant?.business_address !== null &&
      user?.merchant?.business_name !== null &&
      user?.merchant?.business_email !== null
    ) {
      setBussinessStatus(true);
    } else {
      setBussinessStatus(false);
    }
    // Complinance
    if (
      user?.merchant?.business_reg_type !== null &&
      user?.bvn !== null &&
      user?.business_reg_document !== null
    ) {
      setComplinanceStatus(true);
    } else {
      setComplinanceStatus(false);
    }
    // Bank Details
    if (user?.bank_details?.length !== 0) {
      setBankStatus(true);
    } else {
      setBankStatus(false);
    }
    if (user?.merchant?.stores?.length !== 0) {
      setStoreStatus(true);
    } else {
      setStoreStatus(false);
    }
  };

  useEffect(() => {
    userFunction();
  }, [user, ]);

  return (
    <View style={styles._mainContainer}>
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <MaterialCommunityIcons
              name="dots-grid"
              size={32}
              color={COLOR.primaryBrown}
            />
          </TouchableOpacity>
          <View>
            <Ionicons
              name="ios-notifications-outline"
              size={32}
              color={COLOR.primaryBrown}
            />
          </View>
        </View>
      </View>

      <View style={{top: WP(10)}}>
        <Image source={IMAGE.bgHome} style={{width: WP('90%')}} />
        <View style={styles.textContainer1}>
          <Text style={styles.text1}>Your Balance</Text>
          <Text style={styles.text2}>
            {' '}
            {'\u20A6'}
            {parseFloat(wallet?.balance / 100).toFixed(2) == NaN
              ? 0
              : parseFloat(wallet?.balance / 100).toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={{top: WP(20)}}>
        <Text
          style={{
            fontFamily: 'Gilroy-ExtraBold',
            fontWeight: 'bold',
            color: COLOR.lightGrey,
            color: '#000000',
          }}>
          NEXT STEPS
        </Text>
      </View>

      {Object.keys(user).length > 0 ? (
        <View style={{flex: 1}}>
          <ScrollView
            style={{top: WP(20)}}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            {/* {data.map((item, i) => { */}
            {/* return ( */}

            <TouchableOpacity
              style={styles.dataContainer}
              onPress={() =>
                navigation.navigate('Sidebar', {
                  screen: 'BusinessStack',
                  params: {
                    screen: 'PersonalDetail',
                  },
                })
              }>
              <View style={[styles.numberTextContainer]}>
                <Text style={styles.numberText}>{1}</Text>
              </View>
              <Text style={styles.text3}>Complete personal details</Text>
              <View
                style={[
                  styles._icon,
                  {
                    backgroundColor: profiletatus
                      ? COLOR.primaryBlue
                      : COLOR.offWhite,
                  },
                ]}>
                <Icon name="check" size={15} color={COLOR.whiteColor} />
              </View>
            </TouchableOpacity>

            {/* Bussiness Profile */}
            <TouchableOpacity
              style={styles.dataContainer}
              onPress={() =>
                navigation.navigate('Sidebar', {
                  screen: 'BusinessStack',
                  params: {
                    screen: 'BusineessDetail',
                  },
                })
              }>
              <View style={styles.numberTextContainer}>
                <Text style={styles.numberText}>{2}</Text>
              </View>
              <Text style={styles.text3}>Create a business profile</Text>
              <View
                style={[
                  styles._icon,
                  {
                    backgroundColor: bussinessStatus
                      ? COLOR.primaryBlue
                      : COLOR.offWhite,
                  },
                ]}>
                <Icon
                  name="check"
                  size={15}
                  color={data[1] ? COLOR.whiteColor : 'black'}
                />
              </View>
            </TouchableOpacity>

            {/* Complinance */}

            <TouchableOpacity
              style={styles.dataContainer}
              onPress={() =>
                navigation.navigate('Sidebar', {
                  screen: 'BusinessStack',
                  params: {
                    screen: 'ComplianceDetail',
                  },
                })
              }>
              <View style={styles.numberTextContainer}>
                <Text style={styles.numberText}>{3}</Text>
              </View>
              {/* complinanceStatus */}
              <Text style={styles.text3}>Compliance Requirements</Text>
              <View
                style={[
                  styles._icon,
                  {
                    backgroundColor: complinanceStatus
                      ? COLOR.primaryBlue
                      : COLOR.offWhite,
                  },
                ]}>
                <Icon
                  name="check"
                  size={15}
                  color={data[1] ? COLOR.whiteColor : 'black'}
                />
              </View>
            </TouchableOpacity>

            {/* ); */}

            <TouchableOpacity
              style={styles.dataContainer}
              onPress={() =>
                navigation.navigate('Sidebar', {
                  screen: 'BusinessStack',
                  params: {
                    screen: 'BankDetail',
                  },
                })
              }>
              <View style={styles.numberTextContainer}>
                <Text style={styles.numberText}>{4}</Text>
              </View>
              <Text style={styles.text3}>Add bank details</Text>
              <View
                style={[
                  styles._icon,
                  {
                    backgroundColor: bankStatus
                      ? COLOR.primaryBlue
                      : COLOR.offWhite,
                  },
                ]}>
                <Icon
                  name="check"
                  size={15}
                  color={data[1] ? COLOR.whiteColor : 'black'}
                />
              </View>
            </TouchableOpacity>

            {/* Store */}

            <TouchableOpacity
              style={styles.dataContainer}
              onPress={() =>
                navigation.navigate('Sidebar', {
                  screen: 'StoreStack',
                  params: {
                    screen: 'CreateStore',
                  },
                })
              }>
              <View style={styles.numberTextContainer}>
                <Text style={styles.numberText}>{5}</Text>
              </View>
              <Text style={styles.text3}>Setup your store</Text>
              <View
                style={[
                  styles._icon,
                  {
                    backgroundColor: store ? COLOR.primaryBlue : COLOR.offWhite,
                  },
                ]}>
                <Icon
                  name="check"
                  size={15}
                  color={data[1] ? COLOR.whiteColor : 'black'}
                />
              </View>
            </TouchableOpacity>
            {/* const [profiletatus, setprofiletatus] = useState(false);
  const [bussinessStatus, setBussinessStatus] = useState(false);
  const [complinanceStatus, setComplinanceStatus] = useState(false);
  const [bankStatus, setBankStatus] = useState(false);
  const [store, setStoreStatus] = useState(false); */}

            <View style={{paddingBottom: WP(20), marginVertical: WP(3)}}>
              <FormButton
                btnTitle="Start Selling"
                fontWeight="bold"
                textColor={COLOR.whiteColor}
                disabled={
                  profiletatus == false ||
                  bussinessStatus == false ||
                  complinanceStatus == false ||
                  bankStatus == false ||
                  store == false
                    ? true
                    : false
                }
                color={
                  profiletatus == true &&
                  bussinessStatus == true &&
                  complinanceStatus == true &&
                  bankStatus == true &&
                  store == true
                    ? COLOR.whiteColor
                    : COLOR.blackColor
                }
                // COLOR.offWhite
                backgroundColor={
                  profiletatus == true &&
                  bussinessStatus == true &&
                  complinanceStatus == true &&
                  bankStatus == true &&
                  store == true
                    ? COLOR.primaryBlue
                    : COLOR.offWhite
                }
                onPress={() =>
                  navigation.navigate('Sidebar', {
                    screen: 'Home',
                  })
                }
              />
            </View>
          </ScrollView>
        </View>
      ) : (
        <View style={{top: WP(33)}}>
          <DotIndicator color={COLOR.primaryBlue} />
        </View>
      )}
    </View>
  );
};

export default HomeSetting;

const styles = StyleSheet.create({
  _mainContainer: {
    flex: 1,
    padding: WP(5),
    backgroundColor: COLOR.whiteColor,
  },
  textContainer1: {position: 'absolute', top: WP(15), left: WP(10)},
  text1: {
    fontSize: WP(5),
    color: COLOR.whiteColor,
    fontFamily: FONT.medium,
  },
  text2: {
    fontSize: WP(9),
    color: COLOR.whiteColor,
    fontFamily: FONT.bold,
    right: WP(3),
  },
  dataContainer: {
    flexDirection: 'row',
    borderWidth: WP(0.6),
    padding: WP(5),
    marginVertical: WP(1),
    borderColor: '#F0F5FA',
    borderRadius: WP(3),
  },
  numberTextContainer: {
    borderWidth: WP(0.4),
    width: WP(8),
    height: WP(8),
    borderRadius: WP(7),
    textAlign: 'center',
    backgroundColor: COLOR.mediumBlue,
    borderColor: COLOR.mediumBlue,
    color: COLOR.whiteColor,
  },
  numberText: {
    textAlign: 'center',
    color: COLOR.whiteColor,
    top: WP(1),
  },
  text3: {
    left: WP(5),
    fontFamily: 'Gilroy-Light',
    fontWeight: '400',
    fontSize: WP(4.4),
    color: '#223564',
  },
  _icon: {
    position: 'absolute',
    left: WP(75),
    top: WP(5),
    backgroundColor: COLOR.mediumBlue,
    borderRadius: WP(5),
    padding: WP(1),
  },
});
