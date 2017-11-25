import * as Types from './types';
import firebase from 'firebase';
import 'firebase/firestore';

let leaderboard30Query;
export const fetchLeaderboard30 = () => {
  return dispatch => {
    dispatch({type: Types.FETCH_LEADERBOARD_30});
    leaderboard30Query = firebase.firestore().collection('leaderboard30').orderBy('score', 'desc').limit(10);
    leaderboard30Query.onSnapshot(snapshot => {
      dispatch({type: Types.FETCHED_LEADERBOARD_30, payload: snapshot.docs.map(doc => doc.data())});
    }, err => {
      dispatch({type: Types.FETCH_LEADERBOARD_30_FAILED});
    });
  }
};

export const unmountFetchLeaderboard30 = () => {
  if(leaderboard30Query.firestore.INTERNAL.delete) leaderboard30Query.firestore.INTERNAL.delete();
  console.log('unmounting query 30');
  return{
    type: 'bla'
  }
};

let leaderboard60Query;
export const fetchLeaderboard60 = () => {
  return dispatch => {
    dispatch({type: Types.FETCH_LEADERBOARD_60});
    leaderboard60Query = firebase.firestore().collection('leaderboard60').orderBy('score', 'desc').limit(10);
    leaderboard60Query.onSnapshot(snapshot => {
      dispatch({type: Types.FETCHED_LEADERBOARD_60, payload: snapshot.docs.map(doc => doc.data())});
    }, err => {
      dispatch({type: Types.FETCH_LEADERBOARD_60_FAILED});
    });
  }
};

export const unmountFetchLeaderboard60 = () => {
  if(leaderboard60Query.firestore.INTERNAL.delete) leaderboard60Query.firestore.INTERNAL.delete();
  console.log('unmounting query 60');
  return{
    type: 'bla'
  }
};

let leaderboard90Query;
export const fetchLeaderboard90 = () => {
  return dispatch => {
    dispatch({type: Types.FETCH_LEADERBOARD_90});
    leaderboard90Query = firebase.firestore().collection('leaderboard90').orderBy('score', 'desc').limit(10);
    leaderboard90Query.onSnapshot(snapshot => {
      dispatch({type: Types.FETCHED_LEADERBOARD_90, payload: snapshot.docs.map(doc => doc.data())});
    }, err => {
      dispatch({type: Types.FETCH_LEADERBOARD_90_FAILED});
    });
  }
};

export const unmountFetchLeaderboard90 = () => {
  if(leaderboard90Query.firestore.INTERNAL.delete) leaderboard90Query.firestore.INTERNAL.delete();
  console.log('unmounting query 90');
  return{
    type: 'bla'
  }
};

export const resetPage = () => {
  return{
    type: Types.RESET_PAGE
  }
};