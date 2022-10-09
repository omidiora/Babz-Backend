import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';

import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import RootNavigator from './src/navigation/root';
import {store} from './src/redux/store';
import {COLOR} from './src/common/theme';
import FlashMessage from 'react-native-flash-message';
import {MenuProvider} from 'react-native-popup-menu';

const App = () => {
  return (
    <SafeAreaProvider>
      <MenuProvider>
        <Provider store={store}>
          <RootNavigator />
          <FlashMessage
            position="bottom"
           
          />
        </Provider>
      </MenuProvider>
    </SafeAreaProvider>
  );
};

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
