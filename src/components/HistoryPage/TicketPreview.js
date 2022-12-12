import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import TicketIcon from 'react-native-vector-icons/Entypo';
import Clock from 'react-native-vector-icons/AntDesign';
import Seat from 'react-native-vector-icons/MaterialIcons';
import Calendar from 'react-native-vector-icons/Entypo';
import {Divider} from '@rneui/base';
import {AuthContext} from '../../navigation/AuthProvider';
import {FlatList} from 'react-native';
import moment from 'moment';
export default function TicketPreview({route}) {
  const {Ticket, id} = route.params;
  const {isDarkMode} = useContext(AuthContext);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? 'black' : 'white',
      }}>
      <View
        style={[
          styles.footer,
          {backgroundColor: isDarkMode ? 'black' : 'white'},
        ]}>
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
                  color: isDarkMode ? 'white' : 'black',
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
                  color: isDarkMode ? 'white' : 'black',
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
                    color={isDarkMode ? 'rgba(137, 252, 233, 1)' : 'gray'}
                  />
                </View>
                <View>
                  <Text
                    style={[
                      styles.text,
                      {marginLeft: 5, color: isDarkMode ? 'white' : 'black'},
                    ]}>
                    Seat no.
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  style={[
                    styles.text,
                    {
                      color: isDarkMode ? 'rgba(137, 252, 233, 1)' : 'gray',
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
                    color={isDarkMode ? 'rgba(137, 252, 233, 1)' : 'gray'}
                  />
                </View>
                <View>
                  <Text
                    style={[
                      styles.text,
                      {
                        fontWeight: 'bold',
                        fontSize: 18,
                        color: isDarkMode ? 'white' : 'black',
                      },
                    ]}>
                    Start
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  style={[
                    styles.text,
                    {fontSize: 18, color: isDarkMode ? 'white' : 'black'},
                  ]}>
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
                  color={isDarkMode ? 'rgba(137, 252, 233, 1)' : 'gray'}
                />
              </View>
              <View>
                <Text
                  style={[
                    styles.text,
                    {color: isDarkMode ? 'white' : 'black'},
                  ]}>
                  {Ticket._data.Date}
                </Text>
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
                    color={isDarkMode ? 'rgba(137, 252, 233, 1)' : 'gray'}
                  />
                </View>
                <View>
                  <Text
                    style={[
                      styles.text,
                      {
                        fontWeight: 'bold',
                        fontSize: 18,
                        color: isDarkMode ? 'white' : 'black',
                      },
                    ]}>
                    End
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  style={[
                    styles.text,
                    {fontSize: 18, color: isDarkMode ? 'white' : 'black'},
                  ]}>
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
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: isDarkMode ? 'white' : 'black',
                  },
                ]}>
                Total :{' '}
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.text,
                  {fontSize: 20, color: isDarkMode ? 'white' : 'black'},
                ]}>
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
                color: isDarkMode ? 'white' : 'black',
                marginBottom: 10,
                borderBottomWidth: 1,
                fontSize: 16,
                borderColor: isDarkMode?'rgba(137, 252, 233, 1)':'gray',
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
                <Items items={item} isDarkMode={isDarkMode} />
                <Divider width={0.2} color={isDarkMode ? 'white' : 'black'} />
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
      <Text style={{fontSize: 18, color: props.isDarkMode ? 'white' : 'black'}}>
        {props.items.title}
      </Text>
    </View>
    <View>
      <Text style={{fontSize: 15, color: props.isDarkMode ? 'white' : 'black'}}>
        {props.items.price}
      </Text>
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
