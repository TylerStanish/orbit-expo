import * as Types from '../actions/types';

const initialState = {
	newGameModalVisible: false,
	bankModalVisible: false,
	shipModalVisible: false,
	travelModalVisible: false,
	phoneAuthModalVisible: false,
	transactionModalVisible: false,
	transactionItem: null,

	absoluteLoading: false,

	bankModalAmount: 0,

	navigation: null
};

export default (state = initialState, action) => {
	switch(action.type){
		case Types.OPEN_NEW_GAME_MODAL:
			return{
				...state,
				newGameModalVisible: true
			};
		case Types.CLOSE_NEW_GAME_MODAL:
			return{
				...state,
				newGameModalVisible: false
			};
		case Types.OPEN_BANK_MODAL:
			return{
				...state,
				bankModalVisible: true
			};
		case Types.CLOSE_BANK_MODAL:
			return{
				...state,
				bankModalVisible: false
			};
		case Types.OPEN_SHIP_MODAL:
			return{
				...state,
				shipModalVisible: true
			};
		case Types.CLOSE_SHIP_MODAL:
			return{
				...state,
				shipModalVisible: false
			};
		case Types.OPEN_TRAVEL_MODAL:
			return{
				...state,
				travelModalVisible: true
			};
		case Types.CLOSE_TRAVEL_MODAL:
			return{
				...state,
				travelModalVisible: false
			};
		case Types.OPEN_PHONE_AUTH_MODAL:
			return{
				...state,
				phoneAuthModalVisible: true
			};
		case Types.CLOSE_PHONE_AUTH_MODAL:
			return{
				...state,
				phoneAuthModalVisible: false
			};
		case Types.OPEN_TRANSACTION_MODAL:
			return{
				...state,
				transactionModalVisible: true,
				transactionItem: action.payload.item,
				buying: action.payload.buying
			};
		case Types.CLOSE_TRANSACTION_MODAL:
			return{
				...state,
				transactionModalVisible: false
			};
		case Types.TOGGLE_ABSOLUTE_LOADING:
			return{
				...state,
				absoluteLoading: !state.absoluteLoading
			};
		case Types.SET_BANK_MODAL_AMOUNT:
			return{
				...state,
				bankModalAmount: action.payload
			};
		case Types.SET_NAVIGATOR:
			// UNBELIEVABLE! The line commented out below was the problem!
			// console.log(action.payload);
			return{
				...state,
				navigation: action.payload
			};
		// case Types.NEXT_PERIOD_FAIL:
		// 	return{
		// 		...state,
		// 		travelModalVisible: false
		// 	};
		default: return state;
	}
}