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
  getAllProductCategoryAction,
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

const EditProduct = props => {
  const navigation = useNavigation();
  const {productsCategory} = props;
  const {
    route: {params},
  } = props;

  const [isModalVisible, setModalVisible] = useState(false);
  const [photo, setPhoto] = useState({});

  const product_category = useSelector(
    state => state.product?.data?.data || [],
  );
  console.log(params?.user, 'product_category');

  useEffect(() => {
    dispatch(getAllProductCategoryAction());
  }, [dispatch]);

  const [open, setOpen] = useState(false);
  const [values, setValue] = useState(null);
  const [item, setItems] = useState(product_category);
  console.log(item);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPaymentOption());
    dispatch(getAllProductActionByPagination(1));
  }, []);

  const [product, setProduct] = useState(params.user);

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

  const handleInputChange = (inputName, inputValue) => {
    setProduct({
      ...product,
      [inputName]: inputValue,
    });
  };

  console.log(product?.merchant?.category_id, 'product?.merchant?.category_id');
  const onSubmit = async () => {
    if (
      product?.name?.length > 4 ||
      product?.details?.length > 4 ||
      product?.price?.length > 2 ||
      product?.quantity.length > 0
    ) {
      let form_data = new FormData();
      const token = await AsyncStorage.getItem(preferences.KEYS.ACCESS_TOKEN);

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
      form_data.append('product_id', product?.id);

      await fetch(`${BASE_URL}products/update`, {
        method: 'post',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'multipart/form-data',
        },

        body: form_data,
      })
        .then(response => {
          response.json().then(item => {
            console.log(item, 'item');
          });
        })
        .catch(err => {
          console.log(err, 'response');
          // setLoading(false);
          // Alert.alert(err.response.data);
        });
    }
    else{
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
        setModalVisible(false);
      });
    }

    if (type == 'camera') {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
      }).then(image => {
        setPhoto(image);
        setModalVisible(false);
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
          style={{fontWeight: 'bold', fontSize: 24, color: COLOR.primaryBrown}}>
          Update Product
        </Text>
        <TouchableOpacity
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
        </TouchableOpacity>
      </View>
      {/*
       */}
      <View style={styles.text1}>
        <Text style={{textAlign: 'center'}}>Update product in your store</Text>
      </View>

      {/* Form  */}

      <View style={styles.formContainer}>
        <ScrollView
          contentContainerStyle={{paddingBottom: WP(40)}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <FormCustomInput
            lablelText="Product name"
            value={product?.name}
            onChangeText={value => handleInputChange('name', value)}
            showIcon={product?.name?.length > 4 ? true : false}
          />

          <FormCustomInput
            lablelText="Product Description"
            value={product?.details}
            onChangeText={value => handleInputChange('details', value)}
            showIcon={product?.details?.length > 4 ? true : false}
          />

          <FormCustomInput
            lablelText="Product Price"
            value={product?.price?.toString()}
            onChangeText={value => handleInputChange('price', value)}
            showIcon={product?.price?.length > 2 ? true : false}
            keyboardType="number-pad"
          />

          <FormCustomInput
            lablelText="Quantity"
            value={product?.quantity?.toString()}
            onChangeText={value => handleInputChange('quantity', value)}
            showIcon={product?.quantity.length > 0 ? true : false}
          />

          <View>
            <Text style={styles.text4}>Add featured image</Text>
            <TouchableOpacity onPress={() => openPanel()}>
              <Image
                source={product.image ? {uri: product?.image} : IMAGE.blank}
                style={{width: WP(20), height: WP(20), marginVertical: WP(4)}}
              />
            </TouchableOpacity>
          </View>

          <FormCustomButton
            backgroundColor={COLOR.mediumBlue}
            textColor={COLOR.whiteColor}
            btnTitle={'Update product'}
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

export default EditProduct;

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
