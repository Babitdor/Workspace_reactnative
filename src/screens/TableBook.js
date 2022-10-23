import { View, Text,TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ArrowLeft from 'react-native-vector-icons/AntDesign' 
import AdditionalItem from '../components/tablebook/AdditionalItems'
import { Divider } from '@rneui/themed'
// import items from '../../jsons/additional.json'
import TableInfo from '../components/tablebook/TableInfo'
import ViewCart from '../components/tablebook/ViewCart'
const image = "https://www.starakrasa.cz/upload/5626-1006333410.jpg";
const title = "Table H - Work & Chill Out Table";
const description = "Medium size table"

import { firebase } from '@react-native-firebase/database';

const reference = firebase
  .app()
  .database('https://workspace-booking-392c3-default-rtdb.asia-southeast1.firebasedatabase.app/')
  .ref('/Data/Items')
  .on('value',snapshot => {
    items = snapshot.val();
  });




export default function TableBook({ route, navigation }) {
  return (
    <SafeAreaView style={{backgroundColor:'#18191A',height:'100%',width:'100%'}}>
      <View style={{ alignItems:'flex-start', flexDirection:'column',padding:20,position:'absolute',zIndex:999, marginTop:32}}>
            
            <TouchableOpacity onPress={()=>navigation.navigate("Seating")}>
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
      
      
        {/* <TableInfo/> */}
        <View style={{padding:20, alignItems:'center'}}>
            <Text style={{color:'white',fontSize:25, fontWeight:'600'}}>Add Ons</Text>
        </View>
        <AdditionalItem items={items} tableId={title}/>
      
        
        <ViewCart seats={route.params}/>

      
      
      </SafeAreaView>
  )
}