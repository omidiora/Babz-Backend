import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
  TextInput,
  Image,
} from 'react-native';
// Entypo
import Icon from 'react-native-vector-icons/Ionicons';
import FormInput from '../../component/FormInput';
import {useDispatch, useSelector} from 'react-redux';

import {COLOR, HP, IMAGE, WP, symbols} from '../../common/theme';
import AccountHoc from '../../hoc/AccountHoc';
import {DotIndicator} from 'react-native-indicators';
import {DrawerActions} from '@react-navigation/native';

import {AccountHook} from '../../hooks/AccountHook';
import {getUserAction, updateUserAction} from '../../redux/account/action';
import {getAllBankAction} from '../../redux/bank/action';
import FormCustomButton from '../../component/FormCustomButton';
import FormCustomInput from '../../component/FormCustomInput';
import Entypo from 'react-native-vector-icons/Entypo';

import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import SearchBar from '../../component/SearchBar';
import ProductCategoryHoc from '../../hoc/ProductHoc';
import {
  getAllProductAction,
  getAllProductCategoryAction,
} from '../../redux/product/action';

import {SwipeablePanel} from 'rn-swipeable-panel';
import {
  getAllWithDrawerAction,
  MakeWithDrawalRequestAction,
} from '../../redux/transaction/action';

import {MenuView} from '@react-native-menu/menu';
import RNPickerSelect from 'react-native-picker-select';
import {showMessage, hideMessage} from 'react-native-flash-message';

