import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLOR, FONT, HP, IMAGE, symbols, WP} from '../common/theme';
import {useDispatch, useSelector} from 'react-redux';
import FormButton from '../component/FormButton';
import Entypo from 'react-native-vector-icons/Entypo';
import {getAllTransactionAction} from '../redux/transaction/action';
import {ListItem, Avatar} from '@rneui/themed';
import AppBar from '../component/AppBar';
import preferences from '../utils/preferences';
import AsyncStorage from '@react-native-community/async-storage';
import {deleteUserBankDetailsAction} from '../redux/bank/action';

// MaterialCommunityIcons
// Ionicons

// const data = [
//   {title: 'Complete personal details', time: '9 June 2021', money: 3000},
//   {title: 'Facebook Ads', time: '6 June 2021', money: 300},
//   {title: 'Airbnb', time: '4 June 2021', money: 100},
//   {title: 'Facebook Ads', time: '2 June 2021', money: 1000},
// ];

const Food = [
  // {
  //   name: 'Amala',
  //   image: require('../assets/image/Amala.jpg'),
  // },
  // 1. Set a large pot on medium heat; add in 6 cups of water , cover and bring to a boil. add in cleaned beans. ..
  {
    name: 'Pounded Yam',
    image: require('../assets/image/poundedyam2.jpg'),
    ingredients: [
      {item: 'Water'},
      {item: 'Yam'},
      {
        item: 'Mortar and Pestle to pound the Yam until it becomes smooth and doughy',
      },
    ],

    procedure:
      '    Peel the yam and cut it into small cubes. Rinse about once or twice till you get clear water Boil until the Yam becomes fork-tender.Pound or blend into a dough-like consistency until it’s completely smooth with no yam chunks left.',
  },
];
// porridge.webp

const PoundedYam = props => {
  const {navigation} = props;
  const user = useSelector(state => state?.auth?.login_user?.user);
  const AllFood = useSelector(state => state?.transaction?.data || []);
  const [profiletatus, setprofiletatus] = useState(false);
  const [bussinessStatus, setBussinessStatus] = useState(false);
  const [complinanceStatus, setComplinanceStatus] = useState(false);
  const [bankStatus, setBankStatus] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTransactionAction());
  }, []);

  useEffect(() => {
    if (user?.home_address !== null && user?.phone !== null) {
      setprofiletatus(true);
    } else if (
      user?.merchant?.business_address !== null &&
      user?.merchant?.business_name !== null &&
      user?.merchant?.business_email !== null
    ) {
      setBussinessStatus(true);
    }
    // Complinance
    else if (
      user?.merchant?.business_reg_type !== null &&
      user?.bvn !== null &&
      user?.business_reg_document !== null
    ) {
      setComplinanceStatus(true);
    }
    // Bank Details
    else if (user?.bank_details.length !== 0) {
      setBankStatus(true);
    } else if (user?.merchant.stores.length !== 0) {
      setStoreStatus(true);
    }
  }, []);

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

  const [showBox, setShowBox] = useState(true);

  const renderEmptyContainer = () => {
    return (
      <View style={{top: WP(20), height: WP(40)}}>
        <Text
          style={{
            color: COLOR.lightGrey,
            textAlign: 'center',
            fontSize: WP(3.5),
          }}>
          loading...
        </Text>
      </View>
    );
  };

  const fetchuser = async () => {
    const token = await AsyncStorage.getItem(preferences.KEYS.ACCESS_TOKEN);
    console.log(token, 'toake');
  };
  useEffect(() => {
    fetchuser();
  }, []);

  const showConfirmDialog = id => {
    return Alert.alert(
      'Are your sure?',
      'Are you sure you want to remove this beautiful box?',
      [
        // The "Yes" button
        {
          text: 'Yes',
          onPress: () => {
            setShowBox(false);
            DeleteUserDetails(id);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: 'No',
        },
      ],
    );
  };

  const DeleteUserDetails = id => {
    dispatch(deleteUserBankDetailsAction(id));
  };

  return (
    // <View style={styles._mainContainer}>

    <View>
      <ScrollView contentContainerStyle={{paddingBottom: WP(90)}}>
        {Food.map(item => (
          <>
            <View>
              <Image
                source={item.image}
                style={{width: WP(100), height: HP(50)}}
                resizeMode={'cover'}
              />
            </View>
            <View style={{left: WP(8)}}>
              <View>
                <Text style={styles.text2}>Name: {item.name}</Text>
              </View>
              <Text style={[styles.text2, {top: WP(10)}]}>Ingredient</Text>
              {item.ingredients.map(value => (
                <View style={{flexDirection: 'column', top: HP(5)}}>
                  <Text
                    style={{
                      color: 'black',
                    }}>
                    {value.item}
                  </Text>
                </View>
              ))}
            </View>
            <View>
              <Text
                style={[
                  styles.text2,
                  {top: WP(10), left: WP(5), marginVertical: WP(4)},
                ]}>
                Procedure
              </Text>
              <Text
                style={{
                  color: 'black',
                  top: HP(5),
                  width: WP(90),
                  left: WP(5),
                }}>
                {item.procedure}
              </Text>
            </View>
          </>
        ))}
      </ScrollView>
    </View>
  );
};

export default PoundedYam;

const styles = StyleSheet.create({
  _mainContainer: {
    flex: 1,
    padding: WP(5),
    backgroundColor: COLOR.whiteColor,
  },
  textContainer1: {
    position: 'absolute',
    top: WP(8),
    left: WP(15),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  text1: {
    color: COLOR.whiteColor,
    fontFamily: FONT.medium,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text2: {color: 'black', fontSize: WP(5), top: HP(3), fontWeight: 'bold'},
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

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: HP(10),
  },
  allFoodContainer: {
    backgroundColor: 'brown',
    padding: WP(14),
  },

  Container3: {
    width: '100%',
    backgroundColor: 'brown',
    marginTop: WP(40),
    height: HP(20),
    backgroundColo: 'yellow',
    textAlign: 'center',
  },
});
