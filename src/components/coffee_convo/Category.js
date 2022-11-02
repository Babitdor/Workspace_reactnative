import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import * as Animatable from 'react-native-animatable';
import {AuthContext} from '../../navigation/AuthProvider';
const Buttons = [
  {
    id: 1,
    title: 'Starters',
    image: require('../../assets/Buttons/Starter.png'),
    value: 'Starters',
  },
  {
    id: 2,
    title: 'Main Course',
    image: require('../../assets/Buttons/Main.png'),
    value: 'Main',
  },
  {
    id: 3,
    title: 'Desserts',
    image: require('../../assets/Buttons/Dessert.png'),
    value: 'Desserts',
  },
  {
    id: 4,
    title: 'Beverages',
    image: require('../../assets/Buttons/Beverage.png'),
    value: 'Beverages',
  },
];

export default function Category(props) {
  const {setCategory} = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('Starters');
  const HeaderButton = props => (
    <TouchableOpacity key={props.id} onPress={() => ChoosingCategory(props)}>
      <View
        useNativeDriver
        animation="fadeInUp"
        delay={500}
        style={{
          padding: 10,
          marginHorizontal: 6,
          borderRadius: 20,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor:
            props.activeTab === props.title
              ? 'rgba(137, 252, 233, 1)'
              : '#181818',
        }}>
        <View>
          <Image
            source={props.image}
            style={{
              width: 25,
              height: 25,
              tintColor: props.activeTab === props.title ? 'black' : 'white',
              resizeMode: 'contain',
            }}
          />
        </View>
        <View>
          <Text
            style={{
              color: props.activeTab === props.title ? 'black' : 'white',
              marginLeft: 2,
              fontWeight: props.activeTab === props.title ? 'bold' : '100',
            }}>
            {props.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  const ChoosingCategory = props => {
    props.setActiveTab(props.title);
    setCategory(props.value);
  };
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={Buttons}
      keyExtractor={item => item.id}
      renderItem={({item, index}) => {
        return (
          <HeaderButton
            id={item.id}
            image={item.image}
            title={item.title}
            value={item.value}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        );
      }}
      horizontal
    />
  );
}
