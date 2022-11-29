import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import TicketIcon from 'react-native-vector-icons/Entypo';
import Clock from 'react-native-vector-icons/AntDesign';
import Seat from 'react-native-vector-icons/MaterialIcons';
import Calendar from 'react-native-vector-icons/Entypo';
import {Divider} from '@rneui/base';
import {FlatList} from 'react-native';
import moment from 'moment';
export default function TicketPreview({route}) {
  const {Ticket, id} = route.params;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
      <View style={styles.footer}>
        <View key={id} style={styles.TopCard}>
          <View>
            <Text
              style={[
                styles.text,
                {
                  fontSize: 20,
                  marginBottom: 0,
                  fontWeight: 'bold',
                  padding: 10,
                  color: 'white',
                  textAlign: 'center',
                },
              ]}>
              {Ticket._data.Type} {id + 1}
            </Text>
          </View>
          <View>
            <Text
              style={[
                styles.text,
                {
                  fontSize: 16,
                  fontWeight: 'bold',
                  padding: 10,
                  marginBottom: 10,
                  color: 'white',
                  textAlign: 'center',
                },
              ]}>
              Booking ID : {Ticket._data.BookingID}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 10,
            }}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                <View>
                  <Seat
                    name="event-seat"
                    size={25}
                    color="rgba(137, 252, 233, 1)"
                  />
                </View>
                <View>
                  <Text style={[styles.text, {marginLeft: 5}]}>Seat no.</Text>
                </View>
              </View>
              <View>
                <Text
                  style={[
                    styles.text,
                    {
                      color: 'rgba(137, 252, 233, 1)',
                      fontWeight: 'bold',
                      fontSize: 25,
                    },
                  ]}>
                  {Ticket._data.seatsNo + ''}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 20,
            }}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                <View>
                  <Clock
                    name="clockcircleo"
                    size={25}
                    color="rgba(137, 252, 233, 1)"
                  />
                </View>
                <View>
                  <Text
                    style={[
                      styles.text,
                      {
                        fontWeight: 'bold',
                        fontSize: 18,
                      },
                    ]}>
                    Start
                  </Text>
                </View>
              </View>
              <View>
                <Text style={[styles.text, {fontSize: 18}]}>
                  {moment(Ticket._data.StartTime, 'HH:mm:ss').format('LT')}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <View>
                <Calendar
                  name="calendar"
                  size={25}
                  color="rgba(137, 252, 233, 1)"
                />
              </View>
              <View>
                <Text style={[styles.text]}>{Ticket._data.Date}</Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                <View>
                  <Clock
                    name="clockcircleo"
                    size={25}
                    color="rgba(137, 252, 233, 1)"
                  />
                </View>
                <View>
                  <Text
                    style={[
                      styles.text,
                      {
                        fontWeight: 'bold',
                        fontSize: 18,
                      },
                    ]}>
                    End
                  </Text>
                </View>
              </View>
              <View>
                <Text style={[styles.text, {fontSize: 18}]}>
                  {moment(Ticket._data.EndTime, 'HH:mm:ss').format('LT')}
                </Text>
              </View>
            </View>
          </View>
          <Divider width={1} style={{marginHorizontal: -12}} />
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <View>
              <Text style={[styles.text, {fontSize: 18, fontWeight: 'bold'}]}>
                Total :{' '}
              </Text>
            </View>
            <View>
              <Text style={[styles.text, {fontSize: 20}]}>
                {Ticket._data.total}/-
              </Text>
            </View>
          </View>
        </View>

        <View>
          <Text
            style={[
              styles.text,
              {
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: 10,
                borderBottomWidth: 1,
                fontSize: 16,
                borderColor: 'rgba(137, 252, 233, 1)',
                padding: 6,
                margin: 6,
              },
            ]}>
            Items
          </Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={Ticket._data.items}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  padding: 5,
                  flex: 1,
                  height: '100%',
                  borderRadius: 10,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  margin: 10,
                }}>
                <Items items={item} />
                <Divider width={0.2} color="white" />
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
      flex: 1,
      justifyContent: 'space-between',
      paddingVertical: 5,
      flexDirection: 'row',
      borderColor: 'black',
      alignItems: 'center',
    }}>
    <View>
      <Image
        style={{width: 40, height: 40, resizeMode: 'contain', borderRadius: 5}}
        source={{uri: props.items.image}}
      />
    </View>
    <View>
      <Text style={{fontSize: 18, color: 'white'}}>{props.items.title}</Text>
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
    backgroundColor: '#181818',
    borderRadius: 30,
    paddingVertical: 1,
    paddingHorizontal: 8,
  },
  text: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
  },
  TopCard: {
    flexDirection: 'column',
    borderRadius: 20,
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
  },
});
