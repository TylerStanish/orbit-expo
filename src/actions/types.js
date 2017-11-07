// export default {
// 	UPDATE_USER,
// 	CREATE_GAME,
// 	CREATED_GAME,
// 	CREATED_GAME_FAILED,
//
// 	FETCH_GAMES,
// 	FETCHED_GAMES,
// 	FETCHED_GAMES_FAILED,
//
// 	OPEN_NEW_GAME_MODAL,
// 	CLOSE_NEW_GAME_MODAL,
// 	OPEN_BANK_MODAL,
// 	CLOSE_BANK_MODAL,
// 	OPEN_SHIP_MODAL,
// 	CLOSE_SHIP_MODAL,
// 	OPEN_TRAVEL_MODAL,
// 	CLOSE_TRAVEL_MODAL
// }

export const UPDATE_USER = 'update_user';

export const CREATE_GAME = 'create_game';
export const CREATED_GAME = 'created_game';
export const CREATED_GAME_FAILED = 'created_game_failed';

// fetch types
export const FETCH_GAMES = 'fetch_games';
export const FETCHED_GAMES = 'fetched_games';
export const FETCHED_GAMES_FAILED = 'fetched_games_failed';
export const UNMOUNT_FETCH_GAMES = 'unmount_fetch_games';
export const FETCH_GAME = 'fetch_game';
export const FETCHED_GAME = 'fetched_game';
// export const FETCHED_GAME_FAILED = 'fetched_game_failed';

// Single player stuff
export const NEXT_PERIOD = 'next_period';
export const NEXT_PERIOD_SUCCESS = 'next_period_success';
export const NEXT_PERIOD_FAIL = 'next_period_fail';

export const SHIP_PURCHASE = 'ship_purchase';
export const SHIP_PURCHASED = 'ship_purchased';
export const SHIP_PURCHASE_FAILED = 'ship_purchased_failed';

export const BUY_CONTRABAND = 'buy_contraband';
export const BOUGHT_CONTRABAND = 'bought_contraband';
export const BUY_CONTRABAND_FAILED = 'buy_contraband_failed';
export const SELL_CONTRABAND = 'buy_contraband';
export const SOLD_CONTRABAND = 'bought_contraband';
export const SELL_CONTRABAND_FAILED = 'buy_contraband_failed';

// Auth types
export const SIGN_UP_WITH_PHONE = 'sign_up_with_phone';
export const SIGNED_UP_WITH_PHONE = 'signed_up_with_phone';
export const SIGNED_UP_WITH_PHONE_FAILED = 'signed_up_with_phone_failed';
export const REDEEM_CODE = 'redeem_code';
export const REDEEMED_CODE = 'redeemed_code';
export const REDEEMED_CODE_FAILED = 'redeemed_code_failed';

// Modal types
export const OPEN_NEW_GAME_MODAL = 'open_new_game_modal';
export const CLOSE_NEW_GAME_MODAL = 'close_new_game_modal';
export const OPEN_BANK_MODAL = 'open_bank_modal';
export const CLOSE_BANK_MODAL = 'close_bank_modal';
export const OPEN_SHIP_MODAL = 'open_ship_modal';
export const CLOSE_SHIP_MODAL = 'close_ship_modal';
export const OPEN_TRAVEL_MODAL = 'open_travel_modal';
export const CLOSE_TRAVEL_MODAL = 'close_travel_modal';
export const OPEN_PHONE_AUTH_MODAL = 'open_phone_auth_modal';
export const CLOSE_PHONE_AUTH_MODAL = 'close_phone_auth_modal';
export const OPEN_TRANSACTION_MODAL = 'open_transaction_modal';
export const CLOSE_TRANSACTION_MODAL = 'close_transaction_modal';
export const TOGGLE_ABSOLUTE_LOADING = 'toggle_absolute_loading';
export const SET_BANK_MODAL_AMOUNT = 'set_bank_modal_amount';