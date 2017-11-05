import * as Types from '../types';
import axios from 'axios';
import firebase from 'firebase';

export const nextPeriod = (gameId) => {
	return async dispatch => {
		dispatch({type: Types.NEXT_PERIOD});
		dispatch({type: Types.TOGGLE_ABSOLUTE_LOADING});
		let token = await firebase.auth().currentUser.getIdToken();
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
		}).catch(e => {
			alert('Failed to travel to next round');
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
				t.update(ref, {chips})
			});
		}).then(() => {
			dispatch({type: Types.CLOSE_BANK_MODAL});
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
				t.update(ref, {
					chips: chips - cost,
					ship: {
						defense: gameData.ships[index].defense,
						maxSpace: gameData.ships[index].maxSpace,
						cost: gameData.ships[index].cost,
						name: ship
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