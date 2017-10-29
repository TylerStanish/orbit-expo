import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import Expo, {Constants} from 'expo';
import firebase from 'firebase';

import * as Types from './src/actions/types';

import {StackNavigator, NavigationActions} from 'react-navigation';
import WelcomeScreen from './src/screens/WelcomeScreen';
import AuthScreen from './src/screens/AuthScreen';
import ChooseScreen from './src/screens/ChooseScreen';
import SinglePlayerScreen from './src/screens/SinglePlayerScreen';
import SinglePlayerGameScreen from './src/screens/SinglePlayerGameScreen';
const Navigator = StackNavigator({
	Welcome: {
		screen: WelcomeScreen,
		navigationOptions: {
			header: null
		}
	},
	Auth: {
		screen: AuthScreen,
		navigationOptions: {
			header: null
		}
	},
	Choose: {
		screen: ChooseScreen,
	},
	SinglePlayer: {
		screen: SinglePlayerScreen
	},
	SinglePlayerGame: {
		screen: SinglePlayerGameScreen
	}
});

export default class extends React.Component{

	state = {
		loading: true
	}

	componentWillMount(){
		firebase.auth().onAuthStateChanged(user => {
			if(this.state.loading) this.setState({loading: false});
			if(user){
				this._navigator.dispatch(NavigationActions.reset({
					index: 0,
					actions: [NavigationActions.navigate({routeName: 'Choose'})]
				}))
			}
			this.store.dispatch({
				type: Types.UPDATE_USER,
				payload: user
			});
		});
	}

	store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
	render(){

		if(this.state.loading){
			return <Expo.AppLoading/>
		}

		return(
			<Provider store={this.store}>
				<Navigator
					ref={ref => this._navigator = ref}
				/>
			</Provider>
		)
	}
}