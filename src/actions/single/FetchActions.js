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
			console.log(err);
			dispatch({type: Types.FETCHED_GAMES_FAILED, payload: err});
		});
	}
};

// This isn't being called
export const unmountFetchGames = () => {
	if(fetchGamesQuery.firestore.INTERNAL.delete) fetchGamesQuery.firestore.INTERNAL.delete();
	console.log('unmounting query');
	return{
		type: Types.UNMOUNT_FETCH_GAMES
	}
};

let fetchGameQuery;
export const fetchGame = (_id) => {
	// if(typeof fetchGameQuery === 'function'){
	// 	console.log('undoing');
	// 	fetchGamesQuery();
	// }
	return dispatch => {
		dispatch({type: Types.FETCH_GAME});
		fetchGameQuery = firebase.firestore().collection('single').where('_id', '==', _id).onSnapshot(snapshot => {
			console.log(snapshot.docs[0], 'should be game returned on fetch');
			dispatch({type: Types.FETCHED_GAME, payload: snapshot.docs[0].data()});
		});
	}
};

export const unmountFetchGame = () => {
	if(typeof fetchGameQuery === 'function'){
		fetchGameQuery();
	}
	return{type: 'bla'};
};