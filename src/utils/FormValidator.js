import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Validator from 'validatorjs';

const FormValidator = (data={}, rules,) => {
  let validation = new Validator(data, rules);

  return {
    validation,
  };
};

export default FormValidator;

