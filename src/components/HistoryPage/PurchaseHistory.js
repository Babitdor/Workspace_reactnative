import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {firebase} from '@react-native-firebase/firestore';
import {useEffect} from 'react';
import {useContext} from 'react';
import {AuthContext} from '../../navigation/AuthProvider';
import {useState} from 'react';
import Refreshs from 'react-native-vector-icons/EvilIcons';
import * as Animatable from 'react-native-animatable';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import PurchasesPage from './PurchasesPage';
import TicketButtons from './TicketButtons';

export default function PurchaseHistory() {
  const {user, TicketType, isDarkMode} = useContext(AuthContext);
  const [TableTickets, setTickets] = useState();

  useEffect(() => {
    async function FetchData() {
      const snapshot = await firebase
        .firestore()
        .collection(TicketType)
        .doc(user.uid)
        .collection('Orders')
        .onSnapshot(documentSnapshot => {
          setTickets(documentSnapshot.docs);
        });
      return () => snapshot();
    }
    FetchData();
  }, [TicketType]); //Refresh

  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: isDarkMode ? 'black' : 'white',
      }}>
      <View
        style={[
          styles.container,
          {backgroundColor: isDarkMode ? 'black' : 'white'},
        ]}>
        <View style={styles.header}>
          {TicketType === 'BookATable' ? (
            <Animatable.View animation="fadeInUp" useNativeDriver>
              <Image
                resizeMode="contain"
                source={require('../../assets/PageIcons/TableLogo.png')}
                style={{width: 400, height: 300}}
              />
            </Animatable.View>
          ) : (
            <Animatable.View animation="fadeInUp" useNativeDriver>
              <Image
                resizeMode="contain"
                source={require('../../assets/PageIcons/ConferenceLogo.png')}
                style={{width: 400, height: 300}}
              />
            </Animatable.View>
          )}
          {/* <Text style={styles.title}>Table & Conference History</Text> */}
        </View>
        <Animatable.View
          animation="fadeInUpBig"
          style={[
            styles.footer,
            {backgroundColor: isDarkMode ? '#181818' : '#EEEEEE'},
          ]}
          useNativeDriver>
          <View style={{alignItems: 'center', marginBottom: 20, marginTop: 20}}>
            <TicketButtons />
          </View>
          <PurchasesPage items={TableTickets} />
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
    flex: 2,
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
