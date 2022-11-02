import React, {useEffect} from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import LogIn from '../components/login_signin/LogIn';
import SignIn from '../components/login_signin/SignIn';
import {Easing} from 'react-native-reanimated';
import LoginMain from '../components/login_signin/LoginMain';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export default function AuthStack() {
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

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '551630299891-pptuml96itvobr88ignr0882ivj513sm.apps.googleusercontent.com',
    });
  }, []);

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="IntroLog"
          component={LoginMain}
          options={{cardStyleInterpolator: forFade}}
        />
        <Stack.Screen
          name="LogIn"
          component={LogIn}
          options={{cardStyleInterpolator: forFade}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{cardStyleInterpolator: forFade}}
        />
      </Stack.Navigator>
    </>
  );
}
