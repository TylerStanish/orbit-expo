import * as types from '../actions/types';

const initialstate = {
	email: '',
	password: '',
	user: null,
	loading: false,
}

export default (state = initialstate, action) => {
	switch(action.type){
		case types.UPDATE_USER:
			return{...state, user: action.payload}
		default: return state;
	}
}
