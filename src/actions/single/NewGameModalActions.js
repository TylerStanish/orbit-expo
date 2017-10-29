import * as Types from '../types';
import firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp({
	apiKey: 'AIzaSyAoh8fDZ9x5b5NI39xFHe--DnqGOsxrxlc',
	authDomain: 'smuggler-23fe7.firebaseapp.com',
	projectId: 'smuggler-23fe7'
});

const db = firebase.firestore();

export const createGame = (name, weeks) => {
	return dispatch => {
		dispatch({type: Types.CREATE_GAME});
		db.collection('single').add({
			maxPeriods: weeks,
			currentPeriod: 1,
			captainName: name,
			repository: [],
			chips: 2500,
			debt: 6000,
			netWorth: 0,
			ship: {
				name: 'Asteroid Clunker',
				maxStorage: 60
			},
			userId: firebase.auth().currentUser.uid
		}).then((doc) => {
			dispatch({type: Types.CREATED_GAME});
		}).catch((e) => {
			dispatch({type: Types.CREATED_GAME_FAILED});
		});
	}
};