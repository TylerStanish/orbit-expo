import * as Types from '../types';
import axios from 'axios';
import firebase from 'firebase';

export const createGame = (name, weeks) => {
	return async (dispatch) => {
		dispatch({type: Types.CREATE_GAME});
		let token = await firebase.auth().currentUser.getIdToken();
		axios.post(`${process.env.URL}/createGame`, {
			name,
			weeks,
			token: token
		}).then(() => {
			dispatch({type: Types.CREATED_GAME});
			dispatch({type: Types.CLOSE_NEW_GAME_MODAL});
		}).catch(error => {
			dispatch({type: Types.CREATED_GAME_FAILED, payload: error.response.error});
		});
	}
};

export const openNewGameModal = () => {
	return{
		type: Types.OPEN_NEW_GAME_MODAL
	}
};

export const closeNewGameModal = () => {
	return{
		type: Types.CLOSE_NEW_GAME_MODAL
	}
};