import {View, Text} from 'react-native';
import React from 'react';

export default function OrderItems({item}) {
  const {title, price} = item;

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
        <Text style={{fontWeight: '600', fontSize: 16, color: 'white'}}>
          {title}
        </Text>
        <Text style={{opacity: 0.7, fontSize: 16, color: 'white'}}>
          {price}
        </Text>
      </View>
    </>
  );
}
