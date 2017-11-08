import * as Types from '../actions/types';

const initialState = {
	leaderboard30Loading: false,
	leaderboard30: [],

	leaderboard60loading: false,
	leaderboard60: [],

	leaderboard90loading: false,
	leaderboard90: []
};

export default (state = initialState, action) => {
	switch(action.type){
		case Types.FETCH_LEADERBOARD_30:
			return{
				...state,
				leaderboard30Loading: true
			};
		case Types.FETCHED_LEADERBOARD_30:
			return{
				...state,
				leaderboard30: action.payload,
				leaderboard30Loading: false
			};
		case Types.FETCH_LEADERBOARD_30_FAILED:
			alert('Failed to fetch the leaderboard for 30 weeks');
			return{
				...state,
				leaderboard30Loading: false
			};
		default: return state;
	}
}