const WithDrawer = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [person, setPerson] = useState({});
  const [amount, setAmount] = useState(null);
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [bank_id, setBankId] = useState(null);
  const banks = useSelector(state => state?.bank.bank?.data || []);
  const withdrawal = useSelector(
    state => state?.transaction?.withdral_payment?.data?.data || [],
  );
  console.log(withdrawal, 'error');

  // const banks = useSelector(state => state?.bank|| []);
  // console.log(banks, 'banks')
  const productCategory = () => {
    return banks.map(item => {
      return {
        value: item?.id,
        label: item?.name,
        ...item,
      };
    });
  };
  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: true,
    showCloseButton: true,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
    // ...or any prop you want
  });

  const openPanel = () => {
    setIsPanelActive(true);
  };

  const closePanel = () => {
    setIsPanelActive(false);
  };
  //   Search
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    dispatch(getAllProductAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllBankAction()); //
    dispatch(getAllWithDrawerAction());
  }, [dispatch]);

  const handleInputChange = (inputName, inputValue) => {
    setPerson({
      ...person,
      [inputName]: inputValue,
    });
  };

  const MakeWithDrawalRequest = () => {
    if (amount == null || bank_id == null) {
      Alert.alert(
        'it seem some details are missing. Kindly fill them correctly',
      );
    } else {
      dispatch(
        MakeWithDrawalRequestAction({amount: amount, bank_details_id: bank_id}),
      );
    }
  };

  const renderEmptyContainer = () => {
    return (
      <View style={{top: WP(20), height: WP(40)}}>
        <Text
          style={{
            color: COLOR.lightGrey,
            textAlign: 'center',
            fontSize: WP(3.5),
          }}>
          No Pending Request yet!
        </Text>
      </View>
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
          <Icon name="arrow-back" size={32} color={COLOR.primaryBrown} />
        </TouchableOpacity>
        <Text
          style={{fontWeight: 'bold', fontSize: 24, color: COLOR.primaryBrown}}>
          Withdrawals
        </Text>
        <TouchableOpacity
          onPress={() => {
            openPanel();
          }}>
          <Entypo name="squared-plus" size={35} color={COLOR.mediumBlue} />
        </TouchableOpacity>
      </View>

      <View style={{width: WP(70), left: WP(15)}}>
        <Text
          style={{
            position: 'absolute',
            top: WP(19),
            textAlign: 'center',
            alignSelf: 'center',
            fontSize: WP(4.5),
            opacity: 0.7,
            color: COLOR.primaryBrown,
          }}>
          Enter Amount
        </Text>
        <TextInput
          onChangeText={e => setAmount(e)}
          style={{
            width: WP('80%'),
            borderWidth: WP(0.8),
            alignSelf: 'center',
            top: WP(15),
            height: WP(28),
            textAlign: 'center',
            fontWeight: 'bold',
            color: COLOR.blackColor,
            fontSize: WP(8.5),
            borderColor: COLOR.lightBlue,
            paddingTop: WP(6),
            borderRadius: WP(6),
          }}
        />
        <View>
          <Entypo name="check" size={15} color={COLOR.whiteColor} />
        </View>
      </View>

      {/* <View style={{top: WP(21), left: WP(6)}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: WP(5.5),
            color: COLOR.blackColor,
          }}>
          Pending Requests
        </Text>
      </View>
      <View style={{top: WP(28), flexDirection: 'row', left: WP(5)}}>
        <Image source={IMAGE.danger} />
      </View> */}

      {/* Panel */}
      <SwipeablePanel
        {...panelProps}
        isActive={isPanelActive}
        onlySmall={true}
        barContainerStyle={{backgroundColor: COLOR.mediumBlue}}>
        <View style={styles.panelContainer}>
          <View>
            <Text style={styles.bankHeader}>Select Bank Account</Text>
          </View>
          <View
            style={[
              styles.buttonContainer,
              {
                borderWidth: WP(0.1),
                borderColor: COLOR.whiteColor,
                borderRadius: WP(3),
              },
            ]}>
            <RNPickerSelect
              onValueChange={value => setBankId(value)}
              items={productCategory()}
              placeholder={{
                label: 'Select bank account',
                value: null,
              }}
              style={{
                placeholder: {color: COLOR.whiteColor},
                inputIOS: {color: COLOR.whiteColor},
                inputAndroid: {color: COLOR.whiteColor},
              }}
            />
          </View>

          <View>
            <Text style={styles.bankHeader}>
              Are you sure you want to withdraw your balance?
            </Text>
            <View style={{width: WP(80), alignSelf: 'center', left: WP(2)}}>
              <FormCustomButton
                onPress={() => MakeWithDrawalRequest()}
                btnTitle="Confirm "
                borderWidth={WP(0.1)}
                borderColor={COLOR.whiteColor}
                textColor={COLOR.blackColor}
                backgroundColor={COLOR.whiteColor}
                padding={2}
                fontWeight={'bold'}
              />
            </View>
          </View>
        </View>
      </SwipeablePanel>

      <View style={{top: HP(12), left: WP(10)}}>
        <Text style={{color: 'black', fontSize: WP(5)}}>Pending Requests</Text>
      </View>

      <FlatList
        data={withdrawal}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={renderEmptyContainer()}
        style={{
          top: WP(27),
          left: WP(10),
          paddinBottom: WP(3),
          marginVertical: WP(3),
        }}
        renderItem={({item}) => (
          console.log(item, 'aaaaaaaa'),
          (
            <TouchableOpacity
              style={{
                paddingBottom: WP(3),
                flexDirection: 'row',
              }}>
              {item?.status == 'pending' && (
                <>
                  <Image source={IMAGE.danger} style={{width: WP(10)}} />
                  <Text
                    style={{color: COLOR.blackColor, left: WP(5), top: WP(3)}}>
                    {moment(item?.created_at).format('LL')}
                  </Text>
                  <View style={{width: WP(106)}}>
                    <Text
                      style={{
                        color: COLOR.blackColor,
                        top: WP(3),
                        marginLeft: WP(30),
                        color: COLOR.secondaryGreen,
                      }}>
                      {symbols?.NAIRA}
                      {item?.amount}
                    </Text>
                  </View>
                </>
              )}
            </TouchableOpacity>
          )
        )}
      />
    </View>
  );
};

export default ProductCategoryHoc(WithDrawer);

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
  _searchContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    top: WP(12),
  },
  action: {
    right: WP(24),
    top: WP(3),
    borderWidth: 1,
    borderColor: COLOR.extraOffWhite,
    borderRadius: WP(4),
    height: WP(9),
    width: WP(22),
    textAlign: 'center',
  },
  _actionText: {
    alignSelf: 'center',
    top: WP(1),
  },
  panelContainer: {
    backgroundColor: COLOR.mediumBlue,
    flex: 1,
    height: WP('100%'),
    width: WP('100%'),
  },
  bankHeader: {
    color: 'white',
    left: WP(7),
    fontSize: WP(4),
    padding: WP(6),
    fontFamily: 'Montserrat-Light',
    top: WP(3),
  },
  buttonContainer: {
    width: WP(80),
    left: WP(14),
    top: WP(2),
  },
});
