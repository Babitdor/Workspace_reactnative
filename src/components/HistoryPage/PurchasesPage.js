import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Ticket from 'react-native-vector-icons/Entypo';
import Calendar from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import CustomTimer from '../timer/CustomTimer';
import moment from 'moment';

export default function PurchasesPage(props) {
  const navigation = useNavigation();
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={props.items}
      renderItem={({item, index}) => {
        return (
          <Animatable.View
            useNativeDriver
            animation="fadeInUp"
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
                }}>
                <View
                  style={{
                    backgroundColor: 'rgba(137, 252, 233, 1)',
                    flexDirection: 'row',
                    borderTopLeftRadius:10,
                    borderTopRightRadius:10,
                    padding: 10,
                    alignItems: 'center',
                  }}>
                  <View>
                    <Ticket name="ticket" size={25} color={'black'} />
                  </View>
                  <View>
                    <Text
                      style={[
                        styles.text,
                        {marginLeft: 10, color: 'black', fontSize: 16,fontWeight:'bold'},
                      ]}>
                      {item._data.Type}:
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={[
                        styles.text,
                        {
                          marginLeft: 10,
                          fontWeight: '100',
                          fontSize: 16,
                          color: 'black',
                        },
                      ]}>
                      {item._data.BookingID}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 10,
                    marginHorizontal:10,
                    marginBottom: 10,
                  }}>
                  <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <View>
                      <Calendar name="calendar" size={25} color="white" />
                    </View>
                    <View>
                      <Text
                        style={[styles.text, {marginLeft: 8, fontSize: 14}]}>
                        {moment(item._data.Date).format('DD/MM/YYYY')}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <CustomTimer
                      time={item._data.StartTime}
                      date={item._data.Date}
                    />
                  </View>
                </View>
              </View>
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
