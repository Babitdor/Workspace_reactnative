import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Ticket from 'react-native-vector-icons/Entypo';
import Seat from 'react-native-vector-icons/MaterialIcons';
import Calendar from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {Divider} from '@rneui/base';
import CustomTimer from '../../timer/CustomTimer';
import moment from 'moment';

export default function PurchasesPage(props) {
  const navigation = useNavigation();

  // function Countdown() {
  //   const{Timer} = useContext(AuthContext);
  //   console.log(Timer)
  //   return(<View><Timer/></View>)
  // }
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={props.items}
      renderItem={({item, index}) => {
        return (
          <Animatable.View
            useNativeDriver
            animation="fadeInUp"
            // delay={500}
            style={styles.itemstyle}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Ticket', {
                  Ticket: item,
                  id: index,
                });
              }}>
              <View
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
                        fontSize: 20,
                        marginBottom: 10,
                        fontWeight: 'bold',
                        backgroundColor: 'rgba(137, 252, 233, 1)',
                        flex: 1,
                        marginHorizontal: -15,
                        padding: 10,
                        color: 'black',
                        borderRadius: 5,
                      },
                    ]}>
                    Ticket {index + 1}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      alignItems: 'flex-start',
                    }}>
                    <View>
                      <Ticket name="ticket" size={25} color={'white'} />
                    </View>
                    <View>
                      <Text
                        style={[
                          styles.text,
                          {
                            marginLeft: 10,
                            fontWeight: 'bold',
                            fontSize: 20,
                          },
                        ]}>
                        {item._data.Type}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View>
                        <Seat name="event-seat" size={25} color="white" />
                      </View>
                      <View>
                        <Text style={[styles.text, {marginLeft: 5}]}>
                          Seat no.
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text
                        style={[
                          styles.text,
                          {
                            color: 'cyan',
                            fontWeight: 'bold',
                            fontSize: 20,
                          },
                        ]}>
                        {item._data.seatsNo + ''}
                      </Text>
                    </View>
                  </View>
                </View>
                <Divider width={2} />

                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                  <View>
                    <Calendar name="calendar" size={25} color="white" />
                  </View>
                  <View>
                    <Text style={[styles.text, {marginLeft: 8}]}>
                      {moment(item._data.Date).format('Do MMMM YYYY')}
                    </Text>
                  </View>
                </View>
              </View>
              <CustomTimer time={item._data.StartTime} date={item._data.Date} />
            </TouchableOpacity>
          </Animatable.View>
        );
      }}
      horizontal={false}
    />
  );
}

const styles = StyleSheet.create({
  itemstyle: {
    flex: 1,
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 4,
    backgroundColor: '#181818',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 8,
  },

  title: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
  },
});
