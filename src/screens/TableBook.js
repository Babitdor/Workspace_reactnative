import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import ArrowLeft from 'react-native-vector-icons/AntDesign';
import AdditionalItem from '../components/tablebook/AdditionalItems';
import ViewCart from '../components/tablebook/ViewCart';
export default function TableBook({route, navigation}) {
  const dispatch = useDispatch();
  const goBack = () => {
    dispatch({type: 'DESTORY_SESSION'});
    navigation.goBack();
  };

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
        <TouchableOpacity onPress={() => goBack()}>
          <ArrowLeft
            name="arrowleft"
            size={26}
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

      <View style={{padding: 20, alignItems: 'center'}}>
        <Text style={{color: 'white', fontSize: 25, fontWeight: '600'}}>
          Add Ons
        </Text>
      </View>
      <AdditionalItem />

      <ViewCart seats={route.params} Date_Time={route.params} />
    </SafeAreaView>
  );
}
