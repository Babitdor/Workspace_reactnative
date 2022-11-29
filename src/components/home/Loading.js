import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
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
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
});
