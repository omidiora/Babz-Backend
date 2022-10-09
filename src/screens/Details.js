import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React from 'react';
import {getAllTransactionAction} from '../redux/transaction/action';
import {COLOR, WP} from '../common/theme';
import RenderHtml from 'react-native-render-html';
import {useWindowDimensions} from 'react-native';

const Details = props => {
  console.log(props.route?.params?.params, '1232322');
  // props.route?.params?.params?.image
  const {width} = useWindowDimensions();
  return (
    <ScrollView contentContainerStyle={{paddingBottom: WP(30)}}>
      {/* props.route?.params?.item?.image */}
      {/* props.route?.params?.params?.photo */}

      {props.route?.params?.item?.image == 'undefined' ? (
        <Image
          source={{
            // uri: `https://babzbackend.herokuapp.com/${props.route?.params?.params?.photo}`,

            uri: `https://babzbackend.herokuapp.com${props.route?.params?.params?.photo}`,
          }}
          style={{width: '200%', height: 200, top: 10, resizeMode: 'cover'}}
        />
      ) : (
        <>
          <Image
            source={
              props.route?.params?.item?.image ||
              props.route?.params?.params?.image
            }
            style={{width: '200%', height: 200, top: 10, resizeMode: 'cover'}}
          />
        </>
      )}
      <View>
        <View style={styles.dataContainer}>
          <View>
            <Text style={styles.header}>Name</Text>
          </View>
          <View>
            <Text style={{fontWeight: 'bold', left: 10, color: 'black'}}>
              {props.route?.params?.params?.foodname}
              {props.route?.params?.item?.name ||
                props.route?.params?.params?.name}
            </Text>
          </View>
        </View>

        <View style={styles.dataContainer}>
          <View>
            <Text style={styles.header}>Ingredient/Material Needed</Text>
          </View>
          <View>
            <View style={{fontWeight: 'bold', left: 10, width: '90%'}}>
              {props.route?.params?.params?.itemize ? (
                <RenderHtml
                  contentWidth={width}
                  source={{html: props.route?.params?.params?.itemize}}
                  enableExperimentalMarginCollapsing={true}
                />
              ) : (
                <View>
                  {props?.route?.params?.item?.ingredients.map(value => (
                    <>
                      <Text>{value.item}</Text>
                    </>
                  ))}

                  {props.route?.params?.params?.ingredients.map(value => (
                    <>
                      <Text>{value.item}</Text>
                    </>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={styles.dataContainer}>
          <View>
            <Text style={styles.header}>Preparation</Text>
          </View>
          <View>
            <Text
              style={{
                fontWeight: '500',
                left: 10,
                width: '90%',
                color: 'black',
              }}>
              {props.route?.params?.params?.description ||
                props?.route?.params?.item?.procedure}
              {props.route?.params?.params?.procedure}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  dataContainer: {
    flexDirection: 'column',
    top: 20,
    left: 20,
  },
  header: {
    fontWeight: 'bold',
    color: COLOR.primary,
    marginVertical: 10,
    left: WP(3),
  },
});
