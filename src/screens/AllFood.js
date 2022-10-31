import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLOR, FONT, HP, IMAGE, symbols, WP} from '../common/theme';
import {useDispatch, useSelector} from 'react-redux';
import FormButton from '../component/FormButton';
import Entypo from 'react-native-vector-icons/Entypo';
import {getAllTransactionAction} from '../redux/transaction/action';
import {ListItem, Avatar} from '@rneui/themed';
import AppBar from '../component/AppBar';
import preferences from '../utils/preferences';
import AsyncStorage from '@react-native-community/async-storage';
import {deleteUserBankDetailsAction} from '../redux/bank/action';

// MaterialCommunityIcons
// Ionicons

// const data = [
//   {title: 'Complete personal details', time: '9 June 2021', money: 3000},
//   {title: 'Facebook Ads', time: '6 June 2021', money: 300},
//   {title: 'Airbnb', time: '4 June 2021', money: 100},
//   {title: 'Facebook Ads', time: '2 June 2021', money: 1000},
// ];

const Food2 = [
  // {
  //   name: 'Amala',
  //   image: require('../assets/image/Amala.jpg'),
  // },
  // 1. Set a large pot on medium heat; add in 6 cups of water , cover and bring to a boil. add in cleaned beans. ..
  {
    name: 'Bean',
    image: require('../assets/image/beanss.jpg'),
    ingredients: [
      {item: 'Water'},
      {item: 'Beans'},
      {item: 'Palm Oil'},
      {item: 'Salt'},
      {item: 'Onions'},
    ],
    procedure:
      'Set a large pot on medium heat; add in 6 cups of water , cover andbring to a boil. add in cleaned beans...After a while Season with maggi , salt and Onions',
  },
  {
    name: 'Eba',
    image: require('../assets/image/ebapicture.jpg'),
    ingredients: [{item: 'Water'}, {item: 'Garri'}],
    procedure:
      'Add boiling water in a bowl then slowly add garri ;Use spoon or spatula to turn till it comes together and its lump free.;Serve with soups like Efo riro, Okro soup,  or any soup of choice. ',
  },
  {
    name: 'Egusi',
    image: require('../assets/image/Egusi.jpg'),
    ingredients: [
      {item: '1 cup blended onions (about 3- 5 and fresh chilies, to taste'},
      {item: '4 cups egusi (melon seeds, ground or milled)'},
      {item: '1⁄2 – 1 cup palm oil'},
      {item: '2 teaspoons fresh Une (Iru, locust beans'},
      {item: 'Salt)'},
      {item: 'Ground crayfish (Optional)'},
      {
        item: 'Cooked Meat & fish (quantity and variety to personal preference)',
      },
      {item: '1 cup waterleaf (cut)'},
      {item: '3 tablespoons bitter leaf (washed)'},
    ],

    procedure:
      'In a large pot, heat the palm oil on medium for a minute and then add the Une.Slowly add the stock and set on low heat to simmer. Scoop teaspoon size balls of the egusi paste mixture into the stock. Be sure to keep ball shape.Leave to simmer for 20 – 30 minutes so the balls cook through.Add the meat and fish and other bits which you’d like to use.Add cut-up pumpkin leaves.  Add the waterleaf.Stir and put a lid on the pot and allow cook for 7–10 minutes, till the leaves wilt.Add the bitter leaf.  Leave the lid off while the cooking finishes for another 5-10 minutes.Stir, check seasoning and adjust accordingly.',

    // 1 cup blended onions (about 3- 5 and fresh chilies, to taste)
    // 4 cups egusi (melon seeds, ground or milled)
    // 1⁄2 – 1 cup palm oil
    // 2 teaspoons fresh Une (Iru, locust beans)
    // Salt (to taste)
    // Ground crayfish (to taste)
    // 7– 8 cups stock
    // Cooked Meat & fish (quantity and variety to personal preference)
    // 2 cups cut pumpkin leaves
    // 1 cup waterleaf (cut)
    // 3 tablespoons bitter leaf (washed)
  },

  {
    name: 'Jollof Rice',
    image: require('../assets/image/jollof.jpg'),
    ingredients: [
      {item: 'Water'},
      {item: 'Rice'},
      {item: 'Bell peppers'},
      {item: 'Brown onion'},
      {item: 'Red onion'},
      {item: 'Tomato puree'},
      {item: 'Vegetable oil'},
      {item: 'Bay leaves'},
      {item: 'Scotch bonnet'},
      {item: 'Butter'},
      {item: 'season cubes'},
      {item: 'Salt'},
      {
        item: 'Mortar and Pestle to pound the Yam until it becomes smooth and doughy',
      },
    ],

    procedure:
      '  Prepare the tomato stew.. It is advisable to prepare tomato stew before hand and keep in the freezer. This is so that whenever you want to cook any jollof rice related dish, it is just a matter of adding it to your cooking.If you will use whole chicken then wash and cut it into pieces. Cook with the thyme, Knorr cubes and 2 bulbs of onions (chopped). The cooking time depends on the type of chicken. The rooster or cockerel cooks much faster than the hen but the hen is definitely tastier. When done, grill it in an oven. You may also fry it. This is to give it a golden look which is more presentable especially if you have guests for dinner. Parboil the rice using the method detailed in parboiling rice for cooking jollof rice. Rinse the parboiled rice and put in a sieve to drain.Cooking Directions Pour the chicken stock and the tomato stew into a sizeable pot and leave to boil. Add the drained parboiled rice, curry powder, salt and pepper to taste. The water level should be the same level of the rice. This is to ensure that all the water dries up by the time the rice is cooked.Cover the pot and leave to cook on low to medium heat. This way the rice does not burn before the water dries up.If you parboiled the rice as described at parboiling rice for cooking jollof rice, the rice should be done by the time the water is dry. Taste to confirm. If not, you will need to add more water and reduce the heat to prevent burning. Keep cooking till done.Serve with Peppered Fish, Fried Plantains, Nigerian Moi Moi, Nigerian Salad or Coleslaw.,',
  },
  {
    name: 'Jollof Rice',
    image: require('../assets/image/jollof.jpg'),
    ingredients: [
      {item: 'Water'},
      {item: 'Rice'},
      {item: 'Bell peppers'},
      {item: 'Brown onion'},
      {item: 'Red onion'},
      {item: 'Tomato puree'},
      {item: 'Vegetable oil'},
      {item: 'Bay leaves'},
      {item: 'Scotch bonnet'},
      {item: 'Butter'},
      {item: 'season cubes'},
      {item: 'Salt'},
      {
        item: 'Mortar and Pestle to pound the Yam until it becomes smooth and doughy',
      },
    ],

    procedure:
      '  Prepare the tomato stew.. It is advisable to prepare tomato stew before hand and keep in the freezer. This is so that whenever you want to cook any jollof rice related dish, it is just a matter of adding it to your cooking.If you will use whole chicken then wash and cut it into pieces. Cook with the thyme, Knorr cubes and 2 bulbs of onions (chopped). The cooking time depends on the type of chicken. The rooster or cockerel cooks much faster than the hen but the hen is definitely tastier. When done, grill it in an oven. You may also fry it. This is to give it a golden look which is more presentable especially if you have guests for dinner. Parboil the rice using the method detailed in parboiling rice for cooking jollof rice. Rinse the parboiled rice and put in a sieve to drain.Cooking Directions Pour the chicken stock and the tomato stew into a sizeable pot and leave to boil. Add the drained parboiled rice, curry powder, salt and pepper to taste. The water level should be the same level of the rice. This is to ensure that all the water dries up by the time the rice is cooked.Cover the pot and leave to cook on low to medium heat. This way the rice does not burn before the water dries up.If you parboiled the rice as described at parboiling rice for cooking jollof rice, the rice should be done by the time the water is dry. Taste to confirm. If not, you will need to add more water and reduce the heat to prevent burning. Keep cooking till done.Serve with Peppered Fish, Fried Plantains, Nigerian Moi Moi, Nigerian Salad or Coleslaw.,',
  },

  {
    name: 'Porridge',
    image: require('../assets/image/porridge.webp'),
    ingredients: [
      {item: '1 kg yam'},
      {item: '1 smoked fish (mackerel)'},
      {item: '1 tablespoon ground crayfish'},
      {item: 'Red onion'},
      {item: '1 medium onion'},
      {
        item: 'Fresh green vegetable (eg pumpkin, parsley, scent leaf or green amaranth)',
      },
      {item: 'Seasoned cubes'},
    ],

    procedure:
      'Before you cook Yam Porride Peel and cut the yam tuber into medium sizes. Wash the yam cubes and place in a sizeable pot.Wash and cut the onions into tiny pieces. Grind or blend the chilli pepper. Set these aside. If using dry fish, soak and pick the bones.Cooking Directions Pour enough water to cover the yam cubes and start cooking at medium to high heat. If you are using dry fish, add it now.When the yams have got a good boil, add the onions, ground crayfish, pepper, stock cubes, palm oil and the smoked fish. Cover the pot and continue cooking till the yam is done. Add salt to taste and stir very well. Cook at high heat for about 5 minutes.Add the green vegetable, stir and leave to stand for about 5 minutes then serve.',
  },

  {
    name: 'Okra Soup',
    image: require('../assets/image/Okro.jpg'),
    ingredients: [
      {item: 'Okra'},
      {item: 'red palm oil'},
      {item: 'Beef'},
      {item: 'Fish'},
      {item: ' crayfish'},
      {item: 'Pepper and Salt (to taste)'},
      {item: 'Vegetable'},

      {item: 'Seasoned cubes'},
    ],

    procedure:
      'Before you cook Okra Soup About two hours before preparing the soup, boil the stockfish for 20 minutes and leave in the pot with the hot water to soak. There is a type of stockfish that I buy in Nigeria that does not need all that soaking.Cut the okra fingers into tiny pieces. The tinier you cut the okra, the more it will draw. To achieve this, you need to make a few vertical cuts followed by horizontal cuts on the okra fingers.Grind the crayfish and the dry pepper.Wash the pumpkin leaves, if it is your choice of vegetable, and cut into tiny pieces. If you will use frozen spinach, defrost and cut into tiny pieces.Cooking Directions If you will use shaki (cow tripe) for the soup, wash and boil till it is done. Add water sparingly because this soup needs to be thick. Add the soaked stockfish and dry fish to the cooked shaki. The length of time it will take to cook shaki depends on the cooking appliance utilized. You can take a bite to confirm thisWhen you are happy that the shaki and stock fish are well-done, add the beef, onions and stock cubes and cook till done. Then add the iced fish and cook till done Pour red palm oil in another pot and heat the pot to dissolve the oil if it is congealed. Add the diced okra and start frying to kick-start the drawing process, add some meat stock from time to time till you notice the okra start to draw. This process should take a maximum of 5 mins to avoid over-cooking the okra.Now add the vegetable and stir well. Add all the meat and fish, crayfish, pepper and salt to taste. Then stir well. Cover the cooking pot and leave to simmer and it is ready to be served.',
  },

  {
    name: 'Amala',
    image: require('../assets/image/Amala.jpg'),
    ingredients: [{item: 'hot water'}, {item: 'Yam Flour'}],

    procedure:
      'First, heat water on the fire and allow boiling. After that, bring it down from the fire and gradually add your Abebi Yam Flour. Do not add the yam flour to the water while still on the fire so it doesn’t form lumps.Then, turn the yam flour with a wooden Eba stick (omorogun) quickly so as not to form lumps.Turn for a while, add little water and put it back on the fire to cook on low heat for about 5 minutes.Finally, after 5 minutes, begin to turn the Àmàlà again, keep turning until a smooth paste is formed. The pulling of the dough into a smooth paste is the most difficult part of making Elubo. Now, put back on low heat, add a little water or meat stock, and leave to boil for a minute. You will  notice that it has become thicker and has a slimy texture(it has started to ”draw”)',
  },

  {
    name: 'Ogbono',
    image: require('../assets/image/ogbo.jpg'),

    procedure:
      'If you bought Whole ogbono seeds, Grind them thoroughly using a dry mill or a good  blender or coffee grinder.Wash, season and cook the assorted meat, dry fish & stock fish with onions, stock cube and salt to taste. Cook until tender.Slice the vegetables, grind the pepper and set aside.Heat up the red palm oil in a clean dry pot until hot. You can add minced onions if you like(adding onions is optional).Now, put off the heat and add the ground Ogbono into the hot oil.Dissolve the ogbono by pressing with the back of your spoon and stirring constantly .',
    ingredients: [
      {item: '2 handful of Ogbono Powder'},
      {item: 'Assorted Meat and Fish:'},
      {item: '2-3 Cooking spoonful Palm Oil'},
      {
        item: 'Vegetable (Spinach OR Pumpkin leaves(ugu) OR Bitter leaf(onugbu)..or a mixture of bitter leaf )',
      },

      {
        item: 'Crayfish(as you like it',
      },
      {
        item: '1 Onion bulb',
      },
      {
        item: '2 stock cubes',
      },
      {
        item: 'Chilli Pepper or scotch bonnet(atarodo)',
      },
      {
        item: 'Salt',
      },
    ],
  },
];

