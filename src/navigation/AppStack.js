import React from 'react';
import {StatusBar, Easing, View} from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Home from '../screens/Home';
import TableBook from '../screens/TableBook';
import Seating from '../screens/Seating';
import Conference from '../screens/Conference';
import Coffee_Convo from '../screens/Coffee_Convo';
import WholeHall from '../screens/WholeHall';
import {Provider as ReduxProvider} from 'react-redux';
import configureStore from '../../redux/store';
import TableDescription from '../screens/TableDescription';
import OrderComplete from '../screens/OrderComplete';
import FoodMenu from '../screens/FoodMenu';
import ConferenceBook from '../screens/ConferenceBook';
import ProfileScreen from '../screens/ProfileScreen';
import TicketPreview from '../components/profile/Booking/TicketPreview';
import CoffeeConvoPreviewPage from '../components/profile/Coffee&Convo/CoffeeConvoPreviewPage';

const store = configureStore();
export default function AppStack() {
  const Stack = createStackNavigator();

  const config = {
    animation: 'Spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  const closeConfig = {
    animation: 'Timing',
    config: {
      duration: 500,
      easing: Easing.linear,
    },
  };

  const screenOptions = {
    headerShown: false,
    CardStyleInterpolators: CardStyleInterpolators.forHorizontalIOS,
    transitionSpec: {
      open: config,
      close: closeConfig,
    },
  };

  const forFade = ({current, closing}) => ({
    cardStyle: {
      backgroundColor: 'black',
      opacity: current.progress,
      presentaion: 'modal',
    },
  });
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <ReduxProvider store={store}>
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{cardStyleInterpolator: forFade}}
          />
          <Stack.Screen
            name="TableBook"
            component={TableBook}
            options={{cardStyleInterpolator: forFade}}
          />
          <Stack.Screen
            name="ConferenceBook"
            component={ConferenceBook}
            options={{cardStyleInterpolator: forFade}}
          />
          <Stack.Screen
            name="TableDescription"
            component={TableDescription}
            options={{cardStyleInterpolator: forFade}}
          />
          <Stack.Screen
            name="Seating"
            component={Seating}
            options={{cardStyleInterpolator: forFade}}
          />
          <Stack.Screen
            name="Conference"
            component={Conference}
            options={{cardStyleInterpolator: forFade}}
          />
          <Stack.Screen
            name="Coffee_Convo"
            component={Coffee_Convo}
            options={{cardStyleInterpolator: forFade}}
          />
          <Stack.Screen
            name="WholeHall"
            component={WholeHall}
            options={{cardStyleInterpolator: forFade}}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{cardStyleInterpolator: forFade}}
          />
          <Stack.Screen
            name="Completed"
            component={OrderComplete}
            options={{cardStyleInterpolator: forFade}}
          />
          <Stack.Screen
            name="FoodMenu"
            component={FoodMenu}
            options={{cardStyleInterpolator: forFade}}
          />
          <Stack.Screen
            name="Ticket"
            component={TicketPreview}
            options={{cardStyleInterpolator: forFade}}
          />
          <Stack.Screen
            name="CoffeeConvoTicket"
            component={CoffeeConvoPreviewPage}
            options={{cardStyleInterpolator: forFade}}
          />
        </Stack.Navigator>
      </ReduxProvider>
    </>
  );
}
