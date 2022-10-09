import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import {COLOR, WP} from '../common/theme';
import Icon from 'react-native-vector-icons/Entypo';

const PasswordInput = ({lablelText, value, onChangeText, secureTextEntry}) => {
  const [showPassword, setShowPassword] = React.useState(true);
  const _toggleIcon = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };
  return (
    <View style={styles._mainContainer}>
      <Text style={styles._labelText}>{lablelText}</Text>
      <View>
        <TextInput
          style={styles._textInputStyle}
          secureTextEntry={showPassword}
          onChangeText={onChangeText}
        />
        {/* _toggleIcon */}
        <TouchableOpacity style={styles._icon} onPress={() => _toggleIcon()}>
          <Icon
            name={showPassword ? 'eye-with-line' : 'eye'}
            size={15}
            color={COLOR.whiteColor}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PasswordInput;

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
  },
  _textInputStyle: {
    borderWidth: 0.8,
    padding: WP(5),
    borderColor: COLOR.primaryBlue,
    borderRadius: WP(5),
    color: 'black',
  },
  _icon: {
    position: 'absolute',
    left: WP(75),
    top: WP(5),
    backgroundColor: COLOR.iconBlue,
    borderRadius: WP(5),
    padding: WP(1),
  },
});
