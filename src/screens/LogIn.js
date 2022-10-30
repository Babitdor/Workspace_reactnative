import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import React, {useState, useContext} from 'react';
import {Platform} from 'react-native';
import * as Animatable from 'react-native-animatable';
import User from 'react-native-vector-icons/AntDesign';
import Lock from 'react-native-vector-icons/AntDesign';
import Check from 'react-native-vector-icons/AntDesign';
import Eye from 'react-native-vector-icons/Entypo';
import {AuthContext} from '../navigation/AuthProvider';
import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';

export default function LoginScreen() {
  const navigation = useNavigation();
  const {login, googleLogin} = useContext(AuthContext);
  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });

  const textInputChange = val => {
    if (val.length != 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  };
  const handlePasswordChange = val => {
    setData({
      ...data,
      password: val,
    });
  };
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome, Buddy!</Text>
      </View>

      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <User name="user" size={30} color="white" />
          <TextInput
            style={styles.TextInput}
            autoCapitalize="none"
            onChangeText={val => textInputChange(val)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Check name="checkcircleo" size={25} />
            </Animatable.View>
          ) : null}
        </View>
        <Text style={[styles.text_footer, {marginTop: 35}]}>Password</Text>
        <View style={styles.action}>
          <Lock name="lock" size={30} color='white' />
          <TextInput
            style={styles.TextInput}
            autoCapitalize="none"
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={val => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Eye name="eye-with-line" size={25} color='white'/>
            ) : (
              <Eye name="eye" size={25} color='white'/>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => login(data.email, data.password)}>
            <Text style={styles.textSign}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.signIn,
              {
                marginTop: 20,
                borderColor: 'black',
                borderWidth: 1,
                backgroundColor: 'white',
              },
            ]}
            onPress={() => navigation.navigate('SignIn')}>
            <Text style={[styles.textSign, {color: 'black'}]}>Register</Text>
          </TouchableOpacity>
          <View style={{alignSelf: 'center', padding: 10}}>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                fontWeight: '600',
                color: 'white',
                fontSize:25
              }}>
              OR
            </Text>
          </View>
          <GoogleSigninButton
            style={{width: '100%', height: 60}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => googleLogin()}
          />
        </View>
      </Animatable.View>
    </View>
  );
}

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;
const styles = StyleSheet.create({
  container: {
    flex: responsiveHeight(0.2),
    backgroundColor: 'black',
  },
  header: {
    flex: responsiveHeight(0.05),
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: responsiveHeight(0.25),
    backgroundColor: '#181818',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 35,
    paddingHorizontal: 30,
  },
  text_header: {
    color: 'white',
    alignSelf:'center',
    colorWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: 'white',
    fontSize: 18,
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
    fontSize: 18,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 30,
    padding: 10,
  },
  signIn: {
    width: responsiveWidth(70),
    height: responsiveHeight(8),
    backgroundColor: 'rgba(137, 252, 233, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  textSign: {
    fontSize: responsiveFontSize(2),
    color: 'black',
    fontWeight: 'bold',
  },
});
