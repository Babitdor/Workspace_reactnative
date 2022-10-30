import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function Conference() {
  return (
    <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
      <View style={{padding:20,margin:20,zIndex:999,alignItems:'center'}}>
        <Text style={{color:'white',fontSize:25}}>Coming Soon</Text>
      </View>
    </SafeAreaView>
  );
}
