import * as Types from '../../actions/types';

const initialState = {
	games: [],
	game: null,
	loading: false,
	loadingGames: false
};

export default (state = initialState, action) => {
	switch(action.type){
		case Types.FETCH_GAMES:
			return{
				...state,
				loading: true
			};
		case Types.FETCHED_GAMES:
			return{
				...state,
				loading: false,
				games: action.payload
			};
		case Types.FETCHED_GAMES_FAILED:
			return{
				...state,
				loading: false
			};
		case Types.FETCH_GAME:
			return{
				...state,
				loadingGame: true,
			};
		case Types.FETCHED_GAME:
			return{
				...state,
				game: action.payload
			};
		default: return state;
	}
}