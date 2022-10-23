import { View, Text,Image, TouchableOpacity} from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavOptions from '../components/home/NavOptions'
import Settings from 'react-native-vector-icons/Entypo'
import { AuthContext } from '../navigation/AuthProvider'
import * as Animatable from 'react-native-animatable'


export default function Home({ navigation }) 
{
  
  return (
    <SafeAreaView style={{height:'100%',width:'100%',backgroundColor:'#181818'}}>
      <Animatable.View animation="fadeInUp" delay={600} style={{flexDirection:'row', padding:20, justifyContent:'space-between'}}>
        
        <TouchableOpacity onPress={()=>navigation.navigate("Profile")}>
          <Settings name="menu" size={35} color={'#B3B3B3'}/>
        </TouchableOpacity> 
    </Animatable.View>

     
     <Animatable.View animation="fadeInUp" delay={600}
     style={{paddingLeft:30}}>
        
        
        <Image 
            style={{
                width:100, 
                height:100, 
                tintColor:'white',
                resizeMode:'contain'
                }} 
            source={{uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"}}/>
        
        <View>
          <Text style={{fontSize:20,fontWeight:'bold',marginBottom:10,marginTop:10,color:'white'}}>Time to Book</Text>
        </View>
        <NavOptions navigation={navigation}/>
     </Animatable.View>
    </SafeAreaView>
  )
};