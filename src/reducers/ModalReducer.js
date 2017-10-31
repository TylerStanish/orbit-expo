import * as Types from '../actions/types';

const initialState = {
	newGameModalVisible: false,
	bankModalVisible: false,
	shipModalVisible: false,
	travelModalVisible: false
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
		default: return state;
	}
}