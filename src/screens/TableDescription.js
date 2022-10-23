import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import TableInfo from '../components/tablebook/TableInfo'
import { SafeAreaView } from 'react-native-safe-area-context'
import ArrowLeft from 'react-native-vector-icons/AntDesign' 

export default function TableDescription({route,navigation}) {
    return (
    <SafeAreaView style={{backgroundColor:'#181818',width:'100%',height:'100%'}}>
      <View style={{alignItems:'flex-start', flexDirection:'column',padding:20,position:'absolute',zIndex:3, marginTop:30}}>
            
            <TouchableOpacity onPress={()=>navigation.goBack()}>
            <ArrowLeft name="arrowleft" size={25} color={'#18191A'} style={{
                backgroundColor:'white',
                alignSelf:'center',
                zIndex:3, borderRadius:50, padding:8,shadowColor: 'black',
                shadowOpacity: 0.2,
                shadowOffset: { width: -2, height: 4},
                shadowRadius: 3,
                elevation: 2}}/>
        </TouchableOpacity>
      </View>
        <TableInfo database={route.params.database}/>
    </SafeAreaView>
      
  )
};