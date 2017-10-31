import * as Types from './types';

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

export const openBankModal = () => {
	return{
		type: Types.OPEN_BANK_MODAL
	}
};

export const closeBankModal = () => {
	return{
		type: Types.CLOSE_BANK_MODAL
	}
};

export const openShipModal = () => {
	return{
		type: Types.OPEN_SHIP_MODAL
	}
};

export const closeShipModal = () => {
	return{
		type: Types.CLOSE_SHIP_MODAL
	}
};

export const openTravelModal = () => {
	return{
		type: Types.OPEN_TRAVEL_MODAL
	}
};

export const closeTravelModal = () => {
	return{
		type: Types.CLOSE_TRAVEL_MODAL
	}
};