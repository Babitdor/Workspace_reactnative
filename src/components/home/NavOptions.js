import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Arrowright from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable'
const options = [
    {
        id:"1",
        title: "Table",
        image: "https://www.nationalofficefurnituresupplies.co.uk/media/catalog/product/cache/7482762a3f406cad7b5151092b77acde/g/r/graphite-straight-with-dh-1.jpg",
        screens:"Seating"
    },
    {
        id:"2",
        title: "Conference",
        image: "https://www.ambiencedore.com/wp-content/uploads/2016/04/Gather-Round-Table.jpg",
        screens:"Conference"
    },
    {
        id:"3",
        title: "Coffee & Convo",
        image: "https://img.freepik.com/premium-vector/two-cartoon-girl-friend-sit-table-cafe-talk-use-smartphone-together-vector-flat-illustration-gossiping-female-drinking-coffee-enjoy-conversation-isolated-white-background-dog-owner_198278-7505.jpg?w=2000",
        screens:"Coffee_Convo"
    },
    {
        id:"4",
        title: "Entire Floor",
        image: "https://thumbs.dreamstime.com/b/city-hall-icon-vector-isolated-white-background-your-web-mobile-app-design-city-hall-logo-concept-city-hall-icon-vector-134158652.jpg",
        screens:"WholeHall"
    },

]


export default function NavOptions({ navigation }) {
  return (
    
    <FlatList
        data={options}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <TouchableOpacity onPress={()=> navigation.navigate(item.screens)} 
                style={{
                    padding:10, 
                    margin:8, 
                    backgroundColor:"#242526",
                    borderRadius:20,
                    shadowOpacity: 0.2,
                    shadowOffset: { width: -2, height: 4},
                    shadowRadius: 3,
                    elevation: 3,}}>
                <View>
                    <Image style={{width:150, height:120,borderRadius:20,resizeMode:'contain'}} source={{uri: item.image}}/>
                    <View style={{flex:1, alignItems:'flex-start', flexDirection:'column',padding:10}}>
                        <Text style={{fontSize:15,marginTop:10,fontWeight:'900', marginBottom:10,color:'#FFFFFF'}}>{item.title}</Text>
                        <Arrowright name="arrowright" size={25} color='white' 
                        style={{
                            backgroundColor:'#181818', 
                            borderRadius:50, 
                            padding:8,}}/>
                    </View>
                </View>
            </TouchableOpacity>
        )}/>
    
  )
}