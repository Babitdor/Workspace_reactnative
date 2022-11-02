import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Intro from '../components/coffee_convo/Intro';

export default function Coffee_Convo() {
  return (
    <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
      <Intro />
    </SafeAreaView>
  );
}
