import {View, Text, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
export default function ConferenceIndicator(props) {
  const navigation = useNavigation();
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems:'center',
          paddingHorizontal:10
        }}>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Image
            style={{
              width: 50,
              height: 50,
              resizeMode: 'contain',
            }}
            source={require('../../assets/Conference.png')}
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
              width: 50,
              height: 50,
              tintColor: 'rgba(137, 252, 233, 1)',
            }}
            source={require('../../assets/Conference.png')}
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
              width: 50,
              height: 50,
              tintColor: 'rgba(147, 147, 147, 0.53)',
            }}
            source={require('../../assets/Conference.png')}
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
        
      </View>
    </>
  );
}
