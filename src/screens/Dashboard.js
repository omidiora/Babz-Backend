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
import ImageOverlay from 'react-native-image-overlay';

// MaterialCommunityIcons
// Ionicons

// const data = [
//   {title: 'Complete personal details', time: '9 June 2021', money: 3000},
//   {title: 'Facebook Ads', time: '6 June 2021', money: 300},
//   {title: 'Airbnb', time: '4 June 2021', money: 100},
//   {title: 'Facebook Ads', time: '2 June 2021', money: 1000},
// ];

const Food = [
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
    name: 'Pounded Yam',
    image: require('../assets/image/poundedyam2.jpg'),
    ingredients: [
      {item: 'Water'},
      {item: 'Yam'},
      {
        item: 'Mortar and Pestle to pound the Yam until it becomes smooth and doughy',
      },
    ],

    procedure:
      '    Peel the yam and cut it into small cubes. Rinse about once or twice till you get clear water Boil until the Yam becomes fork-tender.Pound or blend into a dough-like consistency until it’s completely smooth with no yam chunks left.',
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

  {
    name: 'Akara (Fried Black-Eyed Peas Cake)',
    image: require('../assets/image/akara.jpg'),

    procedure: `Remove the beans coat. Read how to remove beans coat for help on how to do that. It is important that you do not let salt come in contact with the beans you will use in making Akara till you are ready to fry it. Salt is believed to destroy the leavening property of beans. This is what prevents spattering of the beans batter during frying.Then soak the beans in water for 2 hours to make it soft enough for your blender. If you will grind it using the heavy duty grinders in Nigerian markets, it will not be necessary to soak the beans for extended periods of time.Cut the pepper and onions into desirable sizes.Grind the beans with your blender making sure you add as little water as possible. The water should be just enough to move the blades of your blender.The operators of the heavy duty grinders in Nigerian markets don"t even add water when grinding beans for Akara. The less water you add at the grinding stage, the more the beans batter will stay together during frying thereby reducing spatter. Also, do not add any other ingredient when grinding the beans for Akara. It is believed that other ingredients, if added too early, reduce the ability of the ground beans particles to stick together.Set some vegetable oil on the cooker to heat up. The oil should be at least 3 inches deep.Put some of the ground beans into a mortar. This should be the quantity you can fry in one go.Stir the beans puree with the pestle in a continuous circular motion. You need to apply some pressure so that you can energize the particles of the beans puree.This stirring technique releases the gas that will act like a leavening agent to the beans particles, making them rise and somehow stick together. This will be like the yeast making the dough rise in Puff Puff or what folding does to cake batter.Keep stirring till the ground beans appears whiter and you can perceive its peculiar aroma.Add some water till you get the consistency shown in the video below.Check to make sure the oil is hot. The oil should be hot enough to sizzle but not too hot. If too hot, the Akara will spatter as soon as the beans batter hits the oil.Once the oil is hot, add the onions and pepper to the beans puree in the mortar. Stir well.
 Salt should always be added just before scooping the beans mixture into the oil. If salt stays in the mixture for extended periods of time, it will destroy the leavening property of the beans. This property is what makes the Akara float in the oil and prevent spatter during frying.
To fry the Akara, scoop the mixture with a table spoon and slowly pour this into the oil. Dipping the spoon a little bit into the oil helps reduce spatter.
Fry the underside till brown and flip to fry the top side too.
When the Akara balls are brown all over, remove and place in a sieve lined with paper towels
      `,
    ingredients: [
      {item: '1 cup of Beans (black-eyed or brown beans)'},
      {item: '2 habanero peppers (also chilli peppers)'},
      {item: '1 medium onion'},
      {
        item: 'Vegetable Oil for frying',
      },
    ],
  },

  {
    name: 'Moi Moi (Bean Pudding)',
    image: require('../assets/image/moi2.jpg'),

    procedure: `Strain the beans, pour it into your blender(do this in batches).
    Add the peppers(you can also add thick tomato paste, to give it more color). 
    Add the onions, crayfish and stock cubes.
    Add a little water to help the blender work better. Grind the beans until you get a very smooth consistency, without granules or beans lumps.
  If you’re using bean flour, mix the flour in a little water to form a thick paste, then pour the paste into a blender,add the peppers,onions, crayfish and stock cubes and blend until smooth.Then go to step 2
  Pour the blended beans into a wide bowl;Stir and slowly add some water and continue stirring until you get a lighter consistency, but not too watery.

Now, add the vegetable oil, taste for salt and if need be, add a little salt(remember you already added stock cubes, so go easy on the salt).
Mix thoroughly and then take out your greased moi moi containers or moi moi leaves.

3. Pour the mixture into each of the containers and add your egg or any other garnishes you prefer. Seal or cover the containers and set aside.

4. Now, line the base of your pot with foil paper or the some moi moi leaves;
Pour in some water and set to boil. When the water is boiling, place the sealed Moi moi into the pot of boiling water and leave to steam.

5. As the Moi moi starts to cook. Add a little quantity of water from time to time,so that it doesn’t begin to burn underneath. 
But be careful not to add to much water as it might get into the Moi moi containers and ruin the food by making it watery.
 
6. After about 45 minutes, put a knife through the Moi Moi; if the knife comes out clean, then the moi moi is ready. Note that the cooking time for Moi Moi depends on the type of container you are using and also on the quantity of moi moi you are cooking(5 pieces of Moi moi in a small pot, will definitely cook faster than 30 pieces of moimoi in a large pot).
If you are in doubt about whether the Moi moi is well cooked or not; it is advisable to leave it to cook for about 1 hour 30 minutes(adding some water occasionally). The moi moi tends to cook faster with the foil, nylons and leaves, but takes longer with the plastic bowl.

7. Now , take out the Moi moi from the pot and leave to cool a bit before unwrapping or turning it onto a plate. Enjoy!
      `,

    ingredients: [
      {item: '700g Black eyed or brown beans(1 big derica tin)'},
      {item: '1 Tatashe(red bell pepper)'},
      {item: '1 scotch bonnet pepper( atarodo/fresh pepper)'},
      {
        item: '2 cooking spoonful Vegetable Oil',
      },
      {
        item: '1 tablespoonful concentrated tomato puree (for extra color, but optional )',
      },
      {
        item: '4 Tablespoonful ground Crayfish',
      },
      {
        item: '2 large Onions bulbs',
      },

      {
        item: '1 tablespoonful concentrated tomato puree (for extra color, but optional )',
      },
      {
        item: 'Eggs OR boiled minced meat  OR Bone Marrow  OR Corned beef OR deboned smoked fish OR deboned boiled fish',
      },
      {
        item: '3 bouillon/stock cubes for Seasoning(Maggi/Knorr cubes)',
      },

      {
        item: 'Water (as needed)',
      },
      {
        item: 'Salt to taste',
      },
    ],
  },
];

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
];
// porridge.webp

