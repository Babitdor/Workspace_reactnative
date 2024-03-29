import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import ArrowLeft from 'react-native-vector-icons/AntDesign';
import {SafeAreaView} from 'react-native-safe-area-context';
import Bookingscreen from '../components/conference/Bookingscreen';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/database';
import { useContext } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
export default function Conference() {
  const [Data, SetDatabase] = useState();
  const navigation = useNavigation();
  const {isDarkMode} = useContext(AuthContext);
  useEffect(() => {
    async function FetchData() {
      var snapshot = await firebase
        .app()
        .database()
        .ref('/Data/Tables/')
        .once('value',snapshot => {
          SetDatabase(snapshot.val());
        });
    }
    FetchData();
  }, []);

  return (
    <>
      {Data ? (
        <SafeAreaView style={{backgroundColor: isDarkMode?'black':'white', flex: 1}}>
          <StatusBar translucent />
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 15,
              zIndex: 999,
            }}>
            <View>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowLeft
                  name="arrowleft"
                  size={25}
                  color={isDarkMode?'white':'black'}
                  style={{
                    alignSelf: 'center',
                    backgroundColor:isDarkMode?'black':'white',
                    zIndex: 100,
                    borderRadius: 50,
                    padding: 8,
                  }}
                />
              </TouchableOpacity>
            </View>
            <Animatable.View animation="fadeInUp" delay={400}>
              <Text
                style={{
                  color: isDarkMode?'white':'black',
                  textAlign: 'center',
                  fontSize: 25,
                  fontWeight: 'bold',
                  marginRight: 40,
                }}>
                Book A Conference
              </Text>
            </Animatable.View>
            <View></View>
          </View>

          <View style={{position: 'relative', width: '100%', height: '100%'}}>
            <Bookingscreen navigation={navigation} database={Data} />
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView
          style={{width: '100%', height: '100%', backgroundColor: 'black'}}
        />
      )}
    </>
  );
}
