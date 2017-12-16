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
      console.log(e);
      dispatch({type: Types.SIGNED_UP_WITH_PHONE_FAILED, payload: e.response.data.error});
    });
  }
};

export const redeemCode = (code, phone) => {
  return dispatch => {
    dispatch({type: Types.REDEEM_CODE});

  }
};