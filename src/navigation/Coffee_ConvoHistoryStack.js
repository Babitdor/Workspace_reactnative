import React from 'react';
import {StatusBar, Easing} from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {Provider as ReduxProvider} from 'react-redux';
import configureStore from '../../redux/store';
import CoffeeConvoPreviewPage from '../components/coffee_convo/HistoryPage/CoffeeConvoPreviewPage';
import Coffee_ConvoHistory from '../components/coffee_convo/HistoryPage/Coffee_ConvoHistory';

const store = configureStore();

export default function Coffee_ConvoHistoryStack() {
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
            name="Coffee&ConvoHistory"
            component={Coffee_ConvoHistory}
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
