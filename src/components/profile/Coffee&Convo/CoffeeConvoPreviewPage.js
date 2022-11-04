import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import TicketIcon from 'react-native-vector-icons/Entypo';
import Clock from 'react-native-vector-icons/AntDesign';
import Seat from 'react-native-vector-icons/MaterialIcons';
import Calendar from 'react-native-vector-icons/Entypo';
import {Divider} from '@rneui/base';
import {FlatList} from 'react-native';
// import { Divider } from '@rneui/base';
export default function CoffeeConvoPreviewPage({route}) {
  const {Ticket, id} = route.params;
  //   console.log(Ticket._data.items);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
      }}>
      <View style={styles.footer}>
        <View
          key={id}
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <View>
            <Text
              style={[
                styles.text,
                {
                  fontSize: 25,
                  marginBottom: 10,
                  fontWeight: 'bold',
                  backgroundColor: 'rgba(137, 252, 233, 1)',
                  marginHorizontal: -15,
                  padding: 10,
                  color:'black',
                  borderRadius: 20,
                  textAlign: 'center',
                },
              ]}>
              Order {id + 1}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View>
                <TicketIcon name="ticket" size={25} color={'black'} />
              </View>
              <View>
                <Text
                  style={[
                    styles.text,
                    {
                      marginLeft: 10,
                      fontWeight: 'bold',
                      fontSize: 30,
                    },
                  ]}>
                  {Ticket._data.Type}
                </Text>
              </View>
            </View>
          </View>
          <Divider width={2} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}>
            <View>
              <Text style={[styles.text, {fontSize: 20, fontWeight: 'bold'}]}>
                Total :{' '}
              </Text>
            </View>
            <View>
              <Text style={[styles.text, {fontSize: 20}]}>
                {Ticket._data.total}
              </Text>
            </View>
          </View>
          <Divider width={2} />
        </View>
        <View>
          <Text
            style={[
              styles.text,
              {
                textAlign: 'center',
                fontWeight: 'bold',
                marginBottom: 10,
                backgroundColor: 'rgba(137, 252, 233, 1)',
                borderRadius: 20,
                padding: 10,
                margin: 8,
                color:'black'
              },
            ]}>
            Orders
          </Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={Ticket._data.items}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  backgroundColor: 'black',
                  padding: 5,
                  flex: 1,
                  borderRadius: 10,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  margin: 10,
                }}>
                <Items items={item} />
                <Divider width={0.2}/>
              </View>
            );
          }}
          horizontal={false}
        />
      </View>
    </SafeAreaView>
  );
}

const Items = props => (
  <View
    style={{
      //   width: 200,
      flex: 1,
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 5,
      flexDirection: 'row',
      alignItems: 'center',
    }}>
    <View>
      <Image
        style={{width: 80, height: 80, resizeMode: 'contain', borderRadius: 20}}
        source={{uri: props.items.image}}
      />
    </View>
    <View>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
        {props.items.title}
      </Text>
    </View>
    <View>
      <Text style={{fontSize: 15, color: 'white'}}>{props.items.price}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  footer: {
    flex: 8,
    backgroundColor: 'black',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 1,
    paddingHorizontal: 8,
  },
  text: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
  },
});
