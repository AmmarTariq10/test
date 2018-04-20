import React, { Component } from 'react';
import { AsyncStorage,ImageBackground,ActivityIndicator, } from 'react-native';
import { Navigation } from "react-native-navigation";
import Login from './src/components/login/login'
import Home from './src/components/home/home'
import Splash from './src/components/splash/splash'

Navigation.registerComponent(
  "sos.LoginScreen",
  () => Login
)

Navigation.registerComponent(
  "sos.SplashScreen",
  () => Splash
)

Navigation.registerComponent(
  "sos.HomeScreen",
  () => Home
)

Navigation.startSingleScreenApp({
    screen:{
      screen:"sos.SplashScreen",
      navigatorStyle: {
        navBarHidden: true}
    },

})
