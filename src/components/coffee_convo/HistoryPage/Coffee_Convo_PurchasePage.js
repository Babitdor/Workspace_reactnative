import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Food from 'react-native-vector-icons/Ionicons';
import Calendar from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import Loading from '../../home/Loading';
import moment from 'moment';
export default function Coffee_Convo_PurchasePage(props) {
  const navigation = useNavigation();

  return (
    <>
      {props.items ? (
        <>
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
                      navigation.navigate('CoffeeConvoTicket', {
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
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: 10,
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                          backgroundColor: 'rgba(137, 252, 233, 1)',
                          marginBottom: 15,
                        }}>
                        <View>
                          <Food name="fast-food" size={25} color={'black'} />
                        </View>
                        <View>
                          <Text
                            style={[
                              styles.text,
                              {
                                color: 'black',
                                marginLeft: 10,
                                fontWeight: 'bold',
                              },
                            ]}>
                            Order :{' '}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={[
                              styles.text,
                              {color: 'black', marginLeft: 10},
                            ]}>
                            {item._data.BookingID}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginBottom: 10,
                          marginHorizontal: 15,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            alignItems: 'flex-start',
                          }}>
                          <View>
                            <Text
                              style={[
                                styles.text,
                                {
                                  marginLeft: 10,
                                  fontWeight: 'bold',
                                  fontSize: 18,
                                },
                              ]}>
                              {item._data.Type}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}>
                          <View>
                            <Calendar name="calendar" size={25} color="white" />
                          </View>
                          <View>
                            {item ? (
                              <Text style={[styles.text, {fontSize: 16}]}>
                                {moment(
                                  new Date(item._data.createdAt.seconds * 1000),
                                ).format('DD/MM/YYYY')}
                              </Text>
                            ) : (
                              <></>
                            )}
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Animatable.View>
              );
            }}
            horizontal={false}
          />
        </>
      ) : (
        <Loading />
      )}
    </>
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
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
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
