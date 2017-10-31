import * as Types from '../types';
import firebase from 'firebase';
import 'firebase/firestore';

let fetchGamesQuery;

export const fetchGames = () => {
	console.log('fetching games');
	return dispatch => {
		dispatch({type: Types.FETCH_GAMES});
		fetchGamesQuery = firebase.firestore().collection('single').where('userId', '==', firebase.auth().currentUser.uid);
		fetchGamesQuery.onSnapshot(snapshot => {
			dispatch({type: Types.FETCHED_GAMES, payload: snapshot.docs.map(doc => doc.data())});
		}, err => {
			dispatch({type: Types.FETCHED_GAMES_FAILED});
		});
	}
};

// This isn't being called
export const unmountFetchGames = () => {
	fetchGamesQuery();
	console.log('unmounting query');
	return{
		type: Types.UNMOUNT_FETCH_GAMES
	}
};