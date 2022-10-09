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
import Entypo from 'react-native-vector-icons/Entypo';
import FormInput from '../../component/FormInput';
import {useDispatch, useSelector} from 'react-redux';

import {COLOR, IMAGE, WP} from '../../common/theme';
import {getAllWithPaymentAction} from '../../redux/transaction/action';
import {ListItem, Avatar} from '@rneui/themed';
import moment from 'moment';

const ViewPayment = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const [pendingRequest, setPendingRequest] = useState([]);
  const allpayments = useSelector(
    state => state.transaction?.all_payment?.data,
  );

  useEffect(() => {
    dispatch(getAllWithPaymentAction());
  }, [dispatch]);

  const renderEmptyContainer = () => {
    return (
      <View style={{top: WP(20), height: WP(40)}}>
        <Text
          style={{
            color: COLOR.lightGrey,
            textAlign: 'center',
            fontSize: WP(3.5),
          }}>
          No Payment has taken place yet
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
          Payments
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreatePayment')}>
          <Entypo name="squared-plus" size={35} color={COLOR.mediumBlue} />
        </TouchableOpacity>
      </View>

      {/* Pending Request */}
      <View style={styles.pendingContainer}>
        <Text style={styles.pendingHeaderText}>Pending Requests</Text>
      </View>
      <FlatList
        data={allpayments}
        keyExtractor={item => Math.random()}
        ListEmptyComponent={renderEmptyContainer()}
        renderItem={({item}) => (
          console.log(item, 'ot'),
          (
            <>
              <ListItem bottomDivider>
                <Avatar source={IMAGE.income} />
                <ListItem.Content>
                  <ListItem.Title>{item?.product?.name}</ListItem.Title>
                  <ListItem.Subtitle>
                    {moment(item.created_at).format('LL')}
                    {/* moment().format('LL'); */}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Title
                  style={{fontWeight: '400', color: COLOR.blackColor}}>
                  <Text>
                    {'\u20A6'}
                    {item?.product?.price} {'\n'} {item?.status}
                  </Text>
                </ListItem.Title>
              </ListItem>
            </>
          )
        )}
      />
    </View>
  );
};

export default ViewPayment;

const styles = StyleSheet.create({
  _mainContainer: {
    flex: 1,
    backgroundColor: COLOR.whiteColor,
  },
  pendingContainer: {
    top: WP(10),
    left: WP(5),
  },
  pendingHeaderText: {
    fontSize: WP(4.5),
    fontWeight: 'bold',
    fontFamily: 'Montserrat-ExtraBold',
    color: COLOR.blackColor,
  },
});
