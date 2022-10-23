import { View, Text,Image, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { firebase } from '@react-native-firebase/database';
import * as Animatable from 'react-native-animatable'
const reference = firebase
  .app()
  .database('https://workspace-booking-392c3-default-rtdb.asia-southeast1.firebasedatabase.app/')
  .ref('/Data/Tables/')
  .on('value',snapshot => {
    preview = snapshot.val();
    
});



export default function TablePreview({navigation}) {
  return (
    
    <FlatList showsHorizontalScrollIndicator={false}
    data={preview} horizontal
    keyExtractor={(item) => item.id}
    renderItem={({item}) => (

      <TouchableOpacity onPress={() => navigation.navigate("TableDescription",
      {
        database: item
      }
      )}>
      <Animatable.View animation='fadeInUp' delay={300} useNativeDriver={true} key={item.id} style={{padding:8,margin:5,alignItems:'center',backgroundColor:'#242526', borderRadius:20,}}>
        <Image style={{width:120,height:120,borderRadius:10}}source={{uri: item.image}}/>
        <Text style={{color:'white',marginTop:10}}>{item.title}</Text>
      </Animatable.View> 
      </TouchableOpacity>
  )}/>
  
)}