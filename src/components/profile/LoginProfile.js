import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import React, {useState, useContext, useEffect} from 'react';
import Signout from 'react-native-vector-icons/Ionicons';
import Home from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import {AuthContext} from '../../navigation/AuthProvider';
import {useNavigation} from '@react-navigation/native';
import User from 'react-native-vector-icons/AntDesign';
import Edit from 'react-native-vector-icons/AntDesign';
import Email from 'react-native-vector-icons/AntDesign';
import Phone from 'react-native-vector-icons/AntDesign';
import Cake from 'react-native-vector-icons/Entypo';
import Gender from 'react-native-vector-icons/Ionicons';
import Loading from '../home/Loading';

export default function LoginScreen(props) {
  const {logout} = useContext(AuthContext);
  const {user, setRefresh, Refresh} = useContext(AuthContext);
  const UserData = props.UserData;
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            padding: 15,
            zIndex: 100,
            justifyContent: 'flex-end',
          }}>
          <View>
            <TouchableOpacity onPress={() => logout()}>
              <View style={{alignItems: 'center', flexDirection: 'column'}}>
                <Signout
                  name="exit-outline"
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
            {UserData.Name}
          </Text>
        </View>

        <Animatable.View style={styles.footer} animation="fadeInUpBig">
          <View style={{marginHorizontal: 10}}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditField', {Userdata: UserData})
              }>
              <View style={{alignItems: 'flex-end', flexDirection: 'column'}}>
                <Edit name="edit" size={30} color={'white'} />
              </View>
            </TouchableOpacity>
          </View>
          <Animatable.View
            useNativeDriver
            animation="fadeInLeft"
            delay={100}
            style={styles.card}>
            <View>
              <User name="user" size={25} color={'rgba(137, 252, 233, 1)'} />
            </View>

            <View style={styles.aligment}>
              <View>
                <Text style={[styles.text_header, {marginLeft: 8}]}>Name</Text>
              </View>
              <View>
                <Text style={[styles.text_footer, {marginLeft: 15}]}>
                  {UserData.Name}
                </Text>
              </View>
            </View>
          </Animatable.View>

          <Animatable.View
            useNativeDriver
            animation="fadeInLeft"
            delay={500}
            style={styles.card}>
            <Email name="mail" size={25} color={'rgba(137, 252, 233, 1)'} />
            <View style={styles.aligment}>
              <View>
                <Text style={[styles.text_header, {marginLeft: 8}]}>Email</Text>
              </View>
              <View>
                <Text style={[styles.text_footer, {marginLeft: 15}]}>
                  {user.email}
                </Text>
              </View>
            </View>
          </Animatable.View>

          <Animatable.View
            useNativeDriver
            animation="fadeInLeft"
            delay={1000}
            style={styles.card}>
            <Phone
              name="phone"
              size={responsiveScreenFontSize(2.5)}
              color={'rgba(137, 252, 233, 1)'}
            />
            <View style={styles.aligment}>
              <View>
                <Text style={[styles.text_header, {marginLeft: 8}]}>Phone</Text>
              </View>
              <View>
                <Text style={[styles.text_footer, {marginLeft: 15}]}>
                  {UserData.PhoneNo}
                </Text>
              </View>
            </View>
          </Animatable.View>

          <Animatable.View
            useNativeDriver
            animation="fadeInLeft"
            delay={1200}
            style={styles.card}>
            <Cake
              name="cake"
              size={responsiveScreenFontSize(2.5)}
              color={'rgba(137, 252, 233, 1)'}
            />
            <View style={styles.aligment}>
              <View>
                <Text style={[styles.text_header, {marginLeft: 8}]}>
                  Date of Birth
                </Text>
              </View>
              <View>
                <Text style={[styles.text_footer, {marginLeft: 15}]}>
                  {UserData.Date_of_Birth}
                </Text>
              </View>
            </View>
          </Animatable.View>

          <Animatable.View
            useNativeDriver
            animation="fadeInLeft"
            delay={1400}
            style={styles.card}>
            <Gender
              name={
                UserData
                  ? UserData.Gender == 'Male'
                    ? 'male'
                    : 'female'
                  : 'male'
              }
              size={responsiveScreenFontSize(2.5)}
              color={'rgba(137, 252, 233, 1)'}
            />
            <View style={styles.aligment}>
              <View>
                <Text style={[styles.text_header, {marginLeft: 8}]}>
                  Gender
                </Text>
              </View>
              <View>
                <Text style={[styles.text_footer, {marginLeft: 15}]}>
                  {UserData.Gender}
                </Text>
              </View>
            </View>
          </Animatable.View>
        </Animatable.View>
      </View>
    </>
  );
}

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;
const styles = StyleSheet.create({
  container: {
    flex: responsiveScreenHeight(1),
    backgroundColor: 'black',
  },
  aligment: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
  },
  card: {
    padding: 12,
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
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
    backgroundColor: '#181818',
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
