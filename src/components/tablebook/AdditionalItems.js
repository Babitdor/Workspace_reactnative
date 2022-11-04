import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import BouncyCheckBox from 'react-native-bouncy-checkbox';
import {useDispatch, useSelector} from 'react-redux';
import Animated from 'react-native-reanimated';
import {firebase} from '@react-native-firebase/database';
import Loading from '../home/Loading';
export default function AdditionalItems(props) {
  useEffect(() => {
    async function FetchData() {
      var snapshot = await firebase
        .app()
        .database(
          'https://workspace-booking-392c3-default-rtdb.asia-southeast1.firebasedatabase.app/',
        )
        .ref('/Data/Items/')
        .once('value');
      setITEMS(snapshot.val());
    }
    FetchData();
  }, []);
  const [items, setITEMS] = useState([]);
  const scrollY = useRef(new Animated.Value(0)).current;
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
  const SPACING = 20;
  const AVATAR_SIZE = 70;
  const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

  return (
    <>
      {items ? (
        <Animated.FlatList
          showsVerticalScrollIndicator={false}
          data={items}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            const inputRange = [
              -1,
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 2),
            ];
            const opacityinputRange = [
              -1,
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 1),
            ];
            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0],
            });
            const opacity = scrollY.interpolate({
              inputRange: opacityinputRange,
              outputRange: [1, 1, 1, 0],
            });

            return (
              <Animated.View
                useNativeDriver
                animation="fadeInLeft"
                delay={500}
                style={{
                  backgroundColor: '#181818',
                  padding: 20,
                  borderRadius: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  margin: 15,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  opacity,
                  transform: [{scale}],
                  shadowOpacity: 0.34,
                  shadowRadius: 6.27,
                  elevation: 10,
                }}>
                <ItemImage items={item} />
                <ItemTitle items={item} />
                <BouncyCheckBox
                  fillColor="rgba(98, 190, 175, 1)"
                  size={30}
                  iconStyle={{borderColor: 'lightgray'}}
                  onPress={checkboxValue => selectItem(item, checkboxValue)}
                  isChecked={isIteminCart(item, cartItems)}
                />
              </Animated.View>
            );
          }}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}

const ItemTitle = props => (
  <View
    style={{
      width: 200,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    }}>
    <View>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: '#E4E6EB'}}>
        {props.items.title}
      </Text>
      <Text style={{fontSize: 15, color: '#E4E6EB'}}>{props.items.price}</Text>
    </View>
  </View>
);

const ItemImage = props => (
  <View>
    <Image
      style={{width: 90, height: 90, resizeMode: 'contain', borderRadius: 20}}
      source={{uri: props.items.image}}
    />
  </View>
);

const styles = StyleSheet.create({
  itemstyle: {
    backgroundColor: '#242526',
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
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
