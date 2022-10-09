import React from 'react';
import {showMessage, hideMessage} from 'react-native-flash-message';
export const _showErrorMessage = (message, errorCode) => {
  if (errorCode == 'danger') {
    showMessage({
      message: message,
      type: 'danger',
      position: 'top',
    });
  } else if (errorCode == 'success') {
    showMessage({
      message: message,
      type: 'success',
      position: 'top',
    });
  } else {
  }
};
