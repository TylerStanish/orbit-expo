import * as types from '../actions/types';

const initialstate = {
	email: '',
	password: '',
	user: null,
	loading: false,
}

export default (state = initialstate, action) => {
	switch(action.type){
		case types.EMAIL_CHANGED:
			return{...state, email: action.payload}
		case types.PASSWORD_CHANGED:
			return{...state, password: action.payload};
		default: return state;
	}
}
