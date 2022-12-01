import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {firebase} from '@react-native-firebase/database';
import Home from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
export default function Table_Conf_Complete(route) {
  const navigation = useNavigation();
  const [Tables, setTable] = useState([]);
  const reference = firebase.app().database();

  useEffect(() => {
    async function FetchData() {
      var snapshot = await firebase
        .app()
        .database()
        .ref('/Data/Tables/')
        .on('value', snapshot => {
          setTable(snapshot.val());
        });
      return () => database().ref(`/Data/Tables/`).off('value', snapshot);
    }
    FetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action and update data
      grayoutseats(route.route.params.Seats);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  const grayoutseats = async SelectedSeats => {
    await SelectedSeats.map(item => {
      for (var i = 0; i < Object.keys(Tables).length; i++) {
        for (var j = 0; j < Object.keys(Tables[i].seats).length; j++) {
          if (item.id === Tables[i].seats[j].id) {
            reference.ref(`/Data/Tables/${i}/seats/${j}`).update({
              booked: false,
              empty: false,
            });
          }
        }
      }
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <StatusBar translucent />
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            padding: 15,
            zIndex: 100,
            justifyContent: 'space-between',
          }}>
          <View
            style={{backgroundColor: 'white', padding: 8, borderRadius: 50}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={{zIndex: 999}}>
              <Home name="home" size={25} color={'black'} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.header}>
          <View>
            <LottieView
              style={styles.logo}
              source={require('../animations/Checkmark.json')}
              autoPlay
              loop={false}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.title}>
            Your Order has been placed for {route.route.params.totalRs}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 3,
    backgroundColor: '#181818',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo / 2,
    tintColor: 'white',
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'black',
    marginTop: 5,
  },
});
