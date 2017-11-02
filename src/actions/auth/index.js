import axios from 'axios';
import * as Types from '../types';
import firebase from 'firebase';

export const signInWithPhone = (phone, cb) => {
	return dispatch => {
		dispatch({type: Types.SIGN_UP_WITH_PHONE});
		axios.post(process.env.URL + '/signInWithPhone', {
			phone
		}).then((tok) => {
			console.log(tok);
			console.log('^^^ should be undefined');
			cb();
			dispatch({type: Types.SIGNED_UP_WITH_PHONE, payload: tok});
		}).catch(e => {
			cb(e);
			dispatch({type: Types.SIGNED_UP_WITH_PHONE_FAILED, payload: e});
		});
	}
};

export const redeemCode = (phone, code) => {
	return dispatch => {
		dispatch({type: Types.REDEEM_CODE});
		axios.post(process.env.URL + '/redeemCode', {
			phone,
			code
		}).then((res) => {
			let tok = res.data.token;
			console.log(tok);
			console.log('^^^ should be the token');
			// let's log em' in
			firebase.auth().signInWithCustomToken(tok).then(() => {
				dispatch({type: Types.REDEEMED_CODE, payload: tok});
			}).catch(e => {
				dispatch({type: Types.REDEEMED_CODE_FAILED, payload: e});
			});
		}).catch(e => {
			console.log(e);
			console.log('the error');
			dispatch({type: Types.REDEEMED_CODE_FAILED, payload: e});
		});
	}
};