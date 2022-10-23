import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

export default function Coffee_Convo() {
  return (
    <SafeAreaView style={{height:'100%',width:'100%'}} >
      <View style={{flexDirection:'row', padding:20, paddingTop:70, justifyContent:'space-between'}}>
          <Text>Coffee & Convo</Text>
      </View>
    </SafeAreaView>
  )
}