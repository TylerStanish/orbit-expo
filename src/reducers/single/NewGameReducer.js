import * as Types from '../../actions/types';

const initialState = {
	loading: false,
	error: null
};

export default (state = initialState, action) => {
	switch(action.type){
		case Types.CREATE_GAME:
			return{
				...state,
				loading: true
			};
		case Types.CREATED_GAME:
			return{
				...state,
				loading: false
			};
		case Types.CREATED_GAME_FAILED:
			return{
				...state,
				loading: false,
				error: 'Failed to create game'
			};
		default: return state;
	}
}