import * as types from '../actions/types';

const initialState = {
	user: null,
	loading: false,
};

export default (state = initialState, action) => {
	switch(action.type){
		case types.UPDATE_USER:
			return{
				...state,
				user: action.payload
			};
		default: return state;
	}
}