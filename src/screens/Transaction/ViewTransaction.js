import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
  Dimensions,
} from 'react-native';
// Entypo
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FormInput from '../../component/FormInput';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';

import {COLOR, WP, symbols} from '../../common/theme';
import AccountHoc from '../../hoc/AccountHoc';
import {DotIndicator} from 'react-native-indicators';
import {DrawerActions} from '@react-navigation/native';

import {AccountHook} from '../../hooks/AccountHook';
import {getUserAction, updateUserAction} from '../../redux/account/action';
import FormButton from '../../component/FormButton';
import FormCustomButton from '../../component/FormCustomButton';
import FormCustomInput from '../../component/FormCustomInput';
import {ListItem, Avatar} from '@rneui/themed';
import {getAllTransactionAction} from '../../redux/transaction/action';
import {capitalizeFirstLetter} from '../../utils/FuntionServices';

const list = [
  {
    name: 'Amy Farha',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: '9 June 2021',
  },
  {
    name: 'Chris Ja1ckson',
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
    name: 'Chris Jacxkson',
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
const ViewTransaction = props => {
  const {navigation} = props;
  const [details, setDetails] = useState({});
  const dispatch = useDispatch();
  const [person, setPerson] = useState({});
  const transaction = useSelector(
    state => state?.transaction?.data?.data || [],
  );
  console.log(transaction, 'transaction transactiontransaction');

  useEffect(() => {
    dispatch(getAllTransactionAction());
  }, [dispatch]);

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

  const individualTransaction = item => {
    navigation.navigate('DetailTransaction', {item});
  };

  const color = ['#FF5E84', '#07C86B'];
  const random = Math.floor(Math.random() * color.length);

  const renderEmptyContainer = () => {
    return (
      <View style={{top: WP(20), height: WP(40)}}>
        <Text
          style={{
            color: COLOR.lightGrey,
            textAlign: 'center',
            fontSize: WP(3.5),
          }}>
          No Transaction has taken place
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
          <Icon name="arrow-back" size={22} color={COLOR.primaryBrown} />
        </TouchableOpacity>
        <Text
          style={{fontWeight: 'bold', fontSize: 24, color: COLOR.primaryBrown}}>
          All Transactions
        </Text>
        <TouchableOpacity
          style={{
            right: WP(3),
            backgroundColor: COLOR.lightBlue,
            padding: WP(2),
            borderRadius: WP(5),
          }}
          onPress={() => navigation.openDrawer()}>
          <Entypo
            name="dots-three-horizontal"
            size={22}
            color={COLOR.primaryBrown}
          />
        </TouchableOpacity>
      </View>
      {/*
       */}

      {/* List */}
      <View>
        <FlatList
          keyExtractor={item => Math.random()}
          data={transaction}
          style={{marginVertical: WP(8), paddingBottom: WP(10)}}
          ListEmptyComponent={renderEmptyContainer()}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => individualTransaction(item)}>
              <ListItem bottomDivider>
                {item?.product?.image ? (
                  <Avatar rounded source={{uri: item?.product?.image}} />
                ) : (
                  <View
                    style={{
                      backgroundColor: color[random],
                      height: WP(8),
                      width: WP(8),
                      borderRadius: Math.round(
                        (Dimensions.get('window').height +
                          Dimensions.get('window').width) /
                          2,
                      ),
                    }}></View>
                )}
                <ListItem.Content>
                  <ListItem.Title>
                    <Text
                      style={{
                        color: COLOR.primaryBrown,
                        fontSize: WP(4.8),
                        fontWeight: 'bold',
                      }}>
                      {capitalizeFirstLetter(item?.customer?.first_name)}
                      {item?.customer?.last_name}
                    </Text>
                  </ListItem.Title>

                  <ListItem.Subtitle>
                    {' '}
                    {moment(item?.updated_at).format('ll')}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <View style={{flexDirection: 'column'}}>
                  <Text style={[styles.text1, {color: color[random]}]}>
                    {symbols.NAIRA}
                    {item?.product?.price}
                  </Text>
                  <Text>Enjoy Now</Text>
                </View>
              </ListItem>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default ViewTransaction;

const styles = StyleSheet.create({
  _mainContainer: {
    flex: 1,
    backgroundColor: COLOR.whiteColor,
  },
  text: {
    color: COLOR.primaryBrown,
    fontSize: WP(3),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text1: {
    color: COLOR.primaryBrown,
    fontSize: WP(4.5),
    fontWeight: 'bold',
  },
  formContainer: {
    top: WP(15),
    width: WP('90%'),
    alignSelf: 'center',
  },
});
