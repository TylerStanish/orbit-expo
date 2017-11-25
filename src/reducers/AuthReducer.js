import * as types from '../actions/types';

const initialState = {
	user: null,
	loading: false,
	loadingRedeem: false,
	error: null,
	errorRedeem: null,
	token: null
};

export default (state = initialState, action) => {
	switch(action.type){
		case types.UPDATE_USER:
			return{
				...state,
				user: action.payload
			};
		case types.SIGN_UP_WITH_PHONE:
			return{
				...state,
				loading: true
			};
		case types.SIGNED_UP_WITH_PHONE:
			return{
				...state,
				loading: false
			};
		case types.SIGNED_UP_WITH_PHONE_FAILED:
      alert(action.payload);
			return{
				...state,
				loading: false,
				error: action.payload
			};
		case types.REDEEM_CODE:
			return{
				...state,
				loadingRedeem: true
			};
		case types.REDEEMED_CODE:
			return{
				...state,
				loadingRedeem: false,
				token: action.payload
			};
		case types.REDEEMED_CODE_FAILED:
		  alert(action.payload);
			return{
				...state,
				loadingRedeem: false,
				errorRedeem: action.payload
			};
		default: return state;
	}
}