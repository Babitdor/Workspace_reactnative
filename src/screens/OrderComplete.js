import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  BackHandler,
} from 'react-native';
import React, {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Home from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
export default function OrderComplete(route) {
  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <StatusBar translucent />
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            padding: 15,
            zIndex: 100,
            justifyContent: 'space-between',
          }}>
          <View
            style={{backgroundColor: 'white', padding: 8, borderRadius: 50}}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Home name="home" size={25} color={'black'} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.header}>
          <Animatable.View animation="bounceIn">
            <LottieView
              style={styles.logo}
              source={require('../animations/Checkmark.json')}
              autoPlay
              speed={0.5}
              loop={false}
            />
          </Animatable.View>
        </View>

        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <Text style={styles.title}>
            Your Order has been placed for {route.route.params.totalRs}
          </Text>
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
    backgroundColor: 'black',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 3,
    backgroundColor: '#181818',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo / 2,
    tintColor: 'white',
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'black',
    marginTop: 5,
  },
});
