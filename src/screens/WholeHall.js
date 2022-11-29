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
import React from 'react';
import {Linking, Platform} from 'react-native';
import Phone from 'react-native-vector-icons/Entypo';
import Mail from 'react-native-vector-icons/Entypo';
import Address from 'react-native-vector-icons/Entypo';
import ArrowLeft from 'react-native-vector-icons/AntDesign';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function WholeHall({navigation}) {
  const dialCall = number => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar translucent backgroundColor={'black'} />
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
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text_header}>Book A Hall</Text>
        </View>

        <Animatable.View
          style={styles.footer}
          animation="fadeInUpBig"
          useNativeDriver>
          <View style={{marginHorizontal: 10}}>
            <Text
              style={[
                styles.addText,
                {fontWeight: 'bold', fontSize: 25, color: 'white'},
              ]}>
              Notice
            </Text>
            <Text style={[styles.addText, {fontSize: 17}]}>
              For Booking a Hall, we highly recommend booking hours in advanced
              along with all the requirements needed over phone call.
            </Text>
            <Text style={[styles.addText, {marginBottom: 10}]}>
              Office Hours : 9AM to 8PM
            </Text>
          </View>

          <View style={{marginHorizontal: 15}}>
            <Text
              style={[
                styles.text_footer,
                {marginBottom: 5, fontWeight: 'bold'},
              ]}>
              Call Us
            </Text>
            <View>
              <TouchableOpacity
                onPress={() => {
                  dialCall(9435323223);
                }}
                style={styles.btn}>
                <View style={styles.action}>
                  <View>
                    <Phone name="phone" size={30} color="black" />
                  </View>

                  <View>
                    <Text style={styles.TextInput}>(+91) 9435323223</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{marginHorizontal: 15}}>
            <Text
              style={[
                styles.text_footer,
                {marginBottom: 5, marginTop: 10, fontWeight: 'bold'},
              ]}>
              Drop A Mail
            </Text>
            <View>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('mailto:support@example.com');
                }}
                style={styles.btn}>
                <View style={styles.action}>
                  <View>
                    <Mail name="mail" size={30} color="black" />
                  </View>

                  <View>
                    <Text style={styles.TextInput}>support@example.com</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{marginHorizontal: 15, marginTop: 20}}>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <View>
                <Address name="address" size={35} color="white" />
              </View>
              <View>
                <Text style={[styles.text_footer, {fontWeight: 'bold'}]}>
                  Address
                </Text>
              </View>
            </View>
            <View style={styles.action}>
              <View style={{flexDirection: 'column'}}>
                <Text style={[styles.addText, {fontSize: 16}]}>
                  190, Shahid Bhagat Singh Colon Next To Gurudwara, J.B Nagar,
                  Andheri Mumbai, Maharashtra - 400059{' '}
                </Text>
              </View>
            </View>
          </View>
        </Animatable.View>
      </View>
    </SafeAreaView>
  );
}

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;
const styles = StyleSheet.create({
  container: {
    flex: responsiveHeight(0.2),
    backgroundColor: 'black',
  },
  btn: {
    backgroundColor: 'rgba(137, 252, 233, 1)',
    padding: 5,
    margin: 4,
    borderRadius: 10,
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
    alignSelf: 'center',
    colorWeight: 'bold',
    fontSize: 32,
  },
  text_footer: {
    color: 'text',
    marginHorizontal: 10,
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  TextInput: {
    marginTop: 0,
    fontSize: 18,
    paddingLeft: 10,
    color: 'black',
  },
  signIn: {
    width: responsiveWidth(70),
    height: responsiveHeight(8),
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  textSign: {
    fontSize: responsiveFontSize(2),
    color: 'white',
    fontWeight: 'bold',
  },
  addText: {
    textAlign: 'justify',
    marginHorizontal: 10,
    fontSize: 16,
    padding: 5,
    color: 'white',
    justifyContent: 'center',
    fontWeight: '400',
  },
});
