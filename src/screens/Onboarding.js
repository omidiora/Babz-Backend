import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  StatusBar,
} from 'react-native';

// import { _gotoAuthStack } from '../../navigation/NavigationService';
import {
  COLOR,
  TEXT_SIZES,
  MOBILE_WIDTH,
  ONBOARD_DATA,
  SPACING_PERCENT,
  WP,
  HP,
  RADIUS,
  onbording_title_fontsize,
} from '../common/theme';
import AppBar from '../component/AppBar';
import preferences from '../utils/preferences';

const Onboarding = props => {
  const {navigation} = props;
  const flatListRef = useRef();
  const scrollX = useRef(new Animated.Value(0)).current;
  let position = Animated.divide(scrollX, MOBILE_WIDTH + SPACING_PERCENT * 2);
  const [scrolloffset, setscrolloffset] = useState(0);
  console.log(scrolloffset, 'scrool');

  //On Skip Click
  const _onNextClick = () => {
    if (scrolloffset !== 3) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: scrolloffset + 1,
      });
      setscrolloffset(scrolloffset + 1);
    } else {
    }
  };

  const _onSkipClick = () => {
    preferences._setItem('onboarding', '1');
    navigation.replace('Sidebar');
  };

  return (
    <View style={Styles._mainContainer}>
      <AppBar type={'light'} backgroundColor={COLOR.deepBlue} hidden={false} />

      <Animated.FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={true}
        scrollEventThrottle={16}
        decelerationRate={'fast'}
        snapToInterval={WP('100%')}
        ref={flatListRef}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        style={{flexGrow: 0}}
        contentContainerStyle={Styles._scrollContainer}
        data={ONBOARD_DATA}
        keyExtractor={(item, index) => 'Onboarding-item' + index.toString()}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * WP('100%'),
            index * WP('100%'),
            (index + 1) * WP('100%'),
          ];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [WP('100%'), 0, -WP('100%')],
          });

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
          });

          return (
            <View style={Styles._itemContainer}>
              {/* <Animated.Image source={item.intro_backgroundimage} style={[Styles._image,]} /> */}
              <Image source={item.intro_image} style={Styles.inner_image} />
              <View style={Styles.TitleContainer}>
                {/* <Text style={[Styles._title]} >{item.title}</Text> */}
                <Animated.Text
                  style={[Styles._title, {transform: [{translateX}]}]}>
                  {item.title}
                </Animated.Text>
                <Animated.Text
                  style={[Styles._subTitle, {transform: [{translateX}]}]}>
                  {item.subTitle}
                </Animated.Text>

                <View style={Styles._subjectContainer}>
                  <Animated.Text
                    style={[Styles._subject, {transform: [{translateX}]}]}>
                    {item.subject}
                  </Animated.Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    _onSkipClick();
                  }}
                  style={Styles._nextBtn}>
                  <Text style={Styles._nextText}>{item.btn}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />

      {/* Rendering Dots */}
      <View style={Styles._dotsView}>
        {ONBOARD_DATA.map((_, i) => {
          var color = position.interpolate({
            inputRange: [i - 1, i, i + 1, i + 2],
            outputRange: [
              COLOR.primaryBlue,
              COLOR.primaryBlue,
              COLOR.primaryBlue,
              COLOR.primaryBlue,
            ],
            extrapolate: 'clamp',
          });
          let opacity = position.interpolate({
            inputRange: [i - 1, i, i + 1], // each dot will need to have an opacity of 1 when position is equal to their index (i)
            outputRange: [0.3, 1, 0.3], // when position is not i, the opacity of the dot will animate to 0.3
            extrapolate: 'clamp', // this will prevent the opacity of the dots from going outside of the outputRange (i.e. opacity will not be less than 0.3)
          });

          let width = position.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [10, 35, 10],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={i}
              style={{
                opacity: opacity,
                height: 10,
                width: 10,
                backgroundColor: color,

                margin: WP(SPACING_PERCENT / 2),
                borderRadius: WP(RADIUS),
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Onboarding;

const Styles = StyleSheet.create({
  _mainContainer: {
    flex: 1,
    backgroundColor: COLOR.deepBlue,
    // primaryBlue
  },
  _skipBtn: {
    position: 'absolute',
    bottom: WP(SPACING_PERCENT * 2 + 1.5),
    left: WP(SPACING_PERCENT),
    zIndex: 1,
  },
  _skipText: {
    // fontFamily: FONT,
    fontSize: WP(TEXT_SIZES.info_2),
    // fontWeight: 'bold',
    // textTransform: 'uppercase',
    color: COLOR.offBlack,
  },
  _nextBtn: {
    position: 'absolute',
    top: HP(79),
    //  right: WP(SPACING_PERCENT),
    zIndex: 1,
    backgroundColor: COLOR.deepBlue,
    padding: WP('4%'),
    paddingHorizontal: WP('9.5%'),
    borderRadius: WP('12'),
    borderWidth: 0.4,
    borderColor: COLOR.whiteColor,
    alignSelf: 'center',
  },
  _nextText: {
    fontSize: WP('3'),
    color: COLOR.whiteColor,
  },
  _scrollContainer: {},
  _itemContainer: {
    width: WP('100%'),
    height: HP('100%'),
    // padding: WP(SPACING_PERCENT),
    // justifyContent: 'center',
  },
  _image: {
    width: WP('100%'),
    height: HP('100%'),
    resizeMode: 'stretch',
    alignSelf: 'center',
  },
  TitleContainer: {
    position: 'absolute',
    padding: WP(SPACING_PERCENT),
    marginTop: HP(SPACING_PERCENT),
    width: WP('100%'),
    alignItems: 'center',
  },
  _title: {
    // fontFamily: FONT,
    fontSize: onbording_title_fontsize,
    textAlign: 'center',
    color: COLOR.whiteColor,
    top: HP(42),
    fontWeight: '500',
    position: 'relative',
    fontFamily: 'Montserrat-Bold',
  },
  _subTitle: {
    // fontFamily: FONT,
    fontSize: onbording_title_fontsize,
    textAlign: 'center',
    color: COLOR.primaryellow,
    top: HP(42),
    fontWeight: 'bold',
    position: 'relative',
  },
  _subjectContainer: {},
  _subject: {
    fontSize: 16,
    textAlign: 'center',
    color: COLOR.whiteColor,
    top: HP(48),
    // fontWeight: "bold",
    position: 'relative',
    lineHeight: 20,
    fontFamily: 'Montserrat-Medium',
    fontWeight: '600',
  },
  inner_image: {
    position: 'absolute',
    top: WP('15%'),
    resizeMode: 'contain',
    padding: WP(SPACING_PERCENT),
    alignSelf: 'center',
    height: HP('25%'),
  },
  _bullet: {
    // fontFamily: FONT,
    fontSize: WP(TEXT_SIZES.info_1),
    // color: COLORS.lightGrey,
    marginTop: HP(SPACING_PERCENT / 5),
  },
  _dotsView: {
    flexDirection: 'row',
    alignSelf: 'center',
    bottom: HP(53),
  },
});
