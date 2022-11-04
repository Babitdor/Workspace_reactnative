import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {firebase} from '@react-native-firebase/firestore';
import {useEffect} from 'react';
import {useContext} from 'react';
import {AuthContext} from '../../../navigation/AuthProvider';
import {useState} from 'react';
import Refreshs from 'react-native-vector-icons/EvilIcons';
import * as Animatable from 'react-native-animatable';
import {LogBox} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Coffee_Convo_PurchasePage from './Coffee_Convo_PurchasePage';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function Coffee_ConvoHistory() {
  const {user, setTicketType, TicketType} = useContext(AuthContext);
  const [Refresh, setRefresh] = useState(true);
  const [CoffeeTicket, setCoffeeTickets] = useState([]);
  useEffect(() => {
    async function FetchData() {
      const snapshot = await firebase
        .firestore()
        .collection('CoffeeConvoOrders')
        .doc(user.uid)
        .collection('Orders')
        .get();
      setCoffeeTickets(snapshot.docs);
    }
    FetchData();
  }, [Refresh]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
      }}>
      <View
        style={{
          flexDirection: 'row',
          padding: 15,
          zIndex: 100,
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          onPress={() => {
            setRefresh(Refresh => !Refresh);
          }}
          style={{padding: 8, borderRadius: 100}}>
          <Refreshs name="refresh" size={35} color={'white'} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Coffee & Convo Booking</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <Coffee_Convo_PurchasePage items={CoffeeTicket} />
        </Animatable.View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
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
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
  },
  text: {
    color: 'black',
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(0.5),
  },
});
