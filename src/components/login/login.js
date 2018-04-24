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
	StatusBar,
	AsyncStorage,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import validate from '../../utility/validation';

export default class login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fNameIsValid: true,
			lNameIsValid: true,
			memIsValid: true,
			formData: {
				fname: '',
				laname: '',
				memNo: '',
			},
			token: '',
		};
	}

	_changeTextHandlerFName = val => {
		let isValid = validate(val, 'isName');
		if (isValid) {
			this.setState(prevState => {
				return {
					...prevState,
					formData: {
						fname: val,
					},
					fNameIsValid: true,
				};
			});
			console.log('valid ' + JSON.stringify(this.state));
		} else {
			this.setState(prevState => {
				return {
					...prevState,
					formData: {
						fname: '',
					},
					fNameIsValid: false,
				};
			});
			console.log('not valid' + JSON.stringify(this.state));
		}
	};

	_changeTextHandlerLName = val => {
		let isValid = validate(val, 'isName');
		if (isValid) {
			this.setState(prevState => {
				return {
					...prevState,
					formData: {
						lname: val,
					},
					lNameIsValid: true,
				};
			});
			console.log('valid ' + this.state.formData.lname);
		} else {
			this.setState(prevState => {
				return {
					...prevState,
					formData: {
						lname: '',
					},
					lNameIsValid: false,
				};
			});
			console.log('not valid' + this.state);
		}
	};

	_changeTextHandlerNumber = val => {
		let isValid = validate(val, 'isNumber');
		if (isValid) {
			this.setState(prevState => {
				return {
					...prevState,
					formData: {
						memNo: val,
					},
					memIsValid: true,
				};
			});
			console.log('valid ' + this.state.formData.memNo);
		} else {
			this.setState(prevState => {
				return {
					...prevState,
					formData: {
						memNo: '',
					},
					memIsValid: false,
				};
			});
		}
	};

	render() {
		let fNameIsValid = this.state.fNameIsValid;
		fNameIsValid ? (inValidInputf = {}) : (inValidInputf = { backgroundColor: 'red' });

		let lNameIsValid = this.state.lNameIsValid;
		lNameIsValid ? (inValidInputl = {}) : (inValidInputl = { backgroundColor: 'red' });

		let memIsValid = this.state.memIsValid;
		memIsValid ? (inValidInputn = {}) : (inValidInputn = { backgroundColor: 'red' });

		return (
			<View style={styles.container}>
				<StatusBar hidden={true} />
				<View style={styles.statusBar} />
				<ImageBackground source={require('../../imgs/bac.png')} style={styles.backgroundImage}>
					<View style={styles.content}>
						<KeyboardAvoidingView behavior="padding">
							<View>
								<Image source={require('../../imgs/logo.png')} style={styles.logo} />

								<TextInput
									autoFocus={false}
									underlineColorAndroid="transparent"
									style={[styles.input, inValidInputf]}
									placeholder="First Name"
									keyboardType="default"
									onChangeText={fname => this._changeTextHandlerFName(fname)}
									value={this.state.fname}
									ref={ref => (fNameDataInput = ref)}
								/>
								<TextInput
									autoFocus={false}
									underlineColorAndroid="transparent"
									style={[styles.input, inValidInputl]}
									placeholder="Last Name"
									keyboardType="default"
									onChangeText={lname => this._changeTextHandlerLName(lname)}
									value={this.state.lname}
									ref={ref => (lNameDataInput = ref)}
								/>

								<TextInput
									autoFocus={false}
									underlineColorAndroid="transparent"
									style={[styles.input, inValidInputn]}
									placeholder="Member Number"
									onChangeText={memNo => this._changeTextHandlerNumber(memNo)}
									value={this.state.memNo}
									ref={component => (this._textInput = component)}
								/>
								<TouchableOpacity
									onPress={this._loginHandler}
									isDisabled={true}
									style={styles.buttonContainer}
								>
									<Text style={styles.buttonText}>LOGIN</Text>
								</TouchableOpacity>
							</View>
						</KeyboardAvoidingView>
					</View>
				</ImageBackground>
			</View>
		);
	}

	_loginHandler = () => {
		if (this.state.memIsValid && this.state.lNameIsValid && this.state.memIsValid) {
			let number = this.state.formData.memNo;
			console.log(number);
			baseURL = 'http://dev20.onlinetestingserver.com/sos-new/request-';
			let url = baseURL + 'member-search';
			body = JSON.stringify({ member_no: number });
			console.log(url);
			console.log(body);
			let token = null;
			fetch(url, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: body,
			})
				.then(resp => resp.json())
				.then(res => {
					if (res.agentAccessToken != null) {
						AsyncStorage.setItem('accessToken', res.agentAccessToken);
						AsyncStorage.setItem('uid', res.u_id);
					} else {
						alert(number + ' is not a valid member');
						this._textInput.setNativeProps({ text: '' });
					}
				})
				.then(
					this.props.navigator.resetTo({
							screen: 'sos.HomeScreen',
							navigatorStyle: {navBarHidden: true,},
					})
				)
				.catch(err => alert(err.message));
		} else if (this.state.memIsValid || this.state.lNameIsValid || this.state.memIsValid) {
			alert('please fill all the fields ');
		}
	};
}

const styles = StyleSheet.create({
	statusBar: {
		backgroundColor: '#064f9a',
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	backgroundImage: {
		flex: 1,
		alignSelf: 'stretch',
		width: null,
		justifyContent: 'center',
	},
	content: {
		flex: 1,
		padding: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	logo: {
		width: 300,
		height: 200,
		resizeMode: Image.resizeMode.contain,
		marginBottom: 20,
		marginTop: 0,
	},
	input: {
		fontSize: 16,
		padding: 15,
		marginBottom: 15,
		backgroundColor: 'rgba(255,255,255,0.3)',
		alignSelf: 'stretch',
		borderRadius: 5,
	},
	buttonContainer: {
		backgroundColor: '#df1e36',
		alignSelf: 'stretch',
		padding: 20,
		borderRadius: 5,
	},
	buttonText: {
		color: '#fff',
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	forText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'right',
		marginTop: 10,
	},
	kbd: {
		marginBottom: 10,
	},
});
