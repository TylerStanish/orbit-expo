import * as Types from '../types';
import firebase from 'firebase';
import 'firebase/firestore';

export const fetchGames = () => {
	return dispatch => {
		dispatch({type: Types.FETCH_GAMES});
		const query = firebase.firestore().collection('single').where('userId', '==', firebase.auth().currentUser.uid);
		query.onSnapshot(snapshot => {
			dispatch({type: Types.FETCHED_GAMES, payload: snapshot.docs.map(doc => doc.data())});
		}, err => {
			dispatch({type: Types.FETCHED_GAMES_FAILED});
		});
	}
}