import * as Types from './types';
import firebase from 'firebase';
import 'firebase/firestore';

export const fetchLeaderboard30 = () => {
	return dispatch => {
		dispatch({type: Types.FETCH_LEADERBOARD_30});
		let query = firebase.firestore().collection('leaderboard30').orderBy('score').limit(10);
		query.onSnapshot(snapshot => {
			dispatch({type: Types.FETCHED_LEADERBOARD_30, payload: snapshot.docs.map(doc => doc.data())});
		}, err => {
			dispatch({type: Types.FETCH_LEADERBOARD_30_FAILED});
		});
	}
};

export const fetchLeaderboard60 = () => {
	return dispatch => {
		dispatch({type: Types.FETCH_LEADERBOARD_60});
		let query = firebase.firestore().collection('leaderboard60');
		query.onSnapshot(snapshot => {
			dispatch({type: Types.FETCHED_LEADERBOARD_60, payload: snapshot.docs.map(doc => doc.data())});
		}, err => {
			dispatch({type: Types.FETCH_LEADERBOARD_60_FAILED});
		});
	}
};

export const fetchLeaderboard90 = () => {
	return dispatch => {
		dispatch({type: Types.FETCH_LEADERBOARD_90});
		let query = firebase.firestore().collection('leaderboard90');
		query.onSnapshot(snapshot => {
			dispatch({type: Types.FETCHED_LEADERBOARD_90, payload: snapshot.docs.map(doc => doc.data())});
		}, err => {
			dispatch({type: Types.FETCH_LEADERBOARD_90_FAILED});
		});
	}
};