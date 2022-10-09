import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
    COLOR,
    IMAGE,
    TEXT_SIZES,
    MOBILE_WIDTH,
    SPACING_PERCENT,
    WP,
    HP,
    APP_NAME,
    RADIUS,
    TAB_ICON_SIZE,
    FONT_SIZES,
    FONT,
  } from '../common/theme';
const FormButton = ({textColor,backgroundColor,fontWeight ,btnTitle, onPress ,disabled}) => {
  return (
    <React.Fragment>
      <TouchableOpacity onPress={onPress} style={{backgroundColor: backgroundColor,padding:WP(3),borderRadius:WP(3)}} disabled={disabled}>
        <Text style={{fontSize: 30, color: textColor,textAlign:'center',fontWeight:fontWeight}}>{btnTitle}</Text>
      </TouchableOpacity>
    </React.Fragment>
  );
};

export default FormButton;

const styles = StyleSheet.create({});
