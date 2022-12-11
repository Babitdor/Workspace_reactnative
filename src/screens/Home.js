import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import NavOptions from '../components/home/NavOptions';
import * as Animatable from 'react-native-animatable';
import {AuthContext} from '../navigation/AuthProvider';

export default function Home({navigation}) {
  const {isDarkMode} = useContext(AuthContext);
  return (
    <SafeAreaView
      style={[
        styles.Safearea,
        {backgroundColor: isDarkMode ? 'black' : 'white'},
      ]}>
      <View style={styles.container}>
        <Animatable.View
          style={styles.header}
          animation="fadeInUp"
          delay={600}
          useNativeDriver>
          <View style={{padding: 20, marginBottom: 15}}>
            <Image
            resizeMode='contain'
              style={[
                styles.Image,
                {tintColor: isDarkMode ? 'white' : 'black'},
              ]}
              source={require('../assets/Workspace.png')}
            />
            <Text
              style={[
                styles.Text,
                {alignSelf: 'center', marginBottom: 20, fontSize: 16},
              ]}>
              Let's Begin Booking!
            </Text>
          </View>
        </Animatable.View>

        <Animatable.View
          animation="fadeInUpBig"
          style={[styles.footer,{backgroundColor:isDarkMode?'#181818':'#EEEEEE'}]}
          useNativeDriver>
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
  },
  header: {
    flex: 1,
    justifyContent: 'center',
  },
  footer: {
    flex: 2,
    backgroundColor: '#181818',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  Image: {
    width: 200,
    height: 150,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  Safearea: {
    height: '100%',
    width: '100%',
    // backgroundColor: 'black',
  },
});
