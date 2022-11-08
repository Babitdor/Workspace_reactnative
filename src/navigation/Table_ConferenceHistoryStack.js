import React from 'react';
import {StatusBar, Easing} from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {Provider as ReduxProvider} from 'react-redux';
import configureStore from '../../redux/store';
import TicketPreview from '../components/HistoryPage/TicketPreview';
import PurchaseHistory from '../components/HistoryPage/PurchaseHistory';

const store = configureStore();

export default function Table_ConferenceHistoryStack() {
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
            name="PuchaseHistory"
            component={PurchaseHistory}
            options={{cardStyleInterpolator: forFade}}
          />
          <Stack.Screen
            name="Ticket"
            component={TicketPreview}
            options={{cardStyleInterpolator: forFade}}
          />
          {/* <Stack.Screen
            name="CoffeeConvoTicket"
            component={CoffeeConvoPreviewPage}
            options={{cardStyleInterpolator: forFade}}
          /> */}
        </Stack.Navigator>
      </ReduxProvider>
    </>
  );
}
