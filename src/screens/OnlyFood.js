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
import {getAllIndustryAction} from '../redux/industry/action';

const OnlyFood = props => {
  const {navigation} = props;
  const user = useSelector(state => state?.auth?.login_user?.user);
  const AllFood = useSelector(state => state?.industry?.data || []);
  console.log(AllFood, 'lmlsmlsm');
  const [profiletatus, setprofiletatus] = useState(false);
  const [bussinessStatus, setBussinessStatus] = useState(false);
  const [complinanceStatus, setComplinanceStatus] = useState(false);
  const [bankStatus, setBankStatus] = useState(false);

  useEffect(() => {
    dispatch(getAllIndustryAction());
  }, []);

  const dispatch = useDispatch();

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
          No Food Content Yet!!!!!!!
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
    <View style={styles._mainContainer}>
      <FlatList
        data={AllFood}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={renderEmptyContainer()}
        style={{
          height: WP(115),
          top: WP(-1),
          left: WP(2),
        }}
        renderItem={({item}) => (
          console.log(
            `https://babzbackend.herokuapp.com${item?.photo}`,
            'aaaaa',
          ),
          (
            <View style={{top: WP(6)}}>
              <ListItem bottomDivider>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DetailStack', {params: item})
                  }
                  style={
                    {
                      // backgroundColor: generateColor(),
                      // height: WP(10),
                      // width: WP(10),
                      // borderRadius: WP(10),
                      // marginVertical: WP(2),
                    }
                  }>
                  <Image
                    source={{
                      // uri: `https://babzbackend.herokuapp.com/${props.route?.params?.params?.photo}`,

                      uri: `https://babzbackend.herokuapp.com${item?.photo}`,
                    }}
                    style={{width: WP(25), height: HP(10)}}
                  />
                </TouchableOpacity>

                <>
                  <ListItem.Content>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('DetailStack', {params: item})
                      }>
                      <ListItem.Title
                        style={{
                          fontSize: WP(4),
                          color: 'black',
                          fontWeight: 'bold',
                          fontFamily: 'Montserrat-Medium',
                        }}>
                        {item?.foodname}
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
                    </TouchableOpacity>
                  </ListItem.Content>
                </>
                <ListItem.Subtitle
                  style={{
                    fontSize: WP(4),
                    color: generateColor(),
                    fontWeight: 'bold',
                    fontFamily: 'Montserrat-Light',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: 100,
                    }}>
                    {/* <TouchableOpacity onPress={() => showConfirmDialog(item?.id)}>
                <Text>Delete</Text>
              </TouchableOpacity> */}
                    {/* 
              <TouchableOpacity
                onPress={() => navigation.navigate('EditStack', {item})}>
                <Text>Edit</Text>
              </TouchableOpacity> */}
                  </View>
                </ListItem.Subtitle>
              </ListItem>
            </View>
          )
        )}
      />
    </View>
  );
};

export default OnlyFood;

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
