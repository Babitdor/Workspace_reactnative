import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../../navigation/AuthProvider';
import * as Animatable from 'react-native-animatable';
const Buttons = [
  {
    id: 1,
    title: 'Table Booking',
    value: 'BookATable',
    image: require('../../assets/NavOps/TableBook.png'),
  },
  {
    id: 2,
    title: 'Conference Booking',
    value: 'BookAConference',
    image: require('../../assets/NavOps/ConferenceBooking.png'),
  },
];

export default function TicketButtons(props) {
  const {setTicketType} = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('Table Booking');
  const HeaderButton = props => (
    <TouchableOpacity key={props.id} onPress={() => ChoosingCategory(props)}>
      <View
        useNativeDriver
        animation="fadeIn"
        delay={500}
        style={{
          padding: 10,
          marginHorizontal: 6,
          // borderRadius: 20,
          alignItems: 'center',
          flexDirection: 'row',
          borderBottomWidth: 1,
          justifyContent: 'space-between',
          borderColor:
            props.activeTab === props.title
              ? 'rgba(137, 252, 233, 1)'
              : '#181818',
        }}>
        <View>
          <Image
            source={props.image}
            style={{width: 30, height: 30, marginRight: 8}}
          />
        </View>
        <View>
          <Text
            style={{
              color: props.activeTab === props.title ? 'rgba(137, 252, 233, 1)' : 'white',
              marginLeft: 2,
              fontSize: 16,
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
    setTicketType(props.value);
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
