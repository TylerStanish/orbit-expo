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

export const openPhoneAuthModal = () => {
	return{
		type: Types.OPEN_PHONE_AUTH_MODAL
	}
};

export const closePhoneAuthModal = () => {
	return{
		type: Types.CLOSE_PHONE_AUTH_MODAL
	}
};

export const openTransactionModal = (buying, item) => {
	return{
		type: Types.OPEN_TRANSACTION_MODAL,
		payload: {buying, item}
	}
};

export const closeTransactionModal = () => {
	return{
		type: Types.CLOSE_TRANSACTION_MODAL
	}
};

export const setBankModalAmount = (amount) => {
	return{
		type: Types.SET_BANK_MODAL_AMOUNT,
		payload: amount
	}
};