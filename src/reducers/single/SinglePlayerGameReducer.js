import * as Types from '../../actions/types';

const initialState = {
	nextPeriodLoading: false,
	shipLoading: false,
	buyShipError: '',

	buyContrabandLoading: false,
	sellContrabandLoading: false
};

export default (state = initialState, action) => {
	switch(action.type){
		case Types.NEXT_PERIOD:
			return{
				...state,
				nextPeriodLoading: true
			};
		case Types.NEXT_PERIOD_SUCCESS:
			return {
				...state,
				nextPeriodLoading: false
			};
		case Types.NEXT_PERIOD_FAIL:
			setTimeout(() => {
				alert(action.error);
			}, 1000);
			return{
				...state,
				nextPeriodLoading: false,
			};
		case Types.SHIP_PURCHASE:
			return{
				...state,
				shipLoading: true
			};
		case Types.SHIP_PURCHASED:
			return{
				...state,
				shipLoading: false
			};
		case Types.SHIP_PURCHASE_FAILED:
			alert(action.payload);
			return{
				...state,
				shipLoading: false
			};
		case Types.BUY_CONTRABAND:
			return{
				...state,
				buyContrabandLoading: true
			};
		case Types.BOUGHT_CONTRABAND:
			return{
				...state,
				buyContrabandLoading: false
			};
		case Types.BUY_CONTRABAND_FAILED:
			alert(action.payload);
			return{
				...state,
				buyContrabandLoading: false
			};
		case Types.SELL_CONTRABAND:
			return{
				...state,
				sellContrabandLoading: true
			};
		case Types.SOLD_CONTRABAND:
			return{
				...state,
				sellContrabandLoading: false
			};
		case Types.SELL_CONTRABAND_FAILED:
			alert(action.payload);
			return{
				...state,
				sellContrabandLoading: false
			};
		default: return state;
	}
}