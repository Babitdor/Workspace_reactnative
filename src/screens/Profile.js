import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useContext} from 'react';
import {Platform} from 'react-native';
import Signout from 'react-native-vector-icons/FontAwesome';
import Home from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import {AuthContext} from '../navigation/AuthProvider';
import {TextInput} from 'react-native-gesture-handler';
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
      style={{width: '100%', height: '100%', backgroundColor: '#181818'}}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            padding: 20,
            justifyContent: 'space-between',
          }}>
          <View
            style={{backgroundColor: 'white', padding: 10, borderRadius: 50}}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Home name="home" size={25} color={'black'} />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => logout()}>
              <View style={{alignItems: 'center', flexDirection: 'column'}}>
                <Signout name="sign-out" size={25} color={'#B3B3B3'} />
                <Text style={{color: 'white'}}>Sign Out</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>




        <View style={styles.header}>
          <Image
            style={{width: 100, height: 100, borderRadius: 100}}
            resizeMode="contain"
            source={{
              uri: 'https://img.wattpad.com/dcc51dacf5793b0fed0ad857b8e8d56eab8b7477/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f50463855657457525148674f30513d3d2d3631393433333234382e313534623938343362633539623539363434383238363833383832302e6a7067?s=fit&w=720&h=720',
            }}
          />
          <Text style={{fontSize: 18, color: 'white', marginTop: 20}}>
            {user.email}
          </Text>
        </View>

        <Animatable.View style={styles.footer} animation="fadeInUpBig">
          <Text style={{color: 'white', fontSize: 18, padding: 8}}>Name</Text>
          <Animatable.View
            useNativeDriver
            animation="fadeInLeft"
            delay={100}
            style={styles.card}>
            <User name='user' size={30} color={'white'}/>
            <Text style={[styles.text_footer,{marginLeft:15}]}>Babitdor</Text>
          </Animatable.View>
          
          <Text style={{color: 'white', fontSize: 18, padding: 8}}>Email</Text>
          <Animatable.View
            useNativeDriver
            animation="fadeInLeft"
            delay={500}
            style={styles.card}>
                <Email name='mail' size={30} color={'white'}/>
            <Text style={[styles.text_footer,{marginLeft:15}]}>babitdorbryan14@gmail.com</Text>
          </Animatable.View>
          
          <Text style={{color: 'white', fontSize: 18, padding: 8}}>Phone</Text>
          <Animatable.View
            useNativeDriver
            animation="fadeInLeft"
            delay={1000}
            style={styles.card}>
            <Phone name='phone' size={30} color={'white'}/>
            <Text style={[styles.text_footer,{marginLeft:15}]}>+91 697556565</Text>
          </Animatable.View>
          
          <Text style={{color: 'white', fontSize: 18, padding: 8}}>
            Date of Birth
          </Text>
          <Animatable.View
            useNativeDriver
            animation="fadeInLeft"
            delay={1400}
            style={styles.card}>
                <Cake name='cake' size={30} color={'white'}/>
            <Text style={[styles.text_footer,{marginLeft:15}]}>14-09-1999</Text>
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
    flex: 1,
    backgroundColor: '#181818',
  },
  card: {
    backgroundColor: '#181818',
    padding: 15,
    borderRadius:10,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    shadowOpacity: 0.2,
    shadowOffset: {width: -2, height: 4},
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#242526',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 35,
    paddingHorizontal: 20,
  },
  text_header: {
    color: 'white',
    colorWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: 'white',
    fontSize: 20,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  TextInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    fontSize: 25,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  signIn: {
    width: '100%',
    height: 60,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  textSign: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
