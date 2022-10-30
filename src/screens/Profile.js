import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import React, {useState, useContext} from 'react';
import Signout from 'react-native-vector-icons/FontAwesome';
import Home from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import {AuthContext} from '../navigation/AuthProvider';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import User from 'react-native-vector-icons/AntDesign';
import Email from 'react-native-vector-icons/AntDesign';
import Phone from 'react-native-vector-icons/AntDesign';
import Cake from 'react-native-vector-icons/Entypo';

export default function LoginScreen() {
  const {logout} = useContext(AuthContext);
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{width: '100%', height: '100%', backgroundColor: 'black'}}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            padding: 15,
            zIndex: 100,
            justifyContent: 'space-between',
          }}>
          <View
            style={{backgroundColor: 'white', padding: 8, borderRadius: 50}}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Home
                name="home"
                size={25}
                color={'black'}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => logout()}>
              <View style={{alignItems: 'center', flexDirection: 'column'}}>
                <Signout
                  name="sign-out"
                  size={responsiveScreenFontSize(2.5)}
                  color={'#B3B3B3'}
                />
                <Text style={{color: 'white'}}>Sign Out</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.header}>
          <Image
            style={{
              width: 80,
              height: 80,
              borderRadius: 100,
            }}
            resizeMode="contain"
            source={{
              uri: user.photoURL,
            }}
          />
          <Text
            style={{
              fontSize: responsiveScreenFontSize(2),
              color: 'white',
              marginTop: 20,
            }}>
            {user.displayName}
          </Text>
        </View>

        <Animatable.View style={styles.footer} animation="fadeInUpBig">
          <Text style={styles.text_header}>Name</Text>
          <Animatable.View
            useNativeDriver
            animation="fadeInLeft"
            delay={100}
            style={styles.card}>
            <User
              name="user"
              size={responsiveScreenFontSize(2.5)}
              color={'white'}
            />
            <Text style={[styles.text_footer, {marginLeft: 15}]}>
              {user.displayName}
            </Text>
          </Animatable.View>

          <Text style={styles.text_header}>Email</Text>
          <Animatable.View
            useNativeDriver
            animation="fadeInLeft"
            delay={500}
            style={styles.card}>
            <Email
              name="mail"
              size={responsiveScreenFontSize(2.5)}
              color={'white'}
            />
            <Text style={[styles.text_footer, {marginLeft: 15}]}>
              {user.email}
            </Text>
          </Animatable.View>

          <Text style={styles.text_header}>Phone</Text>
          <Animatable.View
            useNativeDriver
            animation="fadeInLeft"
            delay={1000}
            style={styles.card}>
            <Phone
              name="phone"
              size={responsiveScreenFontSize(2.5)}
              color={'white'}
            />
            <Text style={[styles.text_footer, {marginLeft: 15}]}>
              {user.phonenumber}
            </Text>
          </Animatable.View>

          <Text style={styles.text_header}>Date of Birth</Text>
          <Animatable.View
            useNativeDriver
            animation="fadeInLeft"
            delay={1400}
            style={styles.card}>
            <Cake
              name="cake"
              size={responsiveScreenFontSize(2.5)}
              color={'white'}
            />
            <Text style={[styles.text_footer, {marginLeft: 15}]}>
              14-09-1999
            </Text>
          </Animatable.View>
        </Animatable.View>
      </View>
    </SafeAreaView>
  );
}

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;
const styles = StyleSheet.create({
  container: {
    flex: responsiveScreenHeight(1),
    backgroundColor: 'black',
  },
  card: {
    backgroundColor: '#181818',
    padding: 12,
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    shadowOpacity: 0.2,
    shadowOffset: {width: -2, height: 4},
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flex: responsiveScreenHeight(0.15),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingBottom: 40,
  },
  footer: {
    flex: responsiveScreenHeight(0.5),
    backgroundColor: '#242526',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 35,
    paddingHorizontal: 20,
  },
  text_header: {
    color: 'white',
    fontSize: responsiveScreenFontSize(1.8),
    padding: 8,
  },
  text_footer: {
    color: 'white',
    fontSize: responsiveFontSize(1.8),
  },
});
