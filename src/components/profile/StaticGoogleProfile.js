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
import React, {useContext} from 'react';
import Signout from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import {AuthContext} from '../../navigation/AuthProvider';
import {useNavigation} from '@react-navigation/native';
import User from 'react-native-vector-icons/AntDesign';
import Edit from 'react-native-vector-icons/AntDesign';
import Email from 'react-native-vector-icons/AntDesign';
import Phone from 'react-native-vector-icons/AntDesign';
import Cake from 'react-native-vector-icons/Entypo';
import Gender from 'react-native-vector-icons/Ionicons';

export default function StaticGoogleProfile() {
  const {logout} = useContext(AuthContext);
  const {user, isDarkMode} = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? 'black' : 'white'},
      ]}>
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
                color={isDarkMode ? '#B3B3B3' : 'black'}
              />
              <Text style={{color: isDarkMode ? 'white' : 'black'}}>
                Sign Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Animatable.View
        style={styles.header}
        animation="fadeInUp"
        useNativeDriver>
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
            color: isDarkMode ? 'white' : 'black',
            marginTop: 20,
          }}>
          {user.displayName}
        </Text>
      </Animatable.View>

      <Animatable.View
        style={[
          styles.footer,
          {backgroundColor: isDarkMode ? '#181818' : '#EEEEEE'},
        ]}
        animation="fadeInUpBig"
        useNativeDriver>
        <View
          style={{
            marginHorizontal: 10,
            backgroundColor: isDarkMode ? 'rgba(137, 252, 233, 1)' : 'black',
            borderRadius: 10,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('EditPage')}>
            <View
              style={{alignItems: 'center', flexDirection: 'row', padding: 10}}>
              <View>
                <Edit
                  name="edit"
                  size={30}
                  color={isDarkMode ? 'black' : 'white'}
                />
              </View>
              <View>
                <Text
                  style={[
                    styles.text_footer,
                    {
                      marginTop: 5,
                      color: isDarkMode ? 'black' : 'white',
                      fontWeight: 'bold',
                      marginLeft: 10,
                    },
                  ]}>
                  Profile Setup Incomplete
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <Animatable.View
          useNativeDriver
          animation="fadeInLeft"
          delay={100}
          style={styles.card}>
          <View>
            <User
              name="user"
              size={25}
              color={isDarkMode ? 'rgba(137, 252, 233, 1)' : 'black'}
            />
          </View>

          <View style={styles.aligment}>
            <View>
              <Text
                style={[
                  styles.text_header,
                  {marginLeft: 8, color: isDarkMode ? 'white' : 'black'},
                ]}>
                Name
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.text_footer,
                  {marginLeft: 15, color: isDarkMode ? 'white' : 'black'},
                ]}>
                {user.displayName}
              </Text>
            </View>
          </View>
          <TouchableOpacity></TouchableOpacity>
        </Animatable.View>

        <Animatable.View
          useNativeDriver
          animation="fadeInLeft"
          delay={500}
          style={styles.card}>
          <Email
            name="mail"
            size={25}
            color={isDarkMode ? 'rgba(137, 252, 233, 1)' : 'black'}
          />
          <View style={styles.aligment}>
            <View>
              <Text
                style={[
                  styles.text_header,
                  {marginLeft: 8, color: isDarkMode ? 'white' : 'black'},
                ]}>
                Email
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.text_footer,
                  {marginLeft: 15, color: isDarkMode ? 'white' : 'black'},
                ]}>
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
            color={isDarkMode ? 'rgba(137, 252, 233, 1)' : 'black'}
          />
          <View style={styles.aligment}>
            <View>
              <Text
                style={[
                  styles.text_header,
                  {marginLeft: 8, color: isDarkMode ? 'white' : 'black'},
                ]}>
                Phone
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.text_footer,
                  {marginLeft: 15, color: isDarkMode ? 'white' : 'black'},
                ]}>
                N/A
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
            color={isDarkMode ? 'rgba(137, 252, 233, 1)' : 'black'}
          />
          <View style={styles.aligment}>
            <View>
              <Text
                style={[
                  styles.text_header,
                  {marginLeft: 8, color: isDarkMode ? 'white' : 'black'},
                ]}>
                Date of Birth
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.text_footer,
                  {marginLeft: 15, color: isDarkMode ? 'white' : 'black'},
                ]}>
                N/A
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
            name={'female'}
            size={responsiveScreenFontSize(2.5)}
            color={isDarkMode ? 'rgba(137, 252, 233, 1)' : 'black'}
          />
          <View style={styles.aligment}>
            <View>
              <Text
                style={[
                  styles.text_header,
                  {marginLeft: 8, color: isDarkMode ? 'white' : 'black'},
                ]}>
                Gender
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.text_footer,
                  {marginLeft: 15, color: isDarkMode ? 'white' : 'black'},
                ]}>
                N/A
              </Text>
            </View>
          </View>
        </Animatable.View>
      </Animatable.View>
    </View>
  );
}

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
