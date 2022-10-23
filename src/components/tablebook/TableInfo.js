import {
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable'
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export default function TableInfo(props) {
  return (
    <View style={{height: windowHeight}}>
      <Animatable.View style={{flex:1}} animation='fadeInUp'>
        <TableImage image={props.database.image} />
      </Animatable.View>

      <Animatable.View
      animation="fadeInUpBig"
        style={{
          width: '100%',
          flex:2,
          height: '100%',
          transform: [{translateY: windowHeight / 4}],
          backgroundColor: '#181818',
          borderRadius: 32,
          padding: 30,
        }}>
        <TableNo title={props.database.title} />
        <TableDescription description={props.database.description} />
        <Text
          style={{
            fontSize: 25,
            fontWeight: '600',
            marginTop: 10,
            color: 'white',
            marginHorizontal: 15,
          }}>
          Perks
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '200',
            marginTop: 10,
            color: 'white',
            marginHorizontal: 15,
          }}>
          Free Internet
        </Text>

        <Text
          style={{
            fontSize: 15,
            fontWeight: '200',
            marginTop: 10,
            color: 'white',
            marginHorizontal: 15,
          }}>
          2 Cups of Coffee
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '200',
            marginTop: 10,
            color: 'white',
            marginHorizontal: 15,
          }}>
          Notebooks & Pencil Infinite Use
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '200',
            marginTop: 10,
            color: 'white',
            marginHorizontal: 15,
          }}>
          Breakfast Complementary
        </Text>
      </Animatable.View>
    </View>
  );
}

const TableImage = props => (
  <ImageBackground
    source={{uri: props.image}}
    style={{width: '100%', height: 320, resizeMode: 'contain'}}
  />
);

const TableNo = props => (
  <Text
    style={{
      fontSize: 25,
      fontWeight: '600',
      marginTop: 10,
      color: 'white',
      marginHorizontal: 15,
    }}>
    {props.title}
  </Text>
);

const TableDescription = props => (
  <Text
    style={{
      fontSize: 15,
      fontWeight: '400',
      marginTop: 10,
      marginBottom: 10,
      color: 'white',
      marginHorizontal: 15,
    }}>
    {props.description}
  </Text>
);
const Perks = props => (
  <Text
    style={{
      fontSize: 15,
      fontWeight: '400',
      marginTop: 10,
      marginBottom: 10,
      color: 'white',
      marginHorizontal: 15,
    }}>
    {/* {props.perks} */}
  </Text>
);
