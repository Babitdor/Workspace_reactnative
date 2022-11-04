import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../../../navigation/AuthProvider';
const Buttons = [
  {
    id: 1,
    title: 'Table Booking',
    value: 'BookATable',
  },
  {
    id: 2,
    title: 'Conference Booking',
    value: 'BookAConference',
  },
];

export default function TicketButtons(props) {
  const {setTicketType} = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('Table Booking');
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
          <Text
            style={{
              color: props.activeTab === props.title ? 'black' : 'white',
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