// porridge.webp

const AllFood = props => {
  const {navigation} = props;
  const user = useSelector(state => state?.auth?.login_user?.user);
  const AllFood = useSelector(state => state?.transaction?.data || []);

  const [profiletatus, setprofiletatus] = useState(false);
  const [bussinessStatus, setBussinessStatus] = useState(false);
  const [complinanceStatus, setComplinanceStatus] = useState(false);
  const [bankStatus, setBankStatus] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    dispatch(getAllTransactionAction());
  }, []);

  const dispatch = useDispatch();

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

  const onRefresh = () => {
    dispatch(getAllTransactionAction());
  };
  const [showBox, setShowBox] = useState(true);

  const renderEmptyContainer = () => {
    return (
      <View style={{top: WP(20), height: WP(40)}}>
        <Text
          style={{
            color: COLOR.lightGrey,
            textAlign: 'center',
            fontSize: WP(3.5),
          }}>
          loading...
        </Text>
      </View>
    );
  };

  const showConfirmDialog = id => {
    return Alert.alert(
      'Are your sure?',
      'Are you sure you want to remove this beautiful box?',
      [
        // The "Yes" button
        {
          text: 'Yes',
          onPress: () => {
            setShowBox(false);
            DeleteUserDetails(id);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: 'No',
        },
      ],
    );
  };

  const DeleteUserDetails = id => {
    dispatch(deleteUserBankDetailsAction(id));
  };

  let totoalFood = [...AllFood, ...Food2];

 
  return (
    <View style={styles._mainContainer}>
      <FlatList
        data={totoalFood}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={renderEmptyContainer()}
        onRefresh={() => onRefresh()}
        refreshing={refresh}
        style={{
          height: WP(115),
          top: WP(-1),
          left: WP(2),
        }}
        renderItem={({item}) => (
          <View style={{top: WP(6)}}>
            <ListItem bottomDivider>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('DetailStack', {params: item})
                }
                style={
                  {
                    // backgroundColor: generateColor(),
                    // height: WP(10),
                    // width: WP(10),
                    // borderRadius: WP(10),
                    // marginVertical: WP(2),
                  }
                }>
                {item.image ? (
                  <Image
                    source={item.image}
                    style={{width: WP(25), height: HP(10)}}
                  />
                ) : (
                  <>
                    <Image
                      source={{
                        uri: `https://babzbackend.herokuapp.com${item?.photo}`,
                      }}
                      style={{width: WP(25), height: HP(10)}}
                    />
                  </>
                )}
              </TouchableOpacity>

              <>
                <ListItem.Content>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('DetailStack', {params: item})
                    }>
                    <ListItem.Title
                      style={{
                        fontSize: WP(4),
                        color: 'black',
                        fontWeight: 'bold',
                        fontFamily: 'Montserrat-Medium',
                      }}>
                      {item?.name ? item?.name : item?.foodname}
                    </ListItem.Title>
                    <ListItem.Subtitle
                      style={{
                        fontSize: WP(3),
                        color: COLOR.primaryBrown,
                        fontWeight: '300',
                        fontFamily: 'Montserrat-Light',
                      }}>
                      {item?.period_date}
                    </ListItem.Subtitle>
                  </TouchableOpacity>
                </ListItem.Content>
              </>
              <ListItem.Subtitle
                style={{
                  fontSize: WP(4),
                  color: generateColor(),
                  fontWeight: 'bold',
                  fontFamily: 'Montserrat-Light',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 100,
                  }}>
                  {/* <TouchableOpacity onPress={() => showConfirmDialog(item?.id)}>
            <Text>Delete</Text>
          </TouchableOpacity> */}
                  {/* 
          <TouchableOpacity
            onPress={() => navigation.navigate('EditStack', {item})}>
            <Text>Edit</Text>
          </TouchableOpacity> */}
                </View>
              </ListItem.Subtitle>
            </ListItem>
          </View>
        )}
      />
    </View>
  );
};

