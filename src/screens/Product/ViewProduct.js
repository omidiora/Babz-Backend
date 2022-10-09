import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
} from 'react-native';
// Entypo
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FormInput from '../../component/FormInput';
import {useDispatch, useSelector} from 'react-redux';

import {COLOR, WP} from '../../common/theme';
import AccountHoc from '../../hoc/AccountHoc';
import {DotIndicator} from 'react-native-indicators';
import {DrawerActions} from '@react-navigation/native';

import {AccountHook} from '../../hooks/AccountHook';
import {getUserAction, updateUserAction} from '../../redux/account/action';
import FormButton from '../../component/FormButton';
import FormCustomButton from '../../component/FormCustomButton';
import FormCustomInput from '../../component/FormCustomInput';
import {ListItem, Avatar} from '@rneui/themed';

import {useNavigation} from '@react-navigation/native';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {SearchBar} from '@rneui/themed';
import ProductCategoryHoc from '../../hoc/ProductHoc';
import {
  DeactivateProductAction,
  DeleteProductAction,
  getAllProductAction,
  getAllProductActionByPagination,
  getAllProductCategoryAction,
  MakeFeaturedProduct,
  SearchProductAction,
} from '../../redux/product/action';

const list = [
  {
    name: 'Amy Farha',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President',
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
  },
];

