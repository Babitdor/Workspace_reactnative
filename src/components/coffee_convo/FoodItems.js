import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import BouncyCheckBox from 'react-native-bouncy-checkbox';
import {useDispatch, useSelector} from 'react-redux';
import Animated from 'react-native-reanimated';
import {firebase} from '@react-native-firebase/database';
import Loading from '../home/Loading';
import {useContext} from 'react';
import * as Animatable from 'react-native-animatable';
import {AuthContext} from '../../navigation/AuthProvider';
export default function FoodItems(props) {
  const {Category} = useContext(AuthContext);
  useEffect(() => {
    async function FetchData() {
      var snapshot = await firebase
        .app()
        .database()
        .ref(`/Data/Foods/0/${Category}/`)
        .on('value', snapshot => {
          setITEMS(snapshot.val());
        });
    }
    FetchData();
  }, [Category]);

  const [items, setITEMS] = useState([]);
  const dispatch = useDispatch();
  const selectItem = (item, checkboxValue) =>
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        ...item,
        checkboxValue: checkboxValue,
      },
    });
  const cartItems = useSelector(state => state.cartReducer.selectedItems.items);

  const isIteminCart = (_item, cartItems) =>
    Boolean(cartItems.find(item => item.title === _item.title));

  return (
    <>
      {items ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={items}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            return (
              <Animatable.View
                useNativeDriver
                animation="fadeInUp"
                // delay={500}
                style={styles.itemstyle}>
                <ItemImage items={item} />
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 15,
                  }}>
                  <ItemTitle items={item} />
                </View>
                <View style={{alignItems: 'flex-end', marginBottom: 5}}>
                  <BouncyCheckBox
                    fillColor="rgba(98, 190, 175, 1)"
                    size={30}
                    iconStyle={{borderColor: 'lightgray'}}
                    onPress={checkboxValue => selectItem(item, checkboxValue)}
                    isChecked={isIteminCart(item, cartItems)}
                  />
                </View>
              </Animatable.View>
            );
          }}
          numColumns={2}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}

const ItemTitle = props => (
  <View>
    <Text style={{fontSize: 15, fontWeight: 'bold', color: '#E4E6EB'}}>
      {props.items.title}
    </Text>
    <Text style={{fontSize: 13, fontWeight: 'bold', color: '#E4E6EB'}}>
      {props.items.price}
    </Text>
  </View>
);

const ItemImage = props => (
  <View>
    <Image
      style={{
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 20,
      }}
      source={{uri: props.items.image}}
    />
  </View>
);

const styles = StyleSheet.create({
  itemstyle: {
    flex: 1,
    backgroundColor: '#181818',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});
