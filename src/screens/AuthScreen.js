import React from 'react';
import {
	View,
	Image
} from 'react-native';
import {
	SocialIcon,
	FormInput
} from 'react-native-elements';
import firebase from 'firebase';
import expo from 'expo';
import styles from '../styles';
import {connect} from 'react-redux';

import PhoneAuthModal from '../components/modals/PhoneAuthModal';
import {openPhoneAuthModal} from '../actions/Modals';

class AuthScreen extends React.Component{

	state = {
		number: 0
	}

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
		// let {number} = this.state;
		// number = Number(number);
		// if(isNaN(number)){
		// 	alert('Invalid phone number');
		// 	return;
		// }
		// this.props.openPhoneAuthModal();
		this.props.navigation.navigate('PhoneVerify');
	}

	render(){
		return(
			<View style={{flex: 1}}>
				<Image source={require('../../assets/icons/orbit.gif')} style={styles.backgroundImage}>
					<FormInput
						keyboardType={'phone-pad'}
						onChangeText={number => this.setState({number})}
					/>
					<SocialIcon
						type={'phone'}
						button
						title={'Sign up with phone'}
						style={{backgroundColor: 'gray'}}
						onPress={() => this.signUpWithPhone()}
					/>
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
				</Image>
				<PhoneAuthModal/>
			</View>
		)
	}
}

export default connect(null, {openPhoneAuthModal})(AuthScreen);