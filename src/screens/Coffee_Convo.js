import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Intro from '../components/coffee_convo/Intro';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FoodMenu from '../screens/FoodMenu';

export default function Coffee_Convo() {
  const navigation = useNavigation();
  const [isFirstLaunch, setisFirstLaunch] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setisFirstLaunch(true);
      } else {
        setisFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    return (
      <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
        <Intro />
      </SafeAreaView>
    );
  } else {
    return <FoodMenu />;
  }
}
