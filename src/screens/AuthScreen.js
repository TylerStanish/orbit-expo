import React from 'react';
import {
	View,
	Image,
	Dimensions
} from 'react-native';
import {
	Button,
	SocialIcon
} from 'react-native-elements';
import firebase from 'firebase';
import expo from 'expo';

export default class AuthScreen extends React.Component{

	async signInWithGoogle(){
		const res = await expo.Google.logInAsync({
			// androidClientId: '580733486966-5dsvbfucu5m3ci5994adgl6mk4csd9ft.apps.googleusercontent.com',
			iosClientId: '580733486966-d8frj55998k36puf1t5sijmk4vf94k6u.apps.googleusercontent.com',
			scopes: ['profile', 'email']
		});
		console.log(res);
		let credential = firebase.auth.GoogleAuthProvider.credential(res.idToken, res.accessToken);
		firebase.auth().signInWithCredential(credential).then(user => {
			this.props.navigation.navigate('Choose');
		}).catch((e) => {
			alert('Login failed');
			console.log(e);
		});
	}

	signUpWithPhone(){
		const number = '2196699311';
		const recaptcha =  new firebase.auth.RecaptchaVerifier('sign-in-button');
		firebase.auth().signInWithPhoneNumber(number, recaptcha).then(res => {
			console.log(res);
		}).catch(e => console.log(e));
	}

	render(){
		return(
			<View style={{flex: 1}}>
				<Image source={require('../../assets/icons/orbit.gif')} style={styles.backgroundImage}>
					<SocialIcon
						type={'facebook'}
						button
						title={'Sign in with Facebook'}
					/>
					<SocialIcon
						type={'twitter'}
						button
						title={'Sign in with Twitter'}
					/>
					<SocialIcon
						type={'google'}
						button
						title={'Sign in with Google'}
						style={{backgroundColor: '#DB4437'}}
						onPress={() => this.signInWithGoogle()}
					/>
					<SocialIcon
						type={'phone'}
						button
						title={'Sign up with phone'}
						style={{backgroundColor: 'gray'}}
						onPress={() => this.signUpWithPhone()}
					/>
				</Image>
			</View>
		)
	}
}

const styles = {
	backgroundImage: {
		resizeMode: 'cover',
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	}
}