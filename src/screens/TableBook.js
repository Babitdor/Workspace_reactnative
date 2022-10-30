import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import ArrowLeft from 'react-native-vector-icons/AntDesign';
import AdditionalItem from '../components/tablebook/AdditionalItems';
// import items from '../../jsons/additional.json'
import Loading from '../components/home/Loading'
import ViewCart from '../components/tablebook/ViewCart';
export default function TableBook({route, navigation}) {
  // const [items, setITEMS] = useState([]);
  // useEffect(() => {
  //     reference
  //     .ref('/Data/Items/')
  //     .on('value', snapshot => {
  //       setITEMS(snapshot.val());
  //     });
  // }, []);
  // useEffect(() => {
  //   async function FetchData() {
  //     var snapshot = await firebase
  //       .app()
  //       .database(
  //         'https://workspace-booking-392c3-default-rtdb.asia-southeast1.firebasedatabase.app/',
  //       )
  //       .ref('/Data/Items/')
  //       .once('value');
  //     setITEMS(snapshot.val());
  //   }
  //   FetchData();
  // }, []);
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
          top:47,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
      
  
      {/* <TableInfo/> */}
      <View style={{padding: 20, alignItems: 'center'}}>
        <Text style={{color: 'white', fontSize: 25, fontWeight: '600'}}>
          Add Ons
        </Text>
      </View>
      <AdditionalItem/>
      
      <ViewCart seats={route.params} Date_Time={route.params}/>
      
    </SafeAreaView>
  );
}
