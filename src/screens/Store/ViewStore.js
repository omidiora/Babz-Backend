import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Entypo';
import {COLOR, FONT, IMAGE, WP, symbols} from '../../common/theme';
import {useDispatch, useSelector} from 'react-redux';
import FormButton from '../../component/FormButton';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  getAllTransactionAction,
  getAllTransactionByPaginationAction,
} from '../../redux/transaction/action';
import {ListItem, Avatar} from '@rneui/themed';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {getAllWalletAction} from '../../redux/wallet/action';
import {DotIndicator} from 'react-native-indicators';

// MaterialCommunityIcons
// Ionicons

// const data = [
//   {title: 'Complete personal details', time: '9 June 2021', money: 3000},
//   {title: 'Facebook Ads', time: '6 June 2021', money: 300},
//   {title: 'Airbnb', time: '4 June 2021', money: 100},
//   {title: 'Facebook Ads', time: '2 June 2021', money: 1000},
// ];

const data = [
  {
    name: 'Youtube Premium',
    subtitle: 'Vice President',
    price: '$550',
  },
  {
    name: 'Facebook Ads',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
    price: '#400',
  },
];

const ViewStore = props => {
  const {navigation} = props;
  console.log(navigation, 'navigaiton');
  const user = useSelector(state => state?.auth?.login_user?.user);
  const wallet = useSelector(state => state?.wallet?.data);

  const loading = useSelector(state => state?.transaction || []);
  const transactions = useSelector(state => state?.transaction?.data || []);

  console.log(loading, 'transaction');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTransactionByPaginationAction(1));
    dispatch(getAllWalletAction());
  }, []);

  const NextPagePagination = () => {
    let page = 1;
    page =
      transactions?.current_page < transactions?.last_page
        ? transactions?.current_page + 1
        : transactions?.last_page;
    dispatch(getAllTransactionByPaginationAction(page));
  };

  const BackPagePagination = () => {
    let page;
    page =
      transactions?.current_page == 1
        ? transactions?.current_page
        : transactions?.current_page - 1;

    dispatch(getAllTransactionByPaginationAction(page));
  };

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
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
          No Transaction has taken place
        </Text>
      </View>
    );
  };

  if (loading?.loading == true) {
    return <DotIndicator color={COLOR.primaryBlue} />;
  }

  return (
    <View style={styles._mainContainer}>
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <MaterialCommunityIcons
              name="dots-grid"
              size={32}
              color={COLOR.primaryBrown}
            />
            <View
              style={{
                position: 'absolute',
                left: WP(10),
                width: WP(30),
                top: WP(2),
              }}>
              <Text>{user?.first_name}</Text>
            </View>
          </TouchableOpacity>
          <View>
            <TouchableOpacity>
              <Menu
                style={{
                  right: WP(3),
                  backgroundColor: COLOR.lightBlue,
                  padding: WP(2),
                  borderRadius: WP(5),
                }}>
                <MenuTrigger>
                  <Entypo
                    name="dots-three-horizontal"
                    size={22}
                    color={COLOR.primaryBrown}
                  />
                </MenuTrigger>
                <MenuOptions style={{padding: WP(3)}}>
                  <MenuOption
                    onSelect={() => navigation.navigate('CreateStore')}>
                    <Text style={{color: COLOR.blackColor}}>
                      Create a new store"
                    </Text>
                  </MenuOption>

                  <MenuOption
                    onSelect={() =>
                      navigation.navigate('Sidebar', {
                        screen: 'Transaction',
                      })
                    }>
                    <Text style={styles.menuText}>Transaction</Text>
                  </MenuOption>

                  <MenuOption
                    onSelect={() =>
                      navigation.navigate('Sidebar', {
                        screen: 'DisputeStack',
                      })
                    }>
                    <Text style={styles.menuText}>Disputes</Text>
                  </MenuOption>

                  {/* <MenuOption
                    onSelect={() => alert(`Delete`)}
                    text="Manage Product"
                  />
                  <MenuOption
                    onSelect={() => alert(`Delete`)}
                    text="Send payment link"
                  />
                  <MenuOption
                    onSelect={() => alert(`Delete`)}
                    text="Withdraw"
                  />
                  <MenuOption
                    onSelect={() => alert(`Delete`)}
                    text="Transactions"
                  /> */}
                </MenuOptions>
              </Menu>
            </TouchableOpacity>

            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
          </View>
        </View>
      </View>

      <View style={{top: WP(10)}}>
        <Image source={IMAGE.bgHome} style={{width: WP(90)}} />
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
      <View
        style={{
          top: WP(20),
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontFamily: 'Gilroy-ExtraBold', fontWeight: 'bold'}}>
          Transactions
        </Text>
        <View>
          <Entypo
            name="dots-three-horizontal"
            size={22}
            color={COLOR.primaryBrown}
          />
        </View>
      </View>
      <FlatList
        data={transactions?.data}
        ListEmptyComponent={renderEmptyContainer()}
        style={{
          height: WP(115),
          top: WP(13),
          left: WP(2),
        }}
        renderItem={({item}) => (
          <View style={{top: WP(6)}}>
            <ListItem bottomDivider>
              <View
                style={{
                  backgroundColor: generateColor(),
                  height: WP(10),
                  width: WP(10),
                  borderRadius: WP(10),

                  marginVertical: WP(2),
                }}>
                {/* do not write any here */}
              </View>
              <ListItem.Content>
                <ListItem.Title
                  style={{
                    fontSize: WP(4),
                    color: COLOR.primaryBrown,
                    fontWeight: '700',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {item?.product?.name}
                </ListItem.Title>
                <ListItem.Subtitle
                  style={{
                    fontSize: WP(3),
                    color: COLOR.primaryBrown,
                    fontWeight: '300',
                    fontFamily: 'Montserrat-Light',
                  }}>
                  {item?.period_date}
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Subtitle
                style={{
                  fontSize: WP(4),
                  color: generateColor(),
                  fontWeight: 'bold',
                  fontFamily: 'Montserrat-Light',
                }}>
                {symbols.NAIRA}
                {item?.price}
              </ListItem.Subtitle>
            </ListItem>
          </View>
        )}
      />

      {/* { transactions?.current_page > transactions?.last_page} */}

      <View style={styles.paginationContainer}>
        <View>
          <Text>
            {transactions?.current_page} - {transactions?.last_page} pages
          </Text>
        </View>
      </View>

      <View style={{left: WP(65), top: WP(-3.8)}}>
        <View style={{flexDirection: 'row', marginHorizontal: WP(3)}}>
          <TouchableOpacity
            onPress={() => BackPagePagination()}
            disabled={transactions?.current_page == 1 ? true : false}
            style={styles.iconContainer}>
            <Entypo name="chevron-thin-left" size={12} />
          </TouchableOpacity>
          {/* BackPagePagination */}

          <TouchableOpacity
            onPress={() => NextPagePagination()}
            style={[styles.iconContainer, {left: WP(2)}]}
            disabled={
              transactions?.current_page != transactions?.last_page
                ? false
                : true
            }>
            <Entypo name="chevron-thin-right" size={12} />
          </TouchableOpacity>

          {/* {allpagintion?.current_page != allpagintion?.last_page && (
        <TouchableOpacity style={[styles.iconContainer, {left: WP(2)}]}>
          <Entypo name="chevron-thin-left" size={12} />
        </TouchableOpacity>
      )} */}
        </View>
      </View>
    </View>
  );
};

export default ViewStore;

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
    borderWidth: WP(0.1),
    padding: WP(5),
    marginVertical: WP(1),
    borderColor: '#F0F5FA;',
    borderRadius: WP(3),
  },
  numberTextContainer: {
    borderWidth: WP(0.4),
    width: WP(8),
    height: WP(8),
    borderRadius: WP(7),
    textAlign: 'center',
    backgroundColor: COLOR.mediumBlue,
    borderColor: COLOR.primary,
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
  },
  _icon: {
    position: 'absolute',
    left: WP(75),
    top: WP(5),
    backgroundColor: COLOR.mediumBlue,
    borderRadius: WP(5),
    padding: WP(1),
  },
  itemContainer: {
    height: WP(2),
    weight: WP(1),
    borderRadius: WP(12),
  },
  menuText: {
    color: COLOR.blackColor,
  },
});
