import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
// Entypo
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FormInput from '../../component/FormInput';
import {useDispatch, useSelector} from 'react-redux';

import {COLOR, IMAGE, WP} from '../../common/theme';
import AccountHoc from '../../hoc/AccountHoc';
import {DotIndicator} from 'react-native-indicators';
import {DrawerActions} from '@react-navigation/native';

import {AccountHook} from '../../hooks/AccountHook';
import {getUserAction, updateUserAction} from '../../redux/account/action';
import FormButton from '../../component/FormButton';
import FormCustomButton from '../../component/FormCustomButton';
import FormCustomInput from '../../component/FormCustomInput';
import {
  AddProductAction,
  getAllProductActionByPagination,
  getPaymentOption,
  setPaymentOption,
} from '../../redux/product/action';
import ProductCategoryHoc from '../../hoc/ProductHoc';
import CategorySelector from '../../component/CategorySelector';
import Modal from 'react-native-modal';
// var ImagePicker = require('react-native-image-picker');
import ImagePicker from 'react-native-image-crop-picker';

import {useNavigation} from '@react-navigation/native';

import {SwipeablePanel} from 'rn-swipeable-panel';
import {CheckBox} from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-community/async-storage';
import preferences from '../../utils/preferences';
import {BASE_URL} from '../../utils/ApiServices';

