import {View, Text, Image} from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../../navigation/AuthProvider';
export default function SeatIndicator(props) {
  const {isDarkMode} = useContext(AuthContext)
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems:'center',
          backgroundColor: isDarkMode? 'black':'#EEEEEE',
          padding:8,
          paddingHorizontal:10
        }}>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Image
            style={{
              width: 22,
              height: 22,
              resizeMode: 'contain',
            }}
            source={require('../../assets/TableD.png')}
          />
          <Text
            style={{
              color: 'gray',
              fontWeight: '600',
              fontSize: 12,
            }}>
            Vacant
          </Text>
        </View>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Image
            style={{
              width: 22,
              height: 22,
              tintColor: 'rgba(137, 252, 233, 1)',
            }}
            source={require('../../assets/TableD.png')}
          />
          <Text
            style={{
              color: 'gray',
              fontWeight: '600',
              fontSize: 12,
            }}>
            Selected
          </Text>
        </View>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Image
            style={{
              width: 22,
              height: 22,
              tintColor: 'rgba(147, 147, 147, 0.53)',
            }}
            source={require('../../assets/TableD.png')}
          />
          <Text
            style={{
              color: 'gray',
              fontWeight: '600',
              fontSize: 12,
            }}>
            Occupied
          </Text>
        </View>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Image
            style={{
              width: 22,
              height: 22,
              tintColor: 'white',
            }}
            source={require('../../assets/TableD.png')}
          />
          <Text
            style={{
              color: 'gray',
              fontWeight: '600',
              fontSize: 12,
            }}>
            Free to use
          </Text>
        </View>
      </View>
    </>
  );
}
