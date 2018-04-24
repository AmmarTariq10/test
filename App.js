import {AsyncStorage} from 'react-native'
import { Navigation, ActivityIndicator } from "react-native-navigation";
import Login from './src/components/login/login'
import Home from './src/components/home/home'

Navigation.registerComponent(
  "sos.LoginScreen",
  () => Login
)
Navigation.registerComponent(
  "sos.HomeScreen",
  () => Home
)
AsyncStorage.getItem('accessToken')
    .then(data => {
      if (data != null){
      Navigation.startSingleScreenApp({
        screen:{
          screen:"sos.HomeScreen",
          navigatorStyle: {
            navBarHidden: true},
            animated:false
        },
      }) 
    }
      else{   
      Navigation.startSingleScreenApp({
        screen:{
          screen:"sos.LoginScreen",
          navigatorStyle: {
            navBarHidden: true},
            animated:false
        },
      });
      }
    }).catch(e => {
    console.log(e)
    });
