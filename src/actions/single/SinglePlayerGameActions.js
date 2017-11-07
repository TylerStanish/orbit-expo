import * as Types from '../types';
import axios from 'axios';
import firebase from 'firebase';
import App from '../../../App';

export const nextPeriod = (gameId, last, cb) => {
	return async dispatch => {
		dispatch({type: Types.NEXT_PERIOD});
		dispatch({type: Types.TOGGLE_ABSOLUTE_LOADING});
		let token = await firebase.auth().currentUser.getIdToken();
		console.log('this is what youre looking for');
		console.log(gameId, last, token);
		axios.post(process.env.URL + '/nextPeriod', {
			gameId
		}, {
			headers: {
				'x-auth': token
			}
		}).then(() => {
			dispatch({type: Types.NEXT_PERIOD_SUCCESS});
			dispatch({type: Types.CLOSE_TRAVEL_MODAL});
			dispatch({type: Types.TOGGLE_ABSOLUTE_LOADING});
			if(last){
				// dispatch a navigator action that goes back to the SinglePlayerScreen
				cb();
			}
		}).catch(e => {
			console.log(e);
			dispatch({type: Types.NEXT_PERIOD_FAIL});
			dispatch({type: Types.TOGGLE_ABSOLUTE_LOADING});
		});
	}
};

export const borrow = (gameId, amount) => {
	return async dispatch => {
		const db = firebase.firestore();
		const ref = db.collection('single').doc(gameId);
		db.runTransaction(t => {
			return t.get(ref).then(doc => {
				let game = doc.data();
				let chips = game.chips + amount;
				let debt = game.debt + amount;
				t.update(ref, {chips, debt});
			});
		}).then(() => {
			dispatch({type: Types.CLOSE_BANK_MODAL});
			dispatch({type: Types.SET_BANK_MODAL_AMOUNT, payload: 0});
		}).catch((e) => {
			alert('Transaction failed');
			console.log(e);
		});
	}
};

export const payBack = (gameId, amount) => {
	return async dispatch => {
		const db = firebase.firestore();
		const ref = db.collection('single').doc(gameId);
		db.runTransaction(t => {
			return t.get(ref).then(doc => {
				let game = doc.data();
				let chips = game.chips - amount;
				let debt = game.debt - amount;
				t.update(ref, {chips, debt});
			});
		}).then(() => {
			dispatch({type: Types.CLOSE_BANK_MODAL});
			dispatch({type: Types.SET_BANK_MODAL_AMOUNT, payload: 0});
		}).catch((e) => {
			alert('Transaction failed');
			console.log(e);
		});
	}
};

const costObj = {
	'Asteroid Clunker': '0',
	'Trade Vessel': '200,000',
	'Curator Starfighter': '1,000,000',
	'Imperial Yacht': '10,000,000'
};
const rawCost = {
	'Asteroid Clunker': 0,
	'Trade Vessel': 200000,
	'Curator Starfighter': 1000000,
	'Imperial Yacht': 10000000
};
import gameData from '../../gameData.json';
export const buyShip = (gameId, ship) => {
	return async dispatch => {
		dispatch({type: Types.SHIP_PURCHASE});
		const db = firebase.firestore();
		const ref = db.collection('single').doc(gameId);
		db.runTransaction(t => {
			return t.get(ref).then(doc => {
				let game = doc.data();
				let chips = game.chips;
				let cost = rawCost[ship];
				if(chips < cost){
					return Promise.reject('Insufficient funds');
				}
				let index;
				gameData.ships.map((shipObj, i) => {
					if(shipObj.name === ship){
						index = i;
					}
				});
				if(isNaN(index)){
					return Promise.reject('Invalid ship choice');
				}
				let shipObj = gameData.ships[index];

				let spaceOccupied = 0;
				for(let item in gameData.repository){
					spaceOccupied += gameData.repository[item].qty;
				}
				let space = shipObj.maxSpace - spaceOccupied;

				t.update(ref, {
					chips: chips - cost,
					ship: {
						defense: shipObj.defense,
						maxSpace: shipObj.maxSpace,
						cost: shipObj.cost,
						name: ship,
						space
					}
				});
			});
		}).then(() => {
			dispatch({type: Types.SHIP_PURCHASED});
			dispatch({type: Types.CLOSE_SHIP_MODAL});
		}).catch(e => {
			dispatch({type: Types.SHIP_PURCHASE_FAILED, payload: e});
		});
	}
};

export const buyContraband = (gameId, amountBuy, contrabandType, cb) => {
	return async dispatch => {
		dispatch({type: Types.BUY_CONTRABAND});
		const db = firebase.firestore();
		const ref = db.collection('single').doc(gameId);
		db.runTransaction(t => {
			return t.get(ref).then(doc => {
				let game = doc.data();
				let price = game.repository[contrabandType].prices.slice(-1).pop();
				let cost = amountBuy * price;
				let chips = game.chips;
				let newChips = chips - cost;
				if(amountBuy > game.ship.space){
					return Promise.reject('Not enough room on your ship!');
				}
				if(cost > chips){
					return Promise.reject('Insufficient funds!');
				}
				let newRepo = game.repository;
				newRepo[contrabandType].qty = amountBuy+game.repository[contrabandType].qty;
				t.update(ref, {
					chips: newChips,
					repository: newRepo,
					'ship.space': game.ship.space - amountBuy
				});
				return Promise.resolve();
			});
		}).then(() => {
			dispatch({type: Types.BOUGHT_CONTRABAND});
			cb();
		}).catch(e => {
			dispatch({type: Types.BUY_CONTRABAND_FAILED, payload: e});
		});
	}
};

export const sellContraband = (gameId, amountSell, contrabandType, cb) => {
	return async dispatch => {
		dispatch({type: Types.SELL_CONTRABAND});
		const db = firebase.firestore();
		const ref = db.collection('single').doc(gameId);
		db.runTransaction(t => {
			return t.get(ref).then(doc => {
				let game = doc.data();
				let price = game.repository[contrabandType].prices.slice(-1).pop();
				let cost = amountSell * price;
				let chips = game.chips;
				let newChips = chips + cost;
				let newRepo = game.repository;
				newRepo[contrabandType].qty = game.repository[contrabandType].qty - amountSell;
				t.update(ref, {
					chips: newChips,
					repository: newRepo,
					'ship.space': game.ship.space + amountSell
				});
				return Promise.resolve();
			});
		}).then(() => {
			dispatch({type: Types.SOLD_CONTRABAND});
			cb();
		}).catch(e => {
			dispatch({type: Types.SELL_CONTRABAND_FAILED, payload: e});
		});
	}
};