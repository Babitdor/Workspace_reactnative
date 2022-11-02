import {View, Text, Image} from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';

export default function Intro() {
  const navigation = useNavigation();
  const FoodMenu = () => {
    navigation.navigate('FoodMenu');
  };
  return (
    <Onboarding
      onSkip={FoodMenu}
      onDone={FoodMenu}
      pages={[
        {
          backgroundColor: 'black',
          image: (
            <Image
              style={{
                alignItems: 'center',
                width: '100%',
                height: 400,
                resizeMode: 'contain',
              }}
              source={require('../../assets/Food.png')}
            />
          ),
          title: 'Pre-Order Your Food',
          subtitle: 'Order your food in advanced, and we get it ready!',
        },
        {
          backgroundColor: 'black',
          image: (
            <Image
              style={{
                alignItems: 'center',
                width: '100%',
                height: 400,
                resizeMode: 'contain',
              }}
              source={require('../../assets/Table.png')}
            />
          ),
          title: 'Visit Us & Pick A Table',
          subtitle: 'Pick any Table, and We bring your Food in an instant.',
        },
        {
          backgroundColor: 'black',
          image: (
            <Image
              style={{
                alignItems: 'center',
                width: '100%',
                height: 400,
                resizeMode: 'contain',
              }}
              source={require('../../assets/TakeASeat.png')}
            />
          ),
          title: 'Chill & HangOut',
          subtitle: 'Time to Relax & Chill with Your Friends',
        },
      ]}
    />
  );
}
