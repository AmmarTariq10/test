import React, { Component } from 'react'
import {ImageBackground,View, ActivityIndicator,StyleSheet,AsyncStorage} from 'react-native'
import { Navigation } from 'react-native-navigation'



export default class Splash extends Component {

componentDidMount(){
    this.retrieveInfo()
    //AsyncStorage.getItem('accessToken',d=>{console.log(d)}, err =>{console.log(d)})
    

    // data => {
    //     token = data
    //     if(token === !null){
    //         Navigation.startSingleScreenApp({
    //             screen:{
    //               screen:"sos.HomeScreen",
    //               navigatorStyle: {
    //                 navBarHidden: true}
    //             }
    //         })
    //     }else{
    //         Navigation.startSingleScreenApp({
    //             screen:{
    //               screen:"sos.LoginScreen",
    //               navigatorStyle: {
    //                 navBarHidden: true}
    //             }
    //         })
    //     }
    // }).catch(e=>{
    //     alert(e)
    // }

    }

 retrieveInfo = async ()=>{
        await AsyncStorage.getItem('accessToken')
        .then(
          data => {
           if(data != null){
            Navigation.startSingleScreenApp({
                            screen:{
                              screen:"sos.HomeScreen",
                              navigatorStyle: {
                                navBarHidden: true}
                            }
                        })
           }else if(data === null){
            Navigation.startSingleScreenApp({
                screen:{
                  screen:"sos.LoginScreen",
                  navigatorStyle: {
                    navBarHidden: true}
                }
            })
           }
          }
        ).catch(e=>{
          alert(e)
        })
    
      }
            render(){
                return(
                    <View style = {styles.container}>
                        <ImageBackground style = {styles.img}  source={require('../../imgs/splash.png')}>

                        </ImageBackground>
                    </View>
                )
            }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:0,
        margin:0,
        width:'100%',
        height:'100%',
    },
    img:{
        flex:1,
        padding:0,
        margin:0,
        width:'100%',
        height:'100%',
    }  
})