const Dashboard = props => {
  const {navigation} = props;
  const user = useSelector(state => state?.auth?.login_user?.user);
  const AllFood = useSelector(state => state?.transaction?.data || []);
  console.log(AllFood, 'lmlsmlsm');
  const [profiletatus, setprofiletatus] = useState(false);
  const [bussinessStatus, setBussinessStatus] = useState(false);
  const [complinanceStatus, setComplinanceStatus] = useState(false);
  const [bankStatus, setBankStatus] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTransactionAction());
  }, []);

  useEffect(() => {
    if (user?.home_address !== null && user?.phone !== null) {
      setprofiletatus(true);
    } else if (
      user?.merchant?.business_address !== null &&
      user?.merchant?.business_name !== null &&
      user?.merchant?.business_email !== null
    ) {
      setBussinessStatus(true);
    }
    // Complinance
    else if (
      user?.merchant?.business_reg_type !== null &&
      user?.bvn !== null &&
      user?.business_reg_document !== null
    ) {
      setComplinanceStatus(true);
    }
    // Bank Details
    else if (user?.bank_details.length !== 0) {
      setBankStatus(true);
    } else if (user?.merchant.stores.length !== 0) {
      setStoreStatus(true);
    }
  }, []);

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
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

  const fetchuser = async () => {
    const token = await AsyncStorage.getItem(preferences.KEYS.ACCESS_TOKEN);
    console.log(token, 'toake');
  };
  useEffect(() => {
    fetchuser();
  }, []);

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

  return (
    // <View style={styles._mainContainer}>
    <ImageBackground source={IMAGE.back} style={styles._mainContainer}>
      <AppBar type={'dark'} backgroundColor={COLOR.whiteColor} hidden={false} />
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <MaterialCommunityIcons
              name="dots-grid"
              size={32}
              color={COLOR.whiteColor}
            />
          </TouchableOpacity>
          <View>
            {/* <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Ionicons
                name="md-notifications-sharp"
                size={22}
                color={COLOR.deepBlue}
              />
            </TouchableOpacity> */}
          </View>
        </View>
      </View>

      <FlatList
        data={Food2}
        //method to render the data in the way you want using styling u need
        horizontal={false}
        numColumns={2}
        contentContainerStyle={{
          zIndex: 1,
          right: 20,
          width: '200%',
          paddingBottom: HP(1),
        }}
        style={{paddingBottom: HP(100)}}
        renderItem={item => (
          <>
            <View>
              <TouchableOpacity
                style={{margin: 10, justifyContent: 'center'}}
                onPress={() =>
                  navigation.navigate('DetailStack', {
                    item: item.item,
                  })
                }>
                <ImageOverlay
                  source={item.item.image}
                  containerStyle={{
                    width: WP(60),
                    height: HP(14),
                    right: WP(20),
                  }}
                  title={item.item.name}
                  titleStyle={{left: WP(3)}}
                />
              </TouchableOpacity>
            </View>
          </>
        )}
      />

      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={styles.allFoodContainer}
          onPress={() => navigation.navigate('AllFood')}>
          <Text style={styles.text1}>ALL FOOD</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.allFoodContainer}
          onPress={() => navigation.navigate('Soup')}>
          <Text style={styles.text1}>Soup</Text>
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity
        style={styles.Container3}
        onPress={() => navigation.navigate('OnlyFood')}>
        <Text style={styles.text1}>Food</Text>
      </TouchableOpacity> */}
    </ImageBackground>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  _mainContainer: {
    flex: 1,
    padding: WP(5),
    backgroundColor: COLOR.whiteColor,
    paddingBottom: WP(10),
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
    marginTop: HP(-29),
  },
  allFoodContainer: {
    backgroundColor: 'brown',
    padding: WP(12),
    width: '47%',

    height: HP(15),
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
