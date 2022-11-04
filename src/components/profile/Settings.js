import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Settings() {
  return (
    <SafeAreaView style={{backgroundColor:'black',flex:1,width:'100%',height:'100%'}}>
      {/* <<Text>Settings</Text> */}
      <View style={{flex:1,margin:20}}>
        <Text style={{color:'white'}}>Hello</Text>
      </View>
    </SafeAreaView>
  )
}