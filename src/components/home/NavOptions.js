import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Arrowright from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
const options = [
  {
    id: '1',
    title: 'Table',
    image:
      'http://atlas-content-cdn.pixelsquid.com/stock-images/desk-with-books-and-plant-writing-rv2l623-600.jpg',
    screens: 'Seating',
  },
  {
    id: '2',
    title: 'Conference',
    image:
      'https://www.ambiencedore.com/wp-content/uploads/2016/04/Gather-Round-Table.jpg',
    screens: 'Conference',
  },
  {
    id: '3',
    title: 'Coffee & Convo',
    image:
      'https://img.freepik.com/premium-vector/two-cartoon-girl-friend-sit-table-cafe-talk-use-smartphone-together-vector-flat-illustration-gossiping-female-drinking-coffee-enjoy-conversation-isolated-white-background-dog-owner_198278-7505.jpg?w=2000',
    screens: 'Coffee_Convo',
  },
  {
    id: '4',
    title: 'Entire Floor',
    image:
      'https://thumbs.dreamstime.com/b/city-hall-icon-vector-isolated-white-background-your-web-mobile-app-design-city-hall-logo-concept-city-hall-icon-vector-134158652.jpg',
    screens: 'WholeHall',
  },
];

export default function NavOptions(props) {
  const navigation = useNavigation();
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={options}
      numColumns={2}
      style={{alignSelf: 'center',marginTop:10}}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(item.screens, {
              StartTime: props.StartTime,
              EndTime: props.EndTime,
              Date: props.date,
            })
          }
          style={{
            padding: 10,
            margin: 8,
            marginTop:15,
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
                borderRadius:20,
                height: responsiveHeight(10),
                resizeMode: 'contain',
              }}
              source={{uri: item.image}}
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
