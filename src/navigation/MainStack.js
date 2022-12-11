import {StyleSheet, Text, useColorScheme} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon, {Icons} from './Icons';
import Table_ConferenceHistoryStack from './Table_ConferenceHistoryStack';
import Coffee_ConvoHistoryStack from './Coffee_ConvoHistoryStack';
import ProfileStack from './ProfileStack';
import AppStack from './AppStack';
import {useRef, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';

const TabArr = [
  {
    route: 'HomePageStack',
    label: 'Home',
    type: Icons.Ionicons,
    activeIcon: 'home',
    inActiveIcon: 'home-outline',
    component: AppStack,
  },
  {
    route: 'Table_ConferenceHistoryStack',
    label: 'Tickets',
    type: Icons.MaterialCommunityIcons,
    activeIcon: 'ticket',
    inActiveIcon: 'ticket-outline',
    component: Table_ConferenceHistoryStack,
  },
  {
    route: 'Coffee&ConvoHistoryStack',
    label: 'Food',
    type: Icons.Ionicons,
    activeIcon: 'fast-food',
    inActiveIcon: 'fast-food-outline',
    component: Coffee_ConvoHistoryStack,
  },
  {
    route: 'ProfileStack',
    label: 'Profile',
    type: Icons.Ionicons,
    activeIcon: 'person',
    inActiveIcon: 'person-outline',
    component: ProfileStack,
  },
];

const Tab = createBottomTabNavigator();

const TabButton = props => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({0: {scale: 1}, 1: {scale: 1.2}});
    } else {
      viewRef.current.animate({0: {scale: 1.2}, 1: {scale: 1}});
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={styles.container}>
      <Animatable.View ref={viewRef} duration={600} style={styles.container}>
        <Icon
          type={item.type}
          name={focused ? item.activeIcon : item.inActiveIcon}
          color={
            isDarkMode
              ? focused
                ? 'rgba(137, 252, 233, 1)'
                : 'white'
              : focused
              ? 'black'
              : 'gray'
          }
        />
        <Text
          style={{
            color: isDarkMode
              ? focused
                ? 'rgba(137, 252, 233, 1)'
                : 'white'
              : focused
              ? 'black'
              : 'gray',
            fontSize: 10,
          }}>
          {item.label}
        </Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default function MainStack() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        // tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: isDarkMode ? 'black' : 'white',
          borderTopWidth: 0,
          height: 50,
          justifyContent: 'center',
          ...styles.shadow,
        },
      }}>
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            label={item.label}
            name={item.route}
            component={item.component}
            options={{
              tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
