import {View, TouchableOpacity, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import BookMySeat from '../components/seating/BookMySeat';
import ArrowLeft from 'react-native-vector-icons/AntDesign';
import {firebase} from '@react-native-firebase/database';
import * as Animatable from 'react-native-animatable';
import Loading from '../components/home/Loading';
import SeatIndicator from '../components/seating/SeatIndicator';
export default function Seating({route, navigation}) {
  const [Data, SetDatabase] = useState();
  
  useEffect(() => {
    async function FetchData() {
      var snapshot = await firebase
        .app()
        .database(
          'https://workspace-booking-392c3-default-rtdb.asia-southeast1.firebasedatabase.app/',
        )
        .ref('/Data/Tables/')
        .once('value');
      SetDatabase(snapshot.val());
    }
    FetchData();
  }, []);

  return (
    <>
    {Data?
      <SafeAreaView
        style={{width: '100%', height: '100%', backgroundColor: 'black'}}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 15,
            zIndex: 999,
          }}>
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeft
                name="arrowleft"
                size={25}
                color={'white'}
                style={{
                  alignSelf: 'center',
                  borderWidth: 0.5,
                  zIndex: 100,
                  borderRadius: 50,
                  padding: 8,
                }}
              />
            </TouchableOpacity>
          </View>
          <Animatable.View animation="fadeInUp" delay={400}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontSize: 25,
                fontWeight: 'bold',
                marginRight: 40,
              }}>
              Book Your Seat
            </Text>
          </Animatable.View>
          <View></View>
        </View>
        
        <View style={{position: 'relative', width: '100%', height: '100%'}}>
          <BookMySeat
            navigation={navigation}
            data={route.params}
            database={Data}
          />
        </View>
      </SafeAreaView>:<SafeAreaView style={{width: '100%', height: '100%', backgroundColor: 'black'}}/>}
    </>
  );
}
