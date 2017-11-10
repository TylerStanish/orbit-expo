/*
*
* NOTES ON THE STRUCTURE OF THIS APP
*
* I plan to use Redux for all firebase firestore updates, transactions, etc.
* For most functionality I will implement cloud https functions except when it is
* an easy write to the database with minimal logic. In this case I will write directly.
*
* I plan on implementing global state with the current user logged in in order to
* prevent having to call an asynchronous function each time I wish to retrieve the user.
* The same goes for getting data from the game object.
*
* */

/*
* ORBIT SCRUM
*
* -- Travel costs? and interplanetary traveling
* -- Bases
* -- Add in bounty hunter
* -- Attach navigator to redux
*
* BUGS
* -- Graph shoots up after double click on home button
*
* MISC NOTES
* -- It may be a good thing that we make updates so that those at the top of the leaderboard
* go challenged when a new leaderboard pops up?
*
* */

window.Image = () => {};
console.disableYellowBox = true;

import React from 'react';
import {Alert} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import Expo, {Constants, Font} from 'expo';
import firebase from 'firebase';

import * as Types from './src/actions/types';
import {NavigationActions} from 'react-navigation';
import AppWithNavigationState from './src/navigation/Navigator';

export default class extends React.Component{

	state = {
		loading: true
	};

	componentWillMount(){
		process.env.URL = 'https://us-central1-smuggler-23fe7.cloudfunctions.net';
		firebase.initializeApp({
			apiKey: 'AIzaSyAoh8fDZ9x5b5NI39xFHe--DnqGOsxrxlc',
			authDomain: 'smuggler-23fe7.firebaseapp.com',
			projectId: 'smuggler-23fe7'
		});

		// firebase.firestore().enablePersistence().then(() => {
		// 	console.log('offline persistence enabled');
		// });

		firebase.auth().onAuthStateChanged(user => {
			if(this.state.loading) this.setState({loading: false});
			if(user){
				console.log(user);
				this.store.dispatch(NavigationActions.reset({
					index: 0,
					actions: [NavigationActions.navigate({routeName: 'Choose'})]
				}));
				return;
			}
			this.store.dispatch({
				type: Types.UPDATE_USER,
				payload: user
			});
			// this._navigator.dispatch(NavigationActions.reset({
			// 	index: 0,
			// 	actions: [NavigationActions.navigate({routeName: 'Welcome'})]
			// }));
			this.store.dispatch(NavigationActions.reset({
				index: 0,
				actions: [NavigationActions.navigate({routeName: 'Welcome'})]
			}));
		});
	}

	componentDidMount() {
		Font.loadAsync({
			'monospace': require('./assets/fonts/Monospace.ttf')
		});
		Alert.alert('Warning!', 'Your leaderboard status is temporary! This is only a beta test');
	}

	store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
	render(){

		if(this.state.loading){
			return <Expo.AppLoading/>
		}

		return(
			<Provider store={this.store}>
				<AppWithNavigationState/>
			</Provider>
		)
	}
}