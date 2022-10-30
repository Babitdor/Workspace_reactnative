import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import NavOptions from '../components/home/NavOptions';
import Settings from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable';

export default function Home({navigation}) {
  return (
    <SafeAreaView
      style={{height: '100%', width: '100%', backgroundColor: 'black'}}>
      <View
        style={{
          flexDirection: 'row',
          padding: 15,
          zIndex: 100,
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={{backgroundColor: 'white', padding: 8, borderRadius: 100}}>
          <Settings name="menu" size={25} color={'black'} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Animatable.View animation="fadeInUp" style={styles.header}>
          <Animatable.View
            animation="fadeInUp"
            delay={600}
            style={{padding: 20, marginBottom: 15}}>
            <Image
              style={{
                width: 140,
                height: 100,
                alignSelf: 'center',
                tintColor: 'white',
                resizeMode: 'contain',
              }}
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png',
              }}
            />
            <Text
              style={[styles.Text, {alignSelf: 'center', marginBottom: 20}]}>
              Let's Begin Booking!
            </Text>
          </Animatable.View>
        </Animatable.View>

        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <NavOptions navigation={navigation} />
        </Animatable.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  TextInput: {
    width: responsiveWidth(78),
    backgroundColor: '#242526',
    padding: 8,
    borderRadius: 15,
    marginBottom: 10,
    marginHorizontal: 15,
    paddingHorizontal: 20,
  },
  TextInputTime: {
    width: responsiveWidth(35),
    backgroundColor: '#242526',
    padding: 8,
    borderRadius: 15,
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 15,
    paddingHorizontal: 20,
  },
  Text: {
    color: 'white',
    fontSize: responsiveFontSize(1.7),
  },
  container: {
    flex: responsiveHeight(1),
    // backgroundColor: '#181818',
  },
  header: {
    flex: responsiveHeight(0.1),
    justifyContent: 'flex-end',
  },
  footer: {
    flex: 2,
    backgroundColor: '#242526',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});
