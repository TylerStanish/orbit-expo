import * as Types from '../actions/types';

const initialState = {
	newGameModalVisible: false
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
		default: return state;
	}
}