import React, { Component } from 'react';
import {
	AppRegistry,
	Platform,
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	TouchableOpacity,
	ImageBackground,
	KeyboardAvoidingView,
	Animated,
	Easing,
	StatusBar,
	AsyncStorage
} from 'react-native';

export default class home extends Component {

	state = {
		data :{
			latitude:0,
			longitude:0},
		auth:{
			token:'',
			uid:''
		}
	}

	UNSAFE_componentWillMount() {
		this.animatedValue = new Animated.Value(0);

		AsyncStorage.getItem('accessToken', data =>{
			this.setState({
				auth:{
					token:data}
			})
		},err=>{
			console.log(err)
		});

	AsyncStorage.getItem('uid', id=>{
		this.setState({
			auth:{
				uid:id
			}
		})
	}, err=>{
		console.log(err)
	});
	}
	componentDidMount() {
		this._startAnimation();
		this._request()
	}

	_request = () =>{
		navigator.geolocation.getCurrentPosition(
			(res) => {
				alert(res)
				this.setState({
					data:{
						latitude:res.coords.latitude,
						longitude:res.coords.longitude
					}
				})},err => {
				alert(JSON.stringify(err))
			},
			{timeout:6000,maximumAge:0,enableHighAccuracy:false}
		);
	}

	_startAnimation() {
		this.animatedValue.setValue(0);
		Animated.timing(this.animatedValue, {
			toValue: 100,
			duration: 1000,
		}).start(() => {
			this._startAnimation();
		});
	}

	render() {
		const interpolateColor = this.animatedValue.interpolate({
			inputRange: [0, 150],
			outputRange: ['rgba(0, 0, 0,0)', 'rgba(0,0,0,0)'],
		});
		const animatedStyle = {
			backgroundColor: interpolateColor,
			transform: [{ translateY: this.animatedValue }],
		};

		return (
			<View style={styles.container}>
				<StatusBar backgroundColor="#064f9a" />
				<View style={styles.statusBar} />
				<ImageBackground source={require('../../imgs/main-bg.jpg')} style={styles.backgroundImage}>
					<View style={styles.mainHeaderContainer}>
						<Text style={styles.topTitle}>SOS</Text>
					</View>

					<View style={styles.content}>
						<View style={styles.heyTitleContainer}>
							<Text style={styles.heytite}>HEY</Text>
						</View>

						<View style={styles.textContainer}>
							<Text style={styles.simtext}>Please tap to the button below if youare in danger</Text>
							<Text style={styles.simtext}>{this.state.auth.token}</Text>
							<Text style={styles.simtext}>{this.state.auth.uid}</Text>
							<Text style={styles.simtext}>{this.state.data.latitude}</Text>
							<Text style={styles.simtext}>{this.state.data.longitude}</Text>
						</View>

						<View style={styles.arrowContainer}>
							<Animated.View style={[animatedStyle]}>
								<Image source={require('../../imgs/arrow.png')} style={[styles.arrow]} />
							</Animated.View>
						</View>
					</View>

					<View style={styles.btnContainer}>
						<TouchableOpacity onPress={this._requestLocation} activeOpacity={0.8}>
							<View style={styles.redbox}>
								<Image source={require('../../imgs/sos-btn.png')} style={styles.sostxt} />
							</View>
						</TouchableOpacity>
					</View>
				</ImageBackground>
			</View>
		);
	}

	_requestLocation =  () => {
		
		baseURL = 'http://dev20.onlinetestingserver.com/sos-new/request-';
		let url = baseURL + 'sos-call';
		console.log(url);
		if(this.state.data.latitude != 0){
				fetch(url,{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization:this.state.auth.token
					},
					body: JSON.stringify({
						userid: this.state.auth.uid,
						latitude: res.coords.latitude,
						longitude: res.coords.longitude,
					}),
				}).then(res => res.json())
				.then(resp => console.log(JSON.stringify(resp)))
			}else{
				this._request()
				alert('Please Wait while the setup is getting ready')
			}
	};

	_sosCall = () =>{
	
	
		

	

	}
}



const animatedStyle = { opacity: this.animatedValue };
const styles = StyleSheet.create({
	mainHeaderContainer: {
		justifyContent: 'center',
		backgroundColor: '#064f9a',
		alignSelf: 'stretch',
		padding: 15,
	},

	heyTitleContainer: {
		flex: 0.3,
	},
	textContainer: { flex: 1 },
	arrowContainer: { flex: 1.7 },

	statusBar: {
		backgroundColor: '#064f9a',
	},
	container: {
		flex: 1,
		// flexDirection:row
	},
	backgroundImage: {
		flex: 1,
		alignSelf: 'stretch',
		width: null,
	},
	content: {
		flex: 1,
		paddingTop: 10,
		paddingBottom: 0,
		paddingLeft: 0,
		paddingRight: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnContainer: {
		flex: 1,
		alignItems: 'center',
	},
	topTitle: {
		color: '#fff',
		fontSize: 30,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	heytite: {
		color: '#333333',
		fontSize: 30,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	simtext: {
		color: '#666666',
		fontSize: 16,
		padding: 15,
		textAlign: 'center',
	},
	arrow: {
		opacity: 1,
		width: 33,
		height: 79,
	},
	redbox: {
		width: 200,
		height: 200,
		borderRadius: 200,
		backgroundColor: '#df1e36',
		justifyContent: 'center',
		alignItems: 'center',

		opacity: 1,
	},
	sostxt: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});
