import {StyleSheet, View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import User from 'react-native-vector-icons/AntDesign';
import Tickets from 'react-native-vector-icons/Entypo';
import Setting from 'react-native-vector-icons/Ionicons';
import Food from 'react-native-vector-icons/Ionicons';
import Settings from './Settings';
import PurchaseHistory from './Booking/PurchaseHistory';
import Coffee_ConvoHistory from './Coffee&Convo/Coffee_ConvoHistory';
const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'black',
          borderTopWidth: 0,
          ...styles.shadow,
        },
      }}>
      <Tab.Screen
        name="ProfileHome"
        component={Profile}
        options={{
          tabBarIcon: () => <User name="user" size={30} color="white" />,
        }}
      />
      <Tab.Screen
        name="PurchaseHistory"
        component={PurchaseHistory}
        options={{
          tabBarIcon: () => <Tickets name="ticket" size={30} color="white" />,
        }}
      />

      <Tab.Screen
        name="Coffee&ConvoHistory"
        component={Coffee_ConvoHistory}
        options={{
          tabBarIcon: () => <Food name="fast-food" size={30} color="white" />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: () => <Setting name="settings" size={30} color="white" />,
        }} 
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
