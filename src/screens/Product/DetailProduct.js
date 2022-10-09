import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
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

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import SearchBar from '../../component/SearchBar';

const DetailProduct = props => {
  const {navigation} = props;
  const [details, setDetails] = useState({});
  const dispatch = useDispatch();
  const [person, setPerson] = useState({});

  //   Search
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();

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
          Products
        </Text>

        <Menu>
          <MenuTrigger>
            <Entypo name="squared-plus" size={22} color={COLOR.mediumBlue} />
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
        {/* <TouchableOpacity
          style={{
            right: WP(3),
            // backgroundColor: COLOR.lightBlue,
            padding: WP(2),
            borderRadius: WP(5),
          }}>
          <Entypo name="squared-plus" size={22} color={COLOR.mediumBlue} />
        </TouchableOpacity> */}
      </View>

      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            left: WP(6),
            top: WP(10),
          }}>
          <Text>Show:</Text>
          <Text style={{left: WP(1)}}>All Products</Text>
          <Icon name="ios-caret-down-sharp" size={18} style={{left: WP(1)}} />
        </View>
      </View>

      {/* Search Component */}
      <View style={styles._searchContainer}>
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
        />
        {/* _actionText */}
        <TouchableOpacity style={styles.action}>
          <Text style={styles._actionText}>
            Action <Icon name="ios-caret-down-sharp" size={18} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailProduct;

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
});
