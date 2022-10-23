import { View,TouchableOpacity,Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BookMySeat from '../components/seating/BookMySeat'
import ArrowLeft from 'react-native-vector-icons/AntDesign' 
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
export default function Seating({navigation}) {
  return (
    <SafeAreaView style={{width:'100%',height:'100%',backgroundColor:'#181818'}}>
      <View style={{  alignItems:'flex-start', flexDirection:'column',padding:20,position:'absolute',zIndex:999, marginTop:30}}>
          <TouchableOpacity onPress={()=>navigation.navigate("Home")}>
           <ArrowLeft name="arrowleft" size={25} color={'black'} style={{
                backgroundColor:'white',
                alignSelf:'center',
                borderWidth:0.5,
                borderRadius:50, padding:8}}/>
        </TouchableOpacity>
      </View>
      <View style={{position:'relative',width:'100%',height:'100%'}}>
      <BookMySeat navigation={navigation}/>
      </View>
    </SafeAreaView>
  )
}