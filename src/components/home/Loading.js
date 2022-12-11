import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';
import LottieView from 'lottie-react-native';
import {useColorScheme} from 'react-native';
import {AuthContext} from '../../navigation/AuthProvider';
export default function LoginScreen() {
  const {isDarkMode} = useContext(AuthContext);
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? 'black' : 'white'},
      ]}>
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
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
});
