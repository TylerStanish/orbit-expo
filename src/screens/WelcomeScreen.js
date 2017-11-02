import React from 'react';
import {Dimensions} from 'react-native';
import AppIntro from 'react-native-app-intro';

export default class WelcomeScreen extends React.Component{

	onSkipBtnHandle = () => {
		this.props.navigation.navigate('PhoneVerify');
	}

	doneBtnHandle = () => {
		this.props.navigation.navigate('PhoneVerify');
	}

	render(){
		const pageArray = [{
			title: 'Orbit Smuggler',
			img: require('../../assets/icons/zeroth.png'),
			imgStyle: {
				flex:1,
				resizeMode: 'contain'
			},
			backgroundColor: '#212121',
			fontColor: '#fff',
			level: 10,
		}, {
			description: 'Orbit Smuggler is a turn based strategy app where you play the role of a smuggler moving black market goods around the solar system.',
			img: require('../../assets/icons/first.png'),
			imgStyle: {
				flex:1,
				resizeMode: 'contain'
			},
			backgroundColor: '#311B92',
			fontColor: '#fff',
			level: 10,
		}, {
			description: 'Make wise economic decisions buying low and selling high on black market goods in a dystopian high-tech future. Beware of authorities.',
			img: require('../../assets/icons/second.png'),
			imgStyle: {
				flex:1,
				resizeMode: 'contain'
			},
			backgroundColor: '#263238',
			fontColor: '#fff',
			level: 10,
		}, {
			description: 'Use the Orbit to your advantage. Trade when planets are close.',
			img: require('../../assets/icons/fourth.png'),
			imgStyle: {
				height: 93 * 2.5,
				width: Dimensions.get('window').width,
			},
			backgroundColor: '#000000',
			fontColor: '#fff',
			level: 10,
		}, {
			description: 'Pay off your debt quickly or face dire consequences. Keep earning chips (currency) and best your previous score.',
			img: require('../../assets/icons/third.png'),
			imgStyle: {
				height: 93 * 2.5,
				width: Dimensions.get('window').width,
			},
			backgroundColor: '#004D40',
			fontColor: '#fff',
			level: 10,
		}];
		return(
			<AppIntro
				onNextBtnClick={this.nextBtnHandle}
				onDoneBtnClick={this.doneBtnHandle}
				onSkipBtnClick={this.onSkipBtnHandle}
				onSlideChange={this.onSlideChangeHandle}
				pageArray={pageArray}
			/>
		)
	}
}