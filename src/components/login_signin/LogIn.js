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
} from 'react-native-responsive-dimensions';
import React, {useState, useContext} from 'react';
import {Platform} from 'react-native';
import * as Animatable from 'react-native-animatable';
import User from 'react-native-vector-icons/AntDesign';
import Lock from 'react-native-vector-icons/AntDesign';
import Check from 'react-native-vector-icons/AntDesign';
import Eye from 'react-native-vector-icons/Entypo';
import {AuthContext} from '../../navigation/AuthProvider';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();
  const {login, googleLogin, isDarkMode} = useContext(AuthContext);
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
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? 'black' : 'white'},
      ]}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/Waving.png')}
          resizeMode="contain"
          style={{width: '30%'}}
        />
      </View>
      <Text
        style={[styles.text_header, {color: isDarkMode ? 'white' : 'black'}]}>
        Welcome, Buddy!
      </Text>

      <Animatable.View style={[styles.footer]} animation="fadeInUpBig">
        <ScrollView>
          <View>
            <Text
              style={[
                styles.text_footer,
                {color: isDarkMode ? 'rgba(137, 252, 233, 1)' : 'black'},
              ]}>
              Email
            </Text>
            <View style={styles.action}>
              <User
                name="user"
                size={30}
                color={isDarkMode ? 'white' : 'black'}
              />
              <TextInput
                style={[
                  styles.TextInput,
                  {color: isDarkMode ? 'rgba(137, 252, 233, 1)' : 'black'},
                ]}
                autoCapitalize="none"
                onChangeText={val => textInputChange(val)}
              />
              {data.check_textInputChange ? (
                <Animatable.View animation="bounceIn">
                  <Check
                    name="checkcircleo"
                    size={25}
                    color={isDarkMode ? 'white' : 'black'}
                  />
                </Animatable.View>
              ) : null}
            </View>
            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 35,
                  color: isDarkMode ? 'rgba(137, 252, 233, 1)' : 'black',
                },
              ]}>
              Password
            </Text>

            <View style={styles.action}>
              <Lock
                name="lock"
                size={30}
                color={isDarkMode ? 'white' : 'black'}
              />
              <TextInput
                style={styles.TextInput}
                autoCapitalize="none"
                secureTextEntry={data.secureTextEntry ? true : false}
                onChangeText={val => handlePasswordChange(val)}
              />
              <TouchableOpacity onPress={updateSecureTextEntry}>
                {data.secureTextEntry ? (
                  <Eye
                    name="eye-with-line"
                    size={25}
                    color={isDarkMode ? 'white' : 'black'}
                  />
                ) : (
                  <Eye
                    name="eye"
                    size={25}
                    color={isDarkMode ? 'white' : 'black'}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.button, {marginTop: 70}]}>
            <TouchableOpacity
              style={styles.signIn}
              disabled={data.email && data.password ? false : true}
              onPress={() => login(data.email, data.password)}>
              <Text style={styles.textSign}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginTop: 20, marginBottom: 20}}
              onPress={() => navigation.navigate('SignIn')}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: isDarkMode ? 'white' : 'black',
                    fontSize: 16,
                    fontWeight: 'bold',
                  },
                ]}>
                No Account ? Create Now
              </Text>
            </TouchableOpacity>
            <View style={{alignSelf: 'center', padding: 10}}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  fontWeight: '600',
                  color: isDarkMode ? 'white' : 'black',
                  fontSize: 20,
                }}>
                OR
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.signIn,
                {
                  marginTop: 10,
                  padding: 0,
                  backgroundColor: isDarkMode ? 'white' : 'black',
                },
              ]}
              onPress={() => googleLogin()}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Image
                    style={{width: 50, height: 50}}
                    source={{
                      uri: 'https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png',
                    }}
                  />
                </View>
                <View>
                  <Text
                    style={[
                      styles.textSign,
                      {color: isDarkMode ? 'black' : 'white'},
                    ]}>
                    Sign in with Google
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
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
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingBottom: 0,
  },
  footer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  text_header: {
    color: 'white',
    alignSelf: 'center',
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
    borderBottomWidth: 0.2,
    borderBottomColor: 'rgba(137, 252, 233, 1)',
    paddingBottom: 5,
  },
  TextInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    fontSize: 18,
    paddingLeft: 10,
    color: 'rgba(137, 252, 233, 1)',
  },
  button: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
  signIn: {
    width: '80%',
    padding: 10,
    backgroundColor: 'rgba(137, 252, 233, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: responsiveFontSize(2),
    color: 'black',
    fontWeight: 'bold',
  },
});
