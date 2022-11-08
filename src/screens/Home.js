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
import React, {useEffect, useId} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import NavOptions from '../components/home/NavOptions';
import Settings from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable';
export default function Home({navigation}) {
  return (
    <SafeAreaView
      style={{height: '100%', width: '100%', backgroundColor: 'black'}}>
      <View style={styles.container}>
        <Animatable.View animation="fadeInUp" style={styles.header}>
          <Animatable.View
            animation="fadeInUp"
            delay={600}
            style={{padding: 20, marginBottom: 15}}>
            <Image
              style={{
                width: 200,
                height: 150,
                alignSelf: 'center',
                // tintColor: 'white',
                resizeMode: 'contain',
              }}
              source={require('../assets/Workspace.png')}
            />
            <Text
              style={[styles.Text, {alignSelf: 'center', marginBottom: 20,fontSize:16}]}>
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
  Text: {
    color: 'white',
    fontSize: 17,
  },
  container: {
    flex: 1,
    // backgroundColor: '#181818',
  },
  header: {
    flex: responsiveHeight(0.1),
    justifyContent: 'flex-end',
  },
  footer: {
    flex: 2,
    backgroundColor: '#181818',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});