export default AllFood;

const styles = StyleSheet.create({
  _mainContainer: {
    flex: 1,
    padding: WP(5),
    backgroundColor: COLOR.whiteColor,
  },
  textContainer1: {
    position: 'absolute',
    top: WP(8),
    left: WP(15),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  text1: {
    color: COLOR.whiteColor,
    fontFamily: FONT.medium,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text2: {
    fontSize: WP(9),
    color: COLOR.whiteColor,
    fontFamily: FONT.bold,
    right: WP(3),
  },
  dataContainer: {
    flexDirection: 'row',
    borderWidth: WP(0.1),
    padding: WP(5),
    marginVertical: WP(1),
    borderColor: '#F0F5FA;',
    borderRadius: WP(3),
  },
  numberTextContainer: {
    borderWidth: WP(0.4),
    width: WP(8),
    height: WP(8),
    borderRadius: WP(7),
    textAlign: 'center',
    backgroundColor: COLOR.mediumBlue,
    borderColor: COLOR.primary,
    color: COLOR.whiteColor,
  },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: HP(10),
  },
  allFoodContainer: {
    backgroundColor: 'brown',
    padding: WP(14),
  },

  Container3: {
    width: '100%',
    backgroundColor: 'brown',
    marginTop: WP(40),
    height: HP(20),
    backgroundColo: 'yellow',
    textAlign: 'center',
  },
});
