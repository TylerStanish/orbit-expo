import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import {Constants} from 'expo';

import firebase from 'firebase';
firebase.initializeApp({
	apiKey: 'AIzaSyAoh8fDZ9x5b5NI39xFHe--DnqGOsxrxlc',
	authDomain: 'smuggler-23fe7.firebaseapp.com',
	projectId: 'smuggler-23fe7'
});

import {StackNavigator} from 'react-navigation';
import WelcomeScreen from './src/screens/WelcomeScreen';
import AuthScreen from './src/screens/AuthScreen';
import ChooseScreen from './src/screens/ChooseScreen';
import SinglePlayerScreen from './src/screens/SinglePlayerScreen';
const Navigator = StackNavigator({
	Welcome: {
		screen: WelcomeScreen
	},
	Auth: {
		screen: AuthScreen
	},
	Choose: {
		screen: ChooseScreen
	},
	SinglePlayer: {
		screen: SinglePlayerScreen
	}
}, {
	headerMode: 'none',
	navigationOptions: {
		tabBarVisible: false
	}
});

export default class extends React.Component{
	render(){
		const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

		return(
			<Provider store={store}>
				<Navigator/>
			</Provider>
		)
	}
}