import {View, Text, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import ArrowLeft from 'react-native-vector-icons/AntDesign';
import AdditionalItem from '../components/tablebook/AdditionalItems';
import ConferenceCart from '../components/conference/ConferenceCart';
import {AuthContext} from '../navigation/AuthProvider';
export default function ConferenceBook({route, navigation}) {
  const {isDarkMode} = useContext(AuthContext);
  return (
    <SafeAreaView
      style={{backgroundColor: isDarkMode?'black':'white', height: '100%', width: '100%'}}>
      <View
        style={{
          alignItems: 'flex-start',
          flexDirection: 'column',
          padding: 15,
          position: 'absolute',
          zIndex: 999,
          top: 47,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft
            name="arrowleft"
            size={25}
            color={'white'}
            style={{
              alignSelf: 'center',
              zIndex: 3,
              borderRadius: 50,
              padding: 8,
              shadowColor: 'black',
              shadowOpacity: 0.2,
              shadowOffset: {width: -2, height: 4},
              shadowRadius: 3,
              elevation: 2,
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={{padding: 20, alignItems: 'center'}}>
        <Text style={{color: isDarkMode?'white':'black', fontSize: 25, fontWeight: '600'}}>
          Add Ons
        </Text>
      </View>
      <AdditionalItem />

      <ConferenceCart seats={route.params} Date_Time={route.params} />
    </SafeAreaView>
  );
}
