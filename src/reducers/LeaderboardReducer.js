import * as Types from '../actions/types';

const initialState = {
	leaderboard30Loading: false,
	leaderboard30: [],

	leaderboard60loading: false,
	leaderboard60: [],

	leaderboard90loading: false,
	leaderboard90: [],

	page: 0
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
		case Types.FETCHED_LEADERBOARD_60:
			console.log(action.payload, 'from leaderboards here');
			return{
				...state,
				leaderboard60: action.payload,
				leaderboard60loading: false
			};
		case Types.FETCH_LEADERBOARD_60_FAILED:
			alert('Failed to fetch the leaderboard for 60 weeks');
			return{
				...state,
				leaderboard60Loading: false
			};
		case Types.FETCHED_LEADERBOARD_90:
			return{
				...state,
				leaderboard90: action.payload,
				leaderboard90loading: false
			};
		case Types.FETCH_LEADERBOARD_90_FAILED:
			alert('Failed to fetch the leaderboard for 90 weeks');
			return{
				...state,
				leaderboard90Loading: false
			};
		case Types.SCROLL_TO_PAGE:
			return{
				...state,
				page: action.payload
			};
		case Types.RESET_PAGE:
			return{
				...state,
				page: 0
			}
		default: return state;
	}
}