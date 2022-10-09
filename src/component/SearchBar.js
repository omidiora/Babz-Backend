import React from 'react';
import {StyleSheet, TextInput, View, Keyboard, Button} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {COLOR, WP} from '../common/theme';

const SearchBar = ({clicked, searchPhrase, setSearchPhrase, setClicked}) => {
  return (
    <View style={styles.container}>
      <View
        style={
          clicked ? styles.searchBar__unclicked : styles.searchBar__unclicked
        }>
        {/* search Icon */}
        <Feather
          name="search"
          size={20}
          color="black"
          style={{marginLeft: 1}}
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {clicked && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={{padding: 1}}
            onPress={() => {
              setSearchPhrase('');
            }}
          />
        )}
      </View>
      {/* cancel button, depending on whether the search bar is clicked or not */}
     
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
  },
  searchBar__unclicked: {
    flexDirection: 'row',
    backgroundColor: COLOR.whiteColor,
    borderRadius: 15,
    alignItems: 'center',
    width: WP(63),
    height: WP(10),
    padding: WP(2),
    borderWidth:1,
    borderColor:COLOR.extraOffWhite,
    
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: 'row',
    width: '80%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: '90%',
    color: COLOR.blackColor,
    height:WP("100%")
  },
});
