import { View, Text } from 'react-native'
import React, { createContext } from 'react'

export const DatabaseContext = createContext();

export default function services() {
  return (
    <View>
      <Text>services</Text>
    </View>
  )
}