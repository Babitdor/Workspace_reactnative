import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Arrowright from 'react-native-vector-icons/AntDesign';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

const options = [
  {
    id: '1',
    title: 'Table',
    image: require('../../assets/NavOps/TableBook.png'),
    screens: 'Seating',
  },
  {
    id: '2',
    title: 'Conference',
    image: require('../../assets/NavOps/ConferenceBooking.png'),
    screens: 'Conference',
  },
  {
    id: '3',
    title: 'Coffee & Convo',
    image: require('../../assets/NavOps/Coffee_Convo.png'),
    screens: 'Coffee_Convo',
  },
  {
    id: '4',
    title: 'Entire Floor',
    image: require('../../assets/NavOps/EntireHall.png'),
    screens: 'WholeHall',
  },
];

export default function NavOptions(props) {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={options}
      numColumns={2}
      style={{alignSelf: 'center', marginTop: 10}}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate(item.screens, {
              StartTime: props.StartTime,
              EndTime: props.EndTime,
              Date: props.date,
            })
          }
          style={{
            padding: 10,
            margin: 8,
            marginTop: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            shadowOpacity: 0.6,
            shadowOffset: {width: -2, height: 4},
            shadowRadius: 3,
            elevation: 3,
          }}>
          <View>
            <Image
              style={{
                width: responsiveWidth(32),
                height: responsiveHeight(10),
                resizeMode: 'contain',
              }}
              source={item.image}
            />
            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
                flexDirection: 'column',
                padding: 10,
              }}>
              <Text
                style={{
                  fontSize: responsiveScreenFontSize(1.6),
                  marginTop: 10,
                  fontWeight: '600',
                  marginBottom: 10,
                  color: 'black',
                }}>
                {item.title}
              </Text>
              <Arrowright
                name="arrowright"
                size={responsiveFontSize(2.2)}
                color="white"
                style={{
                  backgroundColor: '#181818',
                  borderRadius: 100,
                  padding: 8,
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
