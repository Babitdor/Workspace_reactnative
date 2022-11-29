import {View, Text, TouchableOpacity, BackHandler} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import ArrowLeft from 'react-native-vector-icons/AntDesign';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import FoodItems from '../components/coffee_convo/FoodItems';
import Category from '../components/coffee_convo/Category';
import Cart from '../components/coffee_convo/Cart';
import {useDispatch} from 'react-redux';

export default function TableBook() {
  useEffect(() => {
    dispatch({type: 'DESTORY_SESSION'});
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        dispatch({type: 'DESTORY_SESSION'});
        // navigation.goBack()
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{backgroundColor: 'black', height: '100%', width: '100%'}}>
      <View
        style={{
          alignItems: 'flex-start',
          flexDirection: 'column',
          padding: 15,
          position: 'absolute',
          zIndex: 999,
          top: 47,
        }}>
        <TouchableOpacity onPress={() => navigation.popToTop()}>
          <ArrowLeft
            name="arrowleft"
            size={25}
            color={'white'}
            style={{
              alignSelf: 'center',
              zIndex: 3,
              borderRadius: 50,
              padding: 8,
              shadowColor: 'black',
              shadowOpacity: 0.2,
              shadowOffset: {width: -2, height: 4},
              shadowRadius: 3,
              elevation: 2,
            }}
          />
        </TouchableOpacity>
      </View>

      {/* <Food Menu/> */}
      <View style={{padding: 20, alignItems: 'center'}}>
        <Text
          style={{
            color: 'white',
            fontSize: 25,
            fontWeight: '600',
            padding: 8,
            borderRadius: 15,
            width: '70%',
            textAlign: 'center',
          }}>
          Coffee & Convo
        </Text>
      </View>
      <View
        style={{padding: 10, zIndex: 10, borderRadius: 20, marginBottom: 5}}>
        <Category />
      </View>

      <FoodItems />
      <Cart />
    </SafeAreaView>
  );
}
