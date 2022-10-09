import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {WP, HP, FONT, COLOR, IMAGE} from '../../common/theme';
import FormInput from '../../component/FormInput';
import FormButton from '../../component/FormButton';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../../redux/auth/action';


const Success_1 = ({labelTitle, headerTitle, navigation}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const register_loading = useSelector(state => state?.auth);
  

  return (
    <View style={styles._mainContainer}>
      <View style={styles.container}>
        <View style={styles._headerContainer}>
          <Text style={styles._text}>Welcome</Text>
          <Text style={styles._text1}>
            {`Your email has been verified successfully. ${'\n'}Follow the next steps to setup your store.`}
          </Text>
        </View>
        <View style={styles._imageContainer}>
          <Image source={IMAGE.done} />
        </View>
      </View>
      <View style={styles.formContainer}>
        <FormButton
        onPress={() => navigation.navigate('Sidebar',{
          screen:"BusinessStack"
        })}
          btnTitle="Continue"
          backgroundColor={'#0062FF'}
          textColor={COLOR.whiteColor}
        />
      </View>
    </View>
  );
};

export default Success_1;

const styles = StyleSheet.create({
  _mainContainer: {
    flex: 1,
    backgroundColor: COLOR.whiteColor,
  },
  container: {
    left: WP(10),
    top: WP(10),
  },

  _text: {
    fontWeight: 'bold',
    fontFamily: FONT.bold,
    fontSize: WP(6),
    paddingBottom: WP(2),
    top: WP(4),
    color:COLOR.primaryBrown
  },
  _text1: {
    top: WP(6),
    color:COLOR.primaryBrown
  },
  _imageContainer: {
    top: WP(20),
  },
  formContainer: {
    alignSelf: 'center',
    top: WP(45),
    width: WP(90),
    height: WP(20)
  },
});
