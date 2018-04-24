import React, { Component } from 'react';
import { ImageBackground, View, ActivityIndicator, StyleSheet, AsyncStorage, StatusBar } from 'react-native';
import { Navigation } from 'react-native-navigation';

export default class Splash extends Component {
	componentDidMount() {
		this.retrieveInfo();
	}
	render() {
		return (
			<View style={styles.container}>
				<StatusBar backgroundColor="#064f9a" />
				<ImageBackground style={styles.img} source={require('../../imgs/splash.png')} />
			</View>
		);
	}

	retrieveInfo = () => {
		AsyncStorage.getItem('accessToken')
			.then(data => {
				if (data != null) {
					this.props.navigator.resetTo({
							screen: 'sos.HomeScreen',
							navigatorStyle: {
								navBarHidden: true,
						},
						animated: false
					});
				} else if (data === null) {
					this.props.navigator.resetTo({
							screen: 'sos.LoginScreen',
							navigatorStyle: {
								navBarHidden: true,
							},
							animated: false
						
					});
				}
			})
			.catch(e => {
				alert(e);
			});
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 0,
		margin: 0,
		width: '100%',
		height: '100%',
	},
	img: {
		flex: 1,
		padding: 0,
		margin: 0,
		width: '100%',
		height: '100%',
	},
});
