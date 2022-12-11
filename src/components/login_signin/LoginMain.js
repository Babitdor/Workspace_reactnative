import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useContext} from 'react';
import {AuthContext} from '../../navigation/AuthProvider';
export default function LoginMain({navigation}) {
  const {isDarkMode} = useContext(AuthContext);
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? 'black' : 'white'},
      ]}>
      <View style={styles.header}>
        <Animatable.Image
          animation="fadeInUp"
          duration={1500}
          style={[styles.logo, {tintColor: isDarkMode ? 'white' : 'black'}]}
          resizeMode="stretch"
          source={require('../../assets/Workspace.png')}
        />
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {backgroundColor: isDarkMode ? '#181818' : '#EEEEEE'},
        ]}>
        <Text style={[styles.title, {color: isDarkMode ? 'white' : 'black'}]}>
          Come On And Chill with Us!
        </Text>
        <Text style={[styles.text, {color: isDarkMode ? 'white' : 'black'}]}>
          Sign in with an account
        </Text>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.buttonbtn}
            onPress={() => navigation.navigate('LogIn')}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;
const styles = StyleSheet.create({
  container: {
    flex: responsiveHeight(0.4),
    backgroundColor: 'black',
  },
  header: {
    flex: responsiveHeight(0.3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: responsiveHeight(0.15),
    backgroundColor: '#181818',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  logo: {
    width: 400,
    height: 250,
    tintColor: 'white',
    resizeMode: 'contain',
  },
  title: {
    color: 'white',
    alignSelf: 'center',
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
    alignSelf: 'center',
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(0.5),
  },
  button: {
    alignItems: 'center',
    marginTop: responsiveHeight(2),
  },
  buttonbtn: {
    backgroundColor: 'rgba(137, 252, 233, 1)',
    width: responsiveWidth(50),
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: '700',
    fontSize: responsiveFontSize(2),
  },
});
