import {View, Text} from 'react-native';
import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../navigation/AuthProvider';

export default function OrderItems({item}) {
  const {title, price} = item;
  const {isDarkMode} = useContext(AuthContext)
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#999',
        }}>
        <Text style={{fontWeight: '600', fontSize: 16, color: isDarkMode?'white':'black'}}>
          {title}
        </Text>
        <Text style={{opacity: 0.7, fontSize: 16, color: isDarkMode?'white':'black'}}>
          {price}
        </Text>
      </View>
    </>
  );
}
