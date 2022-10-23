import {View, Text, Image} from 'react-native';
import React from 'react';
import Seat from 'react-native-vector-icons/AntDesign';
import TablePreview from './TablePreview';

export default function SeatIndicator({navigation}) {
  return (
    <>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Text style={{fontSize: 25, fontWeight: '600', color: 'white'}}>
          Choose your Seats
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#242526',
          justifyContent: 'space-evenly',
          padding: 10,
          marginTop: 5,
        }}>
        <View
          style={{flexDirection: 'column', padding: 10, alignItems: 'center'}}>
          <Image
            style={{
              width: 30,
              height: 30,
            }}
            source={require('../../assets/TableD.png')}
          />
          <Text style={{color: 'white', fontWeight: '600'}}>Vacant</Text>
        </View>
        <View
          style={{flexDirection: 'column', padding: 10, alignItems: 'center'}}>
          <Image
            style={{
              width: 30,
              height: 30,
              tintColor: 'rgba(255, 0, 0, 0.5)',
            }}
            source={require('../../assets/TableD.png')}
          />
          <Text style={{color: 'white', fontWeight: '600'}}>Selected</Text>
        </View>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Image
            style={{
              width: 30,
              height: 30,
              tintColor: 'rgba(147, 147, 147, 0.53)',
            }}
            source={require('../../assets/TableD.png')}
          />
          <Text style={{color: 'white', fontWeight: '600'}}>Occupied</Text>
        </View>
      </View>

      <View style={{padding: 10}}>
        <TablePreview navigation={navigation} />
      </View>
    </>
  );
}
