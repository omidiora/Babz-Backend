import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {widthPercentageToDP as WP} from 'react-native-responsive-screen';

const CategorySelector = (data=[]) => {
  const [value, setValue] = useState('');
  const PickerSelector = () => (
    <View style={{borderWidth: 1, borderColor: '#2C9CFE', borderRadius: WP(4)}}>
      <RNPickerSelect 
     onValueChange={value => setValue(value)} items={data} />
    </View>
  );
  return {
    PickerSelector,
    value,
  };
};

export default CategorySelector;

const styles = StyleSheet.create({
  container: {},
});
