import React from 'react';
import {StatusBar} from 'react-native';

const AppBar = ({type, backgroundColor, hidden}) => {
  return (
    <StatusBar
      barStyle={type == 'light' ? 'light-content' : 'dark-content'}
      backgroundColor={backgroundColor}
      hidden={hidden}
    />
  );
};

export default AppBar;