const AddProduct = props => {
  const navigation = useNavigation();
  const {productsCategory} = props;

  const [isModalVisible, setModalVisible] = useState(false);
  const [photo, setPhoto] = useState({});
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(null);

  const [open, setOpen] = useState(false);
  const [openDepositRate, setOpenDepositRate] = useState(false);
  const [openRepayment, setOpenRepayment] = useState(false);

  // Deposit Required
  const [rate, setRate] = useState(null);
  const [DepositRate, setDepositRate] = useState([{label: '5%', value: '5'}]);

  // Repayment Rate
  const [repayment, setRepayment] = useState(null);
  const [DepaymentRate, setRepaymentRate] = useState([
    {label: '5%', value: '5'},
  ]);

  // Max Durtion
  const [maxDurationCount, setMaxDurationCount] = useState('1');
  const [durationOPen, setOpenDuration] = useState(false);
  const [duration, setDuration] = useState(null);
  const [DurationRate, setDurationtRate] = useState([
    {label: 'Month', value: 'month'},
    {label: 'Weeks', value: 'Weeks'},
    {label: 'days', value: 'days'},
  ]);

  // Cancellation Fee
  const [cancelOPen, setCancelOpen] = useState(false);
  const [cancel, setCancel] = useState(null);
  const [cancelRate, setCancelRate] = useState([{label: '5%', value: '5'}]);
  const [cancelNote, setCancelNote] = useState('');

  const paymentOption = useSelector(
    state => state.product?.payment_option_product || {},
  );

  const payOPtion = [
    {
      label: 'Enjoy Later',
      id: paymentOption?.[0]?.id,
    },
    {
      label: 'Social Pay',
      id: paymentOption?.[1]?.id,
    },
    {
      label: 'Group pay',
      id: paymentOption?.[2]?.id,
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPaymentOption());
    dispatch(getAllProductActionByPagination(1));
  }, []);

  let initialState = {
    name: '',
    image: '',
    details: '',
    quantity: '',
    price: '',
  };

  const [product, setProduct] = useState(initialState);
  const [loading, setLoading] = useState(false);

  console.log(product, 'proudct');
  console.log(initialState, 'proudct');

  const clearState = Object.freeze(product);
  console.log(clearState, 'clear');

  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: true,
    showCloseButton: true,
    onlySmall: true,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
    // ...or any prop you want
  });
  const [isPanelActive, setIsPanelActive] = useState(false);

  const openPanel = () => {
    setIsPanelActive(true);
  };

  const closePanel = () => {
    setIsPanelActive(false);
  };

  const items = [
    {label: 'Football', value: 'football'},
    {label: 'Baseball', value: 'baseball'},
    {label: 'Hockey', value: 'hockey'},
  ];

  const productCategory = () => {
    return productsCategory?.data?.data.map(item => {
      return {
        value: item?.id,
        label: item?.name,
        ...item,
      };
    });
  };

  const handleInputChange = (inputName, inputValue) => {
    setProduct({
      ...product,
      [inputName]: inputValue,
    });
  };

  const {PickerSelector, value} = CategorySelector(productCategory());

  console.log(photo, 'photo');
  const onSubmit = async () => {
    setLoading(true);
    if (
      product?.name.length > 4 ||
      product?.details.length > 4 ||
      product?.price.length > 2 ||
      product?.quantity.length > 0 ||
      Object.keys(photo).length > 0
    ) {
      let form_data = new FormData();
      let photos = {
        uri: photo.path,
        type: photo.mime,
        name: photo?.modificationDate,
      };

      form_data.append('image', photos);
      form_data.append('name', product.name);
      form_data.append('details', product.details);
      form_data.append('price', product.price);
      form_data.append('quantity', product.quantity);
      form_data.append('category_id', value);
      const token = await AsyncStorage.getItem(preferences.KEYS.ACCESS_TOKEN);
      console.log(form_data);
      fetch(`${BASE_URL}/products`, {
        method: 'post',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'multipart/form-data',
        },

        body: form_data,
      })
        .then(response => {
          if (response.ok) {
            return response.json().then(item => {
              console.log(item, 'frm upload');
              if (check1 == true) {
                dispatch(
                  setPaymentOption({
                    payment_option_ids: [check2],
                    product_id: item.data?.id,
                    repayment_amount: 5,
                    is_repayment_amount_rate: true,
                    max_period_type: duration,
                    cancellation_note: cancelNote,
                    max_period_count: maxDurationCount,
                  }),
                );
              }
              setLoading(false);
              setModalVisible(true);
              setProduct(initialState);
             
            });
          }
        })
        .catch(err => {
          // setModalVisible(true);
          setLoading(false);
          
          // setLoading(false);
          // Alert.alert(err.response.data);
        });
    } else {
      Alert.alert('Kindly fill all the information');
    }
  };

  const onSetImages = type => {
    if (type == 'photo') {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
      }).then(image => {
        setPhoto(image);
        closePanel();
      });
    }

    if (type == 'camera') {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
      }).then(image => {
        setPhoto(image);
        closePanel();
      });
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
          style={{
            fontWeight: 'bold',
            fontSize: 24,
            color: COLOR.primaryBrown,
            alignSelf: 'center',
            textAlign: 'center',
            right: WP(35),
          }}>
          Add Product
        </Text>
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
      </View>
      {/*
       */}
      <View style={styles.text1}>
        <Text style={{textAlign: 'center'}}>Add new product to your store</Text>
      </View>

      {/* Form  */}

      <View style={styles.formContainer}>
        <ScrollView
          contentContainerStyle={{paddingBottom: WP(40)}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <FormCustomInput
            lablelText="Product name"
            onChangeText={value => handleInputChange('name', value)}
            showIcon={product?.name.length > 4 ? true : false}
          />

          <FormCustomInput
            lablelText="Product Description"
            onChangeText={value => handleInputChange('details', value)}
            showIcon={product?.details.length > 4 ? true : false}
          />

          <FormCustomInput
            lablelText="Product Price"
            onChangeText={value => handleInputChange('price', value)}
            showIcon={product?.price.length > 2 ? true : false}
            keyboardType="number-pad"
          />

          <View style={{marginVertical: WP(3)}}>
            <Text
              style={{
                color: COLOR.blackColor,
                fontWeight: 'bold',
                bottom: WP(2),
              }}>
              {'Product Category'}
            </Text>
            {PickerSelector(productsCategory?.data?.data)}
          </View>

          <FormCustomInput
            lablelText="Quantity"
            // value={person?.phone}
            onChangeText={value => handleInputChange('quantity', value)}
            showIcon={product?.quantity.length > 0 ? true : false}
          />

          <View>
            <Text style={styles.text4}>Add featured image</Text>
            <TouchableOpacity onPress={() => openPanel()}>
              {Object.keys(photo).length == 0 ? (
                <Image
                  source={IMAGE.blank}
                  style={{width: WP(20), height: WP(20), marginVertical: WP(4)}}
                />
              ) : (
                <Image
                  source={{uri: photo?.path}}
                  style={{width: WP(20), height: WP(20), marginVertical: WP(4)}}
                />
              )}
            </TouchableOpacity>
          </View>
          <View>
            <CheckBox
              title="Manage Payment Options"
              checked={check1}
              onPress={() => setCheck1(!check1)}
            />
          </View>

          <View>
            {check1 && (
              <>
                <View style={{flexDirection: 'row', width: WP(30)}}>
                  {payOPtion.map(data => (
                    <View key={data?.label}>
                      <CheckBox
                        title={data?.label}
                        checked={check2 == data?.id}
                        onPress={() => setCheck2(data?.id)}
                      />
                    </View>
                  ))}
                </View>

                <View style={{top: WP(10)}}>
                  <View style={{flexDirection: 'row'}}>
                    <View>
                      <Text
                        style={{
                          fontSize: WP(4),
                          color: '#171725',
                          fontWeight: '500',
                          fontFamily: 'Gilroy-Light',
                        }}>
                        Deposit Required
                      </Text>
                      <View style={{flexDirection: 'row', width: WP(13)}}>
                        <Text
                          style={{
                            borderWidth: 1,
                            borderColor: COLOR.lightGrey,
                            width: WP(20),
                            height: WP(12),
                            padding: WP(2),
                            textAlign: 'center',
                            fontSize: WP(5),
                            fontWeight: '600',
                            fontFamily: 'Gilroy-Light',
                            color: COLOR.primaryBrown,
                          }}>
                          Rate
                        </Text>

                        <View
                          style={{
                            width: WP(18),
                            height: WP(15),
                            left: WP(2),
                          }}>
                          <DropDownPicker
                            placeholder="%"
                            value={rate}
                            open={openDepositRate}
                            items={DepositRate}
                            setValue={setRate}
                            setOpen={setOpenDepositRate}
                            setItems={setDepositRate}

                            // setValue={setValue}
                            // setItems={setItems}
                          />
                        </View>
                      </View>
                    </View>

                    <View style={{left: WP(10)}}>
                      <Text
                        style={{
                          fontSize: WP(4.5),
                          color: '#171725',
                          fontWeight: '600',
                          fontFamily: 'Gilroy-Light',

                          color: COLOR.primaryBrown,
                        }}>
                        Repayment Rate
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={{
                            borderWidth: 1,
                            borderColor: COLOR.lightGrey,
                            width: WP(25),
                            height: WP(12),
                            padding: WP(2),
                            textAlign: 'center',
                            fontSize: WP(5),
                            fontWeight: '600',
                            fontFamily: 'Gilroy-Light',
                            color: COLOR.primaryBrown,
                          }}>
                          Rate
                        </Text>

                        <View
                          style={{
                            width: WP(18),
                            height: WP(15),
                            left: WP(3),
                          }}>
                          <DropDownPicker
                            placeholder="%"
                            value={repayment}
                            open={openRepayment}
                            items={DepositRate}
                            setValue={setRepayment}
                            setOpen={setOpenRepayment}
                            setItems={setRepaymentRate}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                {/* mAX DURATION */}

                <View style={{top: WP(10), marginVertical: WP(7)}}>
                  <View style={{flexDirection: 'row'}}>
                    <View>
                      <Text
                        style={{
                          fontSize: WP(4.5),
                          color: '#171725',

                          fontWeight: '600',
                          fontFamily: 'Gilroy-Light',
                        }}>
                        Max Duration Allowed
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        <TextInput
                          style={{
                            borderWidth: 1,
                            borderColor: COLOR.lightGrey,
                            width: WP(25),
                            height: WP(12),
                            padding: WP(2),
                            textAlign: 'center',
                            fontSize: WP(5),
                          }}
                          value={maxDurationCount}
                          onChangeText={value => setMaxDurationCount(value)}
                        />

                        <View
                          style={{
                            width: WP(17),
                            height: WP(15),
                            left: WP(3),
                          }}>
                          <DropDownPicker
                            placeholder="%"
                            value={duration}
                            open={durationOPen}
                            items={DurationRate}
                            setValue={setDuration}
                            setOpen={setOpenDuration}
                            setItems={setDurationtRate}
                            // setValue={setValue}
                            // setItems={setItems}
                          />
                        </View>
                      </View>
                    </View>

                    <View style={{left: WP(6)}}>
                      <Text
                        style={{
                          fontSize: WP(4.5),
                          color: '#171725',
                          fontWeight: '600',
                          fontFamily: 'Gilroy-Light',
                        }}>
                        Cancellation fee
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        <View
                          style={{
                            width: WP(15),
                            height: WP(15),
                            left: WP(3),
                          }}>
                          <DropDownPicker
                            placeholder="%"
                            value={cancel}
                            open={cancelOPen}
                            items={cancelRate}
                            setValue={setCancel}
                            setOpen={setCancelOpen}
                            setItems={setCancelRate}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    top: WP(2),

                    paddingBottom: WP(3),
                    marginVertical: WP(10),
                  }}>
                  <Text style={{color: COLOR.blackColor}}>
                    Cancellation Note
                  </Text>
                  <TextInput
                    multiline={true}
                    numberOfLines={5}
                    value={cancelNote}
                    onChangeText={e => setCancelNote(e)}
                    placeholder="Leave empty to use our default cancellationnote or enter new one."
                    style={{
                      borderWidth: 1,
                      borderColor: COLOR.lightGrey,
                      // width: WP(80),
                    }}
                  />
                </View>
              </>
            )}
          </View>

          <FormCustomButton
            backgroundColor={COLOR.mediumBlue}
            textColor={COLOR.whiteColor}
            //

            //
            btnTitle={
              loading ? (
                <ActivityIndicator size="small" color={COLOR.whiteColor} />
              ) : (
                ' Add product'
              )
            }
            onPress={() => onSubmit()}
            fontSize={WP(5)}
          />
        </ScrollView>

        {/* Modal */}
        <View>
          <Modal isVisible={isModalVisible}>
            <View style={styles._modalContainer}>
              <View style={styles._modal}>
                <Image
                  source={IMAGE.done_circle}
                  style={{width: WP(30), left: WP(12)}}
                />
                <View>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontFamily: 'Montserrat-Light',
                      textAlign: 'center',
                      color: COLOR.primaryBrown,
                    }}>
                    Product was successfully {'\n'}added to your store on
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontFamily: 'Montserrat-Black',
                        color: COLOR.primaryBrown,
                      }}>
                      {' '}
                      Odiopay
                    </Text>
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.modalBtn1}
                  onPress={() => navigation.navigate('ViewProduct')}>
                  <Text style={{textAlign: 'center', color: COLOR.whiteColor}}>
                    Continue
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.modalBtn1,
                    {
                      backgroundColor: COLOR.whiteColor,
                      color: COLOR.blackColor,
                      borderColor: COLOR.blackColor,
                      borderWidth: 1,
                      top: WP(8),
                    },
                  ]}
                  onPress={() => setModalVisible(false)}>
                  <Text style={{textAlign: 'center', color: COLOR.blackColor}}>
                    Add another item
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>

      <SwipeablePanel
        {...panelProps}
        isActive={isPanelActive}
        style={{backgroundColor: COLOR.mediumBlue, flex: 1}}>
        <View style={{top: WP(10), height: WP(90), alignSelf: 'center'}}>
          <Text style={{color: 'white', marginVertical: WP(3)}}>
            Select Photo
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: COLOR.whiteColor,
              padding: WP(5),
              width: WP(81),
              borderRadius: WP(2),
            }}
            onPress={() => onSetImages('camera')}>
            <Text tyle={{color: 'white'}}>Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: COLOR.whiteColor,
              padding: WP(5),
              width: WP(81),
              borderRadius: WP(2),
              top: WP(3),
            }}
            onPress={() => onSetImages('photo')}>
            <Text tyle={{color: 'white'}}>Photo Gallery</Text>
          </TouchableOpacity>
        </View>
        {/* Your Content Here */}
      </SwipeablePanel>
    </View>
  );
};

export default ProductCategoryHoc(AddProduct);

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
  product_codeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  _modalContainer: {
    height: WP(88),
    width: WP(90),
    backgroundColor: COLOR.whiteColor,
    alignSelf: 'center',
    borderRadius: WP(4),
  },
  _modal: {
    alignSelf: 'center',
    top: WP(8),
  },
  modalBtn1: {
    backgroundColor: COLOR.primaryBlue,
    padding: WP(3),
    borderRadius: WP(5),
    top: WP(5),
  },
  text4: {
    paddingBottom: WP(1),
    fontWeight: '600',
    color: COLOR.blackColor,
    left: WP(1),
  },
});
