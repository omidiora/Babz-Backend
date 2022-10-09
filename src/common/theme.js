import React from 'react';
import {Platform, Dimensions} from 'react-native';

import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

export const APP_NAME = 'Odiopay';
export const PLATFORM = Platform.OS;
export const WP = widthPercentageToDP;
export const HP = heightPercentageToDP;
export const MOBILE_WIDTH = Dimensions.get('window').width;
export const MOBILE_HEIGHT = Dimensions.get('window').height;
export const RADIUS = 3;
export const SPACING = 12;
export const SPINNER_SIZE = 32;
export const BUTTON_HEIGHT = 5;
export const INPUT_HEIGHT = 6;
export const SCREEN_ICON_SIZE = 6;
export const HOME_TAB_ICON_SIZE = 6;
export const TAB_ICON_SIZE = 6;
export const onbording_title_fontsize = WP(9.3);

export const light = {
  name: 'light',

  background: '#FDFDFD',
  inputBackground: '#00000011',
  messageLeftBackground: '#F6F6F7',
  messageRightBackground: '#E7D6F1',

  text: 'black',
  textSecondry: '#00000033',
  textPlaceholder: '#00000055',
  purple: '#9D00FF',
  primary: 'black',
  card: '#FFFFFF',
  border: '#F2F2F2',
  notification: 'grey',
};
export const dark = {
  name: 'dark',

  background: '#242225',
  inputBackground: '#ffffff11',
  messageLeftBackground: '#2E2C30',
  messageRightBackground: '#4A4050',

  text: 'white',
  textSecondry: '#ffffff44',
  textPlaceholder: '#ffffff66',

  purple: '#9D00FF',

  primary: 'white',

  card: '#3D3B3E',
  border: '#4D4B4D',
  notification: 'grey',
};

export const COLOR = {
  deepBlue: '#02065e',
  iconBlue: '#00B3F3',
  primaryellow:"#FEB756",
  primaryGreen: '#00C89C',
  redColor:"#FF0000",
  blackColor: '#171725',
  secondaryGreen: '#07C86B',
  whiteColor: '#ffffff',
  lightBlue: '#ECF0F4',
  extraBlue: '#F6F8FA;',
  primaryBrown: '#666666',
  primary: '#2C9CFE',
  mediumBlue: '#0062FF',
  primaryOrange: '#2C9CFE',
  primaryBlue: '#2C9CFE',
  offWhite: '#E5E5E5',
  extraOffWhite: '#E2E2EA',
  offBlack: '#78746D',
  borderColor: 'gray',
  lightGrey: '#BEBAB3',
  headerBlack: '#3C3A36',
  setup2: '#E3DDDD',
  offblue: '#F3F8FF',
  Blue2: '#2D9CDB',
  inputbackColor: '#F3F3F3',
  grey: '#708097',
  brown: '#50555C',
  line: '#E1E4E8',
  secondaryWhite: '#f4f4f4',
  
};

export const IMAGE = {
  homeIcon: require('../assets/image/home.png'),
  intro_1: require('../assets/image/circleImage.png'),
  back: require('../assets/image/cam.png'),
  accountHeader: require('../assets/image/shape.png'),
  done: require('../assets/image/done.png'),
  homeIconSmall: require('../assets/image/homeSmall.png'),
  bgHome: require('../assets/image/bg.png'),
  detailImage: require('../assets/image/image1.png'),
  profile2: require('../assets/image/profile2.png'),
  upload: require('../assets/image/upload.png'),
  card: require('../assets/image/card.png'),
  marketplace: require('../assets/image/marketplace.png'),
  bag: require('../assets/image/bag.png'),
  receipt: require('../assets/image/receipt.png'),
  done_circle: require('../assets/image/Done-Circle.png'),
  ruler: require('../assets/image/ruler.png'),
  blank: require('../assets/image/blank.png'),
  danger: require('../assets/image/danger.png'),
  income: require('../assets/image/income.png'),
  bucket: require('../assets/image/bucket.png'),
  intro_1: require('../assets/image/intro_1.png'),
  intro_2: require('../assets/image/intro_2.png'),
  intro_3: require('../assets/image/intro_3.png'),
  intro_4: require('../assets/image/intro_4.png'),
  back: require('../assets/image/back.jpg'),
};

export const symbols = {
  NAIRA: '\u20A6',
};
export const FONT = {
  bold: 'Montserrat-Bold',
  medium: 'Montserrat-Medium',
  light: 'Montserrat-Light',
};

export const FONT_SIZES = {
  h1: 28,
  h2: 22,
  h3: 18,
  info_1: 16,
  info_2: 14,
};

//FONT SIZES USED IN APP
export const TEXT_SIZES = {
  h1: 7,
  h2: 6,
  h3: 5,
  info_1: 4,
  info_2: 3.5,
};

export const SPACING_PERCENT = 5;

export const ONBOARD_DATA = [
  {
    intro_backgroundimage: IMAGE.back,
    intro_image: IMAGE.intro_1,
    title: 'Food Item',
    subTitle: 'upfront',
    subject: `Give your users ${'\n'} the freedom to check for nigeria food.`,
   btn: 'Skip',
  },
  {
    intro_backgroundimage: IMAGE.back,
    intro_image: IMAGE.intro_2,
    title: 'Grow your',
    subTitle: 'taste',
    subject: `Gives user different ${'\n'}  food option.`,
    btn: 'Skip',
  },
  {
    intro_backgroundimage: IMAGE.back,
    intro_image: IMAGE.intro_3,
    title: 'Offer Food Menu Details',
    subTitle: ' ',
    subject: `Offers option to cook nigeria food`,
    btn: 'Skip',
  },
  {
    intro_backgroundimage: IMAGE.back,
    intro_image: IMAGE.intro_4,
    title: 'App',
    subTitle: 'Designed',
    subject: `Designed and developed by Babalola Hammed`,
    btn: 'Continue',
  },
];
