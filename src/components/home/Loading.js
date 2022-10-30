import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useContext} from 'react';
import {Platform} from 'react-native';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <LottieView
          style={{flex: 1, alignItems: 'center'}}
          source={require('../../animations/Google.json')}
          autoPlay
          speed={1}
          loop={true}
        />
      </View>
    </View>
  );
}

const {height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
});
