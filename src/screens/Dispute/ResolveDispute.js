import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
} from 'react-native';
// Entypo
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FormInput from '../../component/FormInput';
import {useDispatch, useSelector} from 'react-redux';

import {COLOR, WP} from '../../common/theme';
import AccountHoc from '../../hoc/AccountHoc';
import {DotIndicator} from 'react-native-indicators';
import {DrawerActions} from '@react-navigation/native';

import {AccountHook} from '../../hooks/AccountHook';
import {getUserAction, updateUserAction} from '../../redux/account/action';
import FormButton from '../../component/FormButton';
import FormCustomButton from '../../component/FormCustomButton';
import FormCustomInput from '../../component/FormCustomInput';

import Textarea from 'react-native-textarea';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import SearchBar from '../../component/SearchBar';
import moment from 'moment';
import {getAllDisputes, getAllDisputesById} from '../../redux/dispute/action';

const ResolveDispute = props => {
  const {navigation} = props;
  const dispute = useSelector(state => state.dispute?.dispute?.data || []);
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    dispatch(getAllDisputes());
  }, [dispatch]);

  const getDisputeById = item => {
    setSelectedId(item?.id)
   
    dispatch(getAllDisputesById(id));
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
          No Dispute yet!
        </Text>
      </View>
    );
  };

  return (
    <View>
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
          Disputes
        </Text>

        <Menu>
          <MenuTrigger>
            <Entypo name="squared-plus" size={35} color={COLOR.mediumBlue} />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={() => alert(`Save`)} text="Edit Product" />
            <MenuOption onSelect={() => alert(`Save`)} text="Make Featured" />
            <MenuOption
              onSelect={() => alert(`Save`)}
              text="Deactivate Product"
            />
            <MenuOption onSelect={() => alert(`Save`)} text="Delete" />
          </MenuOptions>
        </Menu>
      </View>
      <FlatList
        data={dispute}
        ListEmptyComponent={renderEmptyContainer()}
        keyExtractor={item => Math.random()}
        style={{top: WP(5), padding: WP(10)}}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: WP(5),
            }}
            onPress={() => getDisputeById(item)}>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontFamily: 'Montserrat-Bold',
                  color: COLOR.blackColor,
                }}>
                Reference
              </Text>
              <Text
                style={{
                  fontWeight: '400',
                  fontFamily: 'Gilroy-Light',
                  color: COLOR.blackColor,
                }}>
                {item?.transaction_ref}
              </Text>

              <View
                style={{
                  borderBottomColor: COLOR.lightGrey,
                  borderBottomWidth: 0.2,
                  width: WP('70%'),
                  top: WP(4),
                  marginVertical: WP(3),
                }}
              />
            </View>

            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontFamily: 'Montserrat-Bold',
                  color: COLOR.blackColor,
                }}>
                {item?.status}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
      {/* Verical line */}
    </View>
  );
};

export default ResolveDispute;

const styles = StyleSheet.create({});
