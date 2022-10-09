import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  BackHandler,
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
import {getAllIndustryAction} from '../../redux/industry/action';
import RNPickerSelect from 'react-native-picker-select';
import ProductCategoryHoc from '../../hoc/ProductHoc';
import CategorySelector from '../../component/CategorySelector';
import {useNavigation} from '@react-navigation/native';
import Validator from 'validatorjs';
import {CreateStoreAction} from '../../redux/store/action';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const CreateStore = props => {
  const {productsCategory = [{}]} = props;
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();
  const [details, setDetails] = useState({});
  const {data = [], loading} = useSelector(state => state.industry);
  // msg
  const item = useSelector(state => state);

  const dispatch = useDispatch();
  const [storeItem, setStoreItem] = useState({
    name: '',
    descripton: '',
    category: '',
    industry: '',
  });


  const validationSchema = {
    name: 'required|min:3',
    descripton: 'required|min:6',
    category: 'required',
    industry: 'required',

    // password_confirmation: 'required',
  };

  const productCategory = () => {
    return productsCategory?.data?.data.map(item => {
      return {
        value: item?.id,
        label: item?.name,
        ...item,
      };
    });
  };

  useEffect(() => {
    dispatch(getAllIndustryAction());
    setStoreItem({});
  }, []);

  useEffect(() => {
    function handleBackButton() {
      navigation.navigate('Sidebar', {
        screen: 'BusinessStack',
      });
      return true;
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );

    return () => backHandler.remove();
  }, [navigation]);

  const industryData = () => {
    return data.map(item => {
      return {
        id: item?.id,
        value: item?.id.toString(),
        label: item?.name,
        ...item,
      };
    });
  };

  const handleInputChange = (inputName, inputValue) => {
    setStoreItem({
      ...storeItem,
      [inputName]: inputValue,
    });
  };

  const onSubmit = () => {
    const validation = new Validator(storeItem, validationSchema);
    if (validation.fails()) {
      setErrors(validation.errors);
      return;
    } else {
      dispatch(CreateStoreAction(storeItem, navigation));
    }
  };

  if (productCategory() == undefined) {
    return <DotIndicator color={COLOR.primaryBlue} />;
  }
  return (
    <KeyboardAwareScrollView
      style={styles._mainContainer}
      resetScrollToCoords={{x: 0, y: 0}}
      contentContainerStyle={{paddingBottom: WP(20)}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          top: WP(2),
        }}>
        <TouchableOpacity
          style={{left: WP(3)}}
          onPress={() =>
            navigation.navigate('Sidebar', {
              screen: 'BusinessStack',
            })
          }>
          <Icon name="arrow-back" size={22} color={COLOR.primaryBrown} />
        </TouchableOpacity>
        <Text
          style={{fontWeight: 'bold', fontSize: 24, color: COLOR.primaryBrown}}>
          Create a store
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
        <Text style={{textAlign: 'center'}}>
          Setup your store in the marketplace
        </Text>
      </View>

      {/* Form  */}

      <View style={styles.formContainer}>
        <View>
          <FormCustomInput
            lablelText="Store Name"
            onChangeText={value => handleInputChange('name', value)}
            showIcon={storeItem?.name?.length >= 5 ? true : false}
          />
          <FormCustomInput
            lablelText="Store descripton"
            onChangeText={value => handleInputChange('descripton', value)}
            showIcon={storeItem?.descripton?.length >= 5 ? true : false}
          />

          <Text
            style={{
              color: COLOR.blackColor,
              top: WP(5),
              fontWeight: 'bold',
            }}>
            Select Cateogry
          </Text>
          <View
            style={{
              borderWidth: 1,
              padding: WP(2),
              borderColor: COLOR.primaryBlue,
              borderRadius: WP(5),
              color: 'black',
              marginVertical: WP(7),
              height: WP(16),
            }}>
            <RNPickerSelect
              onValueChange={value => handleInputChange('category', value)}
              items={productCategory()}
              placeholder="Select Category"
            />
          </View>

          <Text
            style={{
              color: COLOR.blackColor,
              top: WP(5),
              fontWeight: 'bold',
            }}>
            Select sector
          </Text>
          <View
            style={{
              borderWidth: 1,
              padding: WP(2),
              borderColor: COLOR.primaryBlue,
              borderRadius: WP(5),
              color: 'black',
              marginVertical: WP(7),
              height: WP(16),
            }}>
            <RNPickerSelect
              onValueChange={value => handleInputChange('industry', value)}
              items={industryData()}
              placeholder="Select Sector"
            />
          </View>
          {/* errors */}

          {Object.keys(errors)?.length > 0 && (
            <>
              <View style={{alignSelf: 'center'}}>
                <Text style={styles.errorMessage}>{errors?.errors?.name}</Text>
                <Text style={styles.errorMessage}>
                  {errors?.errors?.descripton}
                </Text>
                <Text style={styles.errorMessage}>
                  {errors?.errors?.category}
                </Text>
                <Text style={styles.errorMessage}>
                  {errors?.errors?.industry}
                </Text>
              </View>
            </>
          )}
          <View>
            <FormCustomButton
              backgroundColor={COLOR.mediumBlue}
              textColor={COLOR.whiteColor}
              btnTitle={'Create Store'}
              onPress={() => onSubmit()}
              fontSize={WP(5)}
            />
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ProductCategoryHoc(CreateStore);

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
  errorMessage: {
    color: 'red',
  },
});
