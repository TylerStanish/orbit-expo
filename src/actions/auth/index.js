import axios from 'axios';
import * as Types from '../types';

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
		}).then((tok) => {
			console.log(tok);
			console.log('^^^ should be the token');
			dispatch({type: Types.REDEEMED_CODE, payload: tok});
		}).catch(e => {
			console.log(e);
			console.log('the error');
			dispatch({type: Types.REDEEMED_CODE_FAILED, payload: e});
		});
	}
};