import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

export default function HoldHall() {
  return (
    <SafeAreaView style={{height:'100%',width:'100%'}} >
      <View style={{flexDirection:'row', padding:20, paddingTop:70, justifyContent:'space-between'}}>
          <Text>Book Whole Hall</Text>
      </View>
    </SafeAreaView>
  )
}