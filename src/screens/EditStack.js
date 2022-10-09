import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FormInput from '../component/FormInput';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {COLOR, WP} from '../common/theme';
import {useDispatch, useSelector} from 'react-redux';
import {CreateStoreAction} from '../redux/store/action';
import ImagePicker from 'react-native-image-crop-picker';
import FormButton from '../component/FormButton';
import {BASE_URL} from '../utils/ApiServices';
import AsyncStorage from '@react-native-community/async-storage';
import preferences from '../utils/preferences';

const EditStack = ({navigation, route}) => {
  console.log(route?.params?.item, 'mnkankknk');
  const richText = React.useRef();
  const dispatch = useDispatch();
  const [values, setValues] = React.useState({
    name: JSON.stringify(route?.params?.item.name),
    description: JSON.stringify(route?.params?.item.description),
  });

  console.log(values.name, '3333333');

  console.log(`${BASE_URL}/upload`, '${BASE_URL}/upload${BASE_URL}/upload');
  const [itemize, setItemize] = React.useState(
    JSON.stringify(route?.params?.item.itemize),
  );
  const [photos, setPhoto] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleInputChange = (inputName, inputValue) => {
    setValues({
      ...values,
      [inputName]: inputValue,
    });
  };

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

  const onSubmit = async () => {
    setLoading(true);
    if (
      (values.name == '',
      values.description == '' || itemize == '',
      photos == '')
    ) {
      setLoading(false);
      Alert.alert('Fill all the form');
      return;
    } else {
      const formData = new FormData();
      let file = {
        name:
          photos?.modificationDate +
          photos.path.substring(photos.path.lastIndexOf('.')),
        uri: photos.path,
        type: photos?.mime,
      };
      console.log(file, 'dlmnadknkankndnkn');

      formData.append('foodname', values.name);
      formData.append('description', values.description);
      formData.append('itemize', itemize);
      formData.append('photo', file);
      setLoading(false);
      const token = await AsyncStorage.getItem(preferences.KEYS.ACCESS_TOKEN);
      fetch('https://babzbackend.herokuapp.com/upload', {
        method: 'PUT',

        headers: {
          Authorization: 'Token ' + token,
        },
        body: formData,
      })
        .then(res => {
          setLoading(true);
          if (res.status == '201') {
            navigation.goBack();
            Alert.alert('Food Item Uploaded Successfully');
            setLoading(false);
          }
          console.log(res.status);
        })
        .catch(error => {
          Alert.alert('Something went wrong');
          setLoading(false);
        });
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
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 165}}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <View style={styles.subContainer}>
        <FormInput
          onChangeText={value => handleInputChange('name', value)}
          placeholder="Name"
          value={values.foodname}
        />
        <FormInput
          onChangeText={value => handleInputChange('description', value)}
          placeholder="Description"
          value={values.description}
        />

        <View>
          <Text style={{top: 89, color: 'blue', textAlign: 'center'}}>
            {photos?.path}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: COLOR.whiteColor,
              padding: 5,
              width: 350,
              borderRadius: 2,
              marginVertical: 40,
              borderWidth: 1,
              padding: 20,
              borderRadius: 10,
              borderColor: COLOR.primaryBlue,
              bottom: WP(12),
            }}
            onPress={() => onSetImages('photo')}>
            <Text tyle={{color: 'white'}}>Click to Select Photos</Text>
          </TouchableOpacity>
        </View>
        <RichEditor
          ref={richText}
          onChange={text => {
            setItemize(text);
          }}
          value={1}
          initialHeight={200}
          style={{
            borderColor: COLOR.primaryBlue,
            borderWidth: 1,
            padding: 15,
            borderRadius: 10,
          }}
        />

        <RichToolbar
          editor={richText}
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.insertBulletsList,
            actions.insertOrderedList,

            'customAction',
          ]}
          iconMap={{
            [actions.heading1]: ({tintColor}) => (
              <Text style={[{color: tintColor}]}>H1</Text>
            ),
          }}
        />
      </View>
      <View style={{width: WP(80), top: WP(8), alignSelf: 'center'}}>
        <FormButton
          btnTitle={
            loading ? (
              <ActivityIndicator size="small" color={COLOR.whiteColor} />
            ) : (
              'UPDATE'
            )
          }
          backgroundColor={COLOR.primary}
          textColor={COLOR.whiteColor}
          fontWeight={'bold'}
          onPress={() => onSubmit()}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default EditStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white',
    paddingBottom: 160,
  },
  subContainer: {
    width: '90%',
    alignSelf: 'center',
  },
});
