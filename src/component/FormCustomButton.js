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
const FormCustomButton = ({
  textColor,
  backgroundColor,
  fontWeight,
  btnTitle,
  onPress,
  disabled,
  fontSize,
  borderWidth,
  borderColor,
  padding=0
}) => {
  return (
    <React.Fragment>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: backgroundColor,
          padding: WP(3 + padding),
          borderRadius: WP(3),
          borderWidth: borderWidth,
          borderColor:borderColor
        }}
        disabled={disabled}>
        <Text
          style={{
            fontSize: fontSize,
            color: textColor,
            textAlign: 'center',
            fontWeight: fontWeight,
            
          }}>
          {btnTitle}
        </Text>
      </TouchableOpacity>
    </React.Fragment>
  );
};

export default FormCustomButton;

const styles = StyleSheet.create({});