const ViewProduct = props => {
  const {productsCategory = []} = props;
  const navigation = useNavigation();
  const [details, setDetails] = useState({});
  const dispatch = useDispatch();
  const [person, setPerson] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [productData, setProductData] = useState([]);
  const [submit, setSubmit] = useState(false);
  const search_product = useSelector(
    state => state.product?.search_product?.data || [],
  );


  const allProduct = useSelector(
    state => state.product?.pagination_product || {},
  );
  const loading = useSelector(state => state.product);

  const [searchPhrase, setSearchPhrase] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllProductActionByPagination(page));
  }, [page]);

  const NextPagePagination = () => {
    let page = 1;
    page =
      allProduct?.current_page < allProduct?.last_page
        ? allProduct?.current_page + 1
        : allProduct?.last_page;

    dispatch(getAllProductActionByPagination(page));
  };

  const BackPagePagination = () => {
    let page;
    page =
      allProduct?.current_page == 1
        ? allProduct?.current_page
        : allProduct?.current_page - 1;

    console.log(page, 'BackPagePagination');

    dispatch(getAllProductActionByPagination(page));
  };

  const renderEmptyContainer = () => {
    return (
      <View style={{top: WP(20), height: WP(40)}}>
        <Text
          style={{
            color: COLOR.lightGrey,
            textAlign: 'center',
            fontSize: WP(3.5),
          }}>
          No Transaction has taken place
        </Text>
      </View>
    );
  };

  const SearchData = () => {
    setSubmit(true);
    dispatch(SearchProductAction(searchPhrase));
  };

  const EditProductNavigation = selected => {
    if (selectedId == null) {
      Alert.alert('Select an item');
    } else {
      navigation.navigate('EditProduct', {user: selectedId});
    }
  };

  const DeleteProduct = () => {
    //  dispatch( DeleteProductAction(id)
    if (selectedId == null) {
      Alert.alert('Select an item');
    } else {
      dispatch(DeleteProductAction(selectedId?.id, allProduct?.current_page));
    }
  };

  const DeactivateProduct = () => {
    //  dispatch( DeleteProductAction(id)
    if (selectedId == null) {
      Alert.alert('Select an item');
    } else {
      dispatch(
        DeactivateProductAction(selectedId?.id, allProduct?.current_page),
      );
    }
  };

  // DeactivateProductAction

  if (loading?.pagination_loading == true) {
    return <DotIndicator color={COLOR.primaryBlue} />;
  }
  return (
    <View style={styles._mainContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          top: WP(2),
        }}>
        <TouchableOpacity
          style={{left: WP(3)}}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={32} color={COLOR.primaryBrown} />
        </TouchableOpacity>
        <Text
          style={{fontWeight: 'bold', fontSize: 24, color: COLOR.primaryBrown}}>
          Products
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddProduct')}>
          <Entypo name="squared-plus" size={35} color={COLOR.mediumBlue} />
        </TouchableOpacity>
      </View>

      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            left: WP(6),
            top: WP(10),
          }}>
          <Text>Show:</Text>
          <Text style={{left: WP(1)}}>All Products</Text>
          <Icon name="ios-caret-down-sharp" size={18} style={{left: WP(1)}} />
        </View>
      </View>

      {/* Search Component */}
      <View style={styles._searchContainer}>
        <View>
          <SearchBar
            reverseColor="#fff"
            ref={ref => {
              ref;
            }}
            inputContainerStyle={{
              backgroundColor: COLOR.whiteColor,
              borderWidth: 0.1,
            }}
            leftIconContainerStyle={{backgroundColor: COLOR.whiteColor}}
            inputStyle={{backgroundColor: COLOR.whiteColor}}
            containerStyle={{
              backgroundColor: 'transparent',
              justifyContent: 'space-around',
              borderWidth: 1,
              width: WP(70),
              left: WP(3),
              borderRadius: WP(3),
              height: WP(15),
              borderColor: COLOR.extraOffWhite,
              borderTopColor: COLOR.extraOffWhite,
              borderBottomColor: COLOR.extraOffWhite,
            }}
            placeholder="Search..."
            onChangeText={value => setSearchPhrase(value)}
            value={searchPhrase}
            onSubmitEditing={() => SearchData()}
            onClear={() => {
              dispatch(getAllProductActionByPagination(1));
              setSubmit(false);
            }}
          />
        </View>
        {/* _actionText */}

        <View style={styles.action}>
          <Menu>
            <MenuTrigger>
              <Text style={styles._actionText}>
                Action <Icon name="ios-caret-down-sharp" size={18} />
              </Text>
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={() => EditProductNavigation()}>
                <Text style={styles.menuText}>Edit Product</Text>
              </MenuOption>

              <MenuOption onSelect={() => DeactivateProduct()}>
                <Text style={styles.menuText}>Deactivate Product</Text>
              </MenuOption>
              <MenuOption onSelect={() => DeleteProduct()}>
                <Text style={styles.menuText}>Delete</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
      </View>

      {submit ? (
        // search
        <>
          <FlatList
            keyExtractor={item => item.id}
            data={search_product}
            style={{flex: 1, top: WP(6), marginVertical: WP(13)}}
            ListEmptyComponent={renderEmptyContainer()}
            renderItem={({item}) => {
              return (
                <View style={{flex: 1}}>
                  <TouchableOpacity onPress={id => setSelectedId(item)}>
                    {/* selectedId */}
                    <View
                      style={
                        selectedId?.id == item?.id
                          ? {borderWidth: 1, borderColor: '#3DD598'}
                          : null
                      }>
                      <ListItem>
                        <Avatar rounded source={{uri: item?.image}} />
                        <ListItem.Content>
                          <ListItem.Title
                            style={{
                              fontWeight: 'bold',
                              color:
                                selectedId?.id == item?.id
                                  ? COLOR.blackColor
                                  : COLOR.primaryBrown,
                              fontFamily: 'Gilroy-ExtraBold',
                            }}>
                            {item?.name}
                          </ListItem.Title>
                          <ListItem.Subtitle
                            style={{
                              fontWeight: '600',
                              color: COLOR.blackColor,
                              fontFamily: 'Gilroy-Light',
                            }}>
                            ID {item?.id}
                          </ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Title
                          style={{fontWeight: 'bold', color: COLOR.blackColor}}>
                          <Text>
                            {'\u20A6'}
                            {item?.price}
                          </Text>
                        </ListItem.Title>
                      </ListItem>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </>
      ) : (
        <FlatList
          keyExtractor={item => item.id}
          data={allProduct?.data}
          style={{flex: 1, top: WP(6), marginVertical: WP(13)}}
          ListEmptyComponent={renderEmptyContainer()}
          renderItem={({item}) => {
            return (
              <View style={{flex: 1}}>
                <TouchableOpacity onPress={id => setSelectedId(item)}>
                  {/* selectedId */}
                  <View
                    style={
                      selectedId?.id == item?.id
                        ? {borderWidth: 1, borderColor: '#3DD598'}
                        : null
                    }>
                    <ListItem>
                      <Avatar rounded source={{uri: item?.image}} />
                      <ListItem.Content>
                        <ListItem.Title
                          style={{
                            fontWeight: 'bold',
                            color:
                              selectedId?.id == item?.id
                                ? COLOR.blackColor
                                : COLOR.primaryBrown,
                            fontFamily: 'Gilroy-ExtraBold',
                          }}>
                          {item?.name}
                        </ListItem.Title>
                        <ListItem.Subtitle
                          style={{
                            fontWeight: '600',
                            color: COLOR.blackColor,
                            fontFamily: 'Gilroy-Light',
                          }}>
                          ID {item?.id}
                        </ListItem.Subtitle>
                      </ListItem.Content>
                      <ListItem.Title
                        style={{fontWeight: 'bold', color: COLOR.blackColor}}>
                        <Text>
                          {'\u20A6'}
                          {item?.price}
                        </Text>
                      </ListItem.Title>
                    </ListItem>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}

      <View style={styles.paginationContainer}>
        <View>
          <Text>
            {allProduct?.current_page} - {allProduct?.last_page}
          </Text>
        </View>
      </View>

      <View style={{left: WP(65), top: WP(-18)}}>
        <View style={{flexDirection: 'row', marginHorizontal: WP(3)}}>
          <TouchableOpacity
            onPress={() => BackPagePagination()}
            disabled={allProduct?.current_page == 1 ? true : false}
            style={styles.iconContainer}>
            <Entypo name="chevron-thin-left" size={12} />
          </TouchableOpacity>
          {/* BackPagePagination */}

          <TouchableOpacity
            onPress={() => NextPagePagination()}
            style={[styles.iconContainer, {left: WP(2)}]}
            disabled={
              allProduct?.current_page != allProduct?.last_page ? false : true
            }>
            <Entypo name="chevron-thin-right" size={12} />
          </TouchableOpacity>

          {/* {allpagintion?.current_page != allpagintion?.last_page && (
        <TouchableOpacity style={[styles.iconContainer, {left: WP(2)}]}>
          <Entypo name="chevron-thin-left" size={12} />
        </TouchableOpacity>
      )} */}
        </View>
      </View>
    </View>
  );
};

export default ProductCategoryHoc(ViewProduct);

const styles = StyleSheet.create({
  _mainContainer: {
    flex: 1,
    backgroundColor: COLOR.whiteColor,
  },
  text1: {
    top: WP(10),
    color: COLOR.primaryBrown,
    paddingBottom: WP(5),
  },
  formContainer: {
    top: WP(15),
    width: WP('90%'),
    alignSelf: 'center',
  },
  _searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: WP(12),
  },
  action: {
    top: WP(1),
    borderWidth: 1,
    borderColor: COLOR.extraOffWhite,
    borderRadius: WP(5),
    height: WP(14),
    width: WP(22),
    textAlign: 'center',
    padding: WP(4),
  },
  _actionText: {
    alignSelf: 'center',
    top: WP(1),
    color: COLOR.primaryBrown,
  },
  paginationContainer: {
    flexDirection: 'row',
    left: WP(15),
    paddingBottom: WP(13),
  },
  iconContainer: {
    backgroundColor: COLOR.whiteColor,
    padding: WP(1),
    width: WP(7),
    height: WP(6),
    borderWidth: WP(0.1),
    borderColor: COLOR.extraOffWhite,
    alignSelf: 'center',
  },
  menuText: {
    color: COLOR.blackColor,
  },
});
