import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {COLOR, WP} from '../common/theme';
import Icon from 'react-native-vector-icons/Entypo';

const ProfileCustomInput = ({lablelText, value, onChangeText, showIcon=false, placeholder,keyboardType}) => {
  return (
    <View style={styles._mainContainer}>
      <Text style={styles._labelText}>{lablelText}</Text>
      <View>
        <TextInput
          style={styles._textInputStyle}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType = {keyboardType}
        />
      
      </View>
    </View>
  );
};

export default ProfileCustomInput;

const styles = StyleSheet.create({
  _mainContainer: {
    marginVertical: WP(3),
    bottom: WP(2),
  },
  _labelText: {
    paddingBottom: WP(4),
    fontWeight: '600',
    color: COLOR.blackColor,
    left: WP(1),
    top: WP(2)
  },
  _textInputStyle: {
    borderWidth: 0.8,
    padding: WP(5),
    borderColor: "#F0F5FA",
    borderRadius: WP(5),
    color: 'black',
    backgroundColor:'#F0F5FA'
  },
  _icon: {
    position: 'absolute',
    left: WP(75),
    top: WP(5),
    backgroundColor: COLOR.iconBlue,
    borderRadius: WP(5),
    padding: WP(1),
  },
  _icon2: {
    position: 'absolute',
    left: WP(75),
    top: WP(5),
    backgroundColor: COLOR.lightGrey,
    borderRadius: WP(5),
    padding: WP(1),
  },
});
