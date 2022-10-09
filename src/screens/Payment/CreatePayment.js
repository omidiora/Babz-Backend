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
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {COLOR, WP, IMAGE} from '../../common/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import RNPickerSelect from 'react-native-picker-select';
import {getAllBankAction} from '../../redux/bank/action';
import {useDispatch, useSelector} from 'react-redux';
import FormCustomInput from '../../component/FormCustomInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormCustomButton from '../../component/FormCustomButton';
import {MakePaymentRequest} from '../../redux/transaction/action';
import Modal from 'react-native-modal';

import Validator from 'validatorjs';
 
const CreatePayment = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const payment_request = useSelector(
    state => state?.transaction?.success || false,
  );
  const [errors, setErrors] = useState({});

  const [isModalVisible, setIsModalVisible] = useState(payment_request);
  console.log(isModalVisible, 'isModalVisible');

  const [details, setDetails] = useState({
    price: '',
    email: '',
    desc: '',
    name: '',
  });
  const {price, email, desc, name} = details;

  const validationSchema = {
    price: 'required|min:1',
    name: 'required|min:3',
    email: 'required|email',

    // password_confirmation: 'required',
  };
  const onSubmit = () => {
    const validation = new Validator(details, validationSchema);
    if (validation.fails()) {
      setErrors(validation.errors);
      return;
    } else {
      dispatch(
        MakePaymentRequest({price, customer_email: email, details: desc, name}),
      );
    }
  };

  const handleInputChange = (inputName, inputValue) => {
    setDetails({
      ...details,
      [inputName]: inputValue,
    });
  };

  useEffect(() => {
    dispatch(getAllBankAction()); //
  }, [dispatch]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{paddingBottom: WP(100)}}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
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
          Request Payment
        </Text>

        <View></View>
      </View>

      <View>
        <Text
          style={{textAlign: 'center', top: WP(10), color: COLOR.primaryBrown}}>
          Send a payment link
        </Text>
      </View>

      {/* Request Payment form */}

      <View>
        <Text
          style={{
            position: 'absolute',
            top: WP(19),
            textAlign: 'center',
            alignSelf: 'center',
            fontSize: WP(4.5),
            opacity: 0.7,
          }}>
          Enter Amount
        </Text>
        <TextInput
          style={{
            width: WP(90),
            borderWidth: WP(0.1),
            alignSelf: 'center',
            top: WP(15),
            height: WP(28),
            textAlign: 'center',
            fontWeight: 'bold',
            color: COLOR.blackColor,
            fontSize: WP(8.5),
            borderColor: COLOR.iconBlue,
            paddingTop: WP(6),
          }}
          onChangeText={value => handleInputChange('price', value)}
        />
        <View>
          <Entypo name="check" size={15} color={COLOR.whiteColor} />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <FormCustomInput
          placeholder="Enter Your email"
          lablelText="Enter your email"
          labelTextTop={10}
          fontWeight={'300'}
          onChangeText={value => handleInputChange('email', value)}
        />

        <FormCustomInput
          placeholder="Enter the product name"
          lablelText="Product"
          labelTextTop={10}
          fontWeight={'300'}
          onChangeText={value => handleInputChange('name', value)}
        />
        <FormCustomInput
          placeholder="Enter your description"
          //   Optional Description
          lablelText="Optional Description"
          labelTextTop={10}
          fontWeight={'300'}
          onChangeText={value => handleInputChange('desc', value)}
        />

        {/* Error */}
        {Object.keys(errors).length > 0 && (
          <View style={{alignSelf: 'center', marginVertical: WP(3)}}>
            <Text style={styles.error}>{errors?.errors?.name}</Text>
            <Text style={styles.error}>{errors?.errors?.price}</Text>
            <Text style={styles.error}>{errors?.errors?.email}</Text>
            <Text style={styles.error}>{errors?.errors?.desc}</Text>
          </View>
        )}
        <FormCustomButton
          btnTitle="Request Money"
          backgroundColor={COLOR.mediumBlue}
          textColor={COLOR.whiteColor}
          onPress={() => onSubmit()}
        />
      </View>

      <Modal isVisible={isModalVisible}>
        <View style={styles._modalContainer}>
          <View style={styles._modal}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <Text
                style={{
                  fontWeight: '600',
                  fontFamily: 'Montserrat-Light',
                  textAlign: 'center',
                  color: COLOR.primaryBrown,
                  top: WP(10),
                }}>
                Your request has been sent successfuly
              </Text>

              <TouchableOpacity
                style={{left: WP(5)}}
                onPress={() => setIsModalVisible(false)}>
                <Entypo name="cross" size={30} />
              </TouchableOpacity>
            </View>
            <View style={{marginVertical: WP(4), top: WP(10)}}>
              <FormCustomButton
                backgroundColor={COLOR.mediumBlue}
                btnTitle="Continue"
                textColor={COLOR.whiteColor}
              />

              <View style={{marginVertical: WP(2)}}>
                <FormCustomButton
                  borderColor={COLOR.blackColor}
                  borderWidth={WP(0.1)}
                  btnTitle="Send Another"
                  textColor={COLOR.blackColor}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAwareScrollView>
  );
};

export default CreatePayment;

const styles = StyleSheet.create({
  buttonContainer: {
    width: WP(80),
    left: WP(6),
    top: WP(15),
    height: WP(17),
  },
  inputContainer: {
    width: WP(90),
    height: WP(50),
    top: WP(15),
    left: WP(4),
  },
  _modalContainer: {
    height: WP(58),
    width: WP(90),
    backgroundColor: COLOR.whiteColor,
    alignSelf: 'center',
    borderRadius: WP(4),
  },
  _modal: {
    alignSelf: 'center',
    top: WP(8),
  },
  error: {
    color: 'red',
  },
});
