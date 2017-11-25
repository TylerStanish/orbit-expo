import * as Types from '../types';
import axios from 'axios';
import firebase from 'firebase';

const checkForLeaderboard = async (gameId, maxPeriods) => {

  let leaderboard = firebase.firestore().collection(`leaderboard${maxPeriods}`).orderBy('score', 'desc').limit(10).get().then(sn => sn.docs.map(doc => doc.data()));

};

export const nextPeriod = (gameId, last, location, cb) => {
  return async dispatch => {
    let doc = await firebase.firestore().collection('single').doc(gameId).get();
    let page = 0;
    if(doc.data().maxPeriods === 60) page = 1;
    if(doc.data().maxPeriods === 90) page = 2;
    dispatch({type: Types.NEXT_PERIOD});
    dispatch({type: Types.TOGGLE_ABSOLUTE_LOADING});
    let token = await firebase.auth().currentUser.getIdToken();
    axios.post(process.env.URL + '/nextPeriod', {
      gameId,
      location
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
        cb(doc.data().maxPeriods);
        dispatch({type: Types.SCROLL_TO_PAGE, payload: page});
        // check for leaderboard
        // checkForLeaderboard(gameId, doc.data().maxPeriods);
      }
    }).catch(e => {
      if(e){
        cb();
        console.log('called callback');
        dispatch({type: Types.NEXT_PERIOD_FAIL, error: e.response.data.error});
        dispatch({type: Types.SCROLL_TO_PAGE, payload: page});

        // check for leaderboard
        // checkForLeaderboard(gameId, doc.data().maxPeriods);
      }
      // changing to .message might be fix because alert() doesn't work for objects

      // dispatch({type: Types.TOGGLE_ABSOLUTE_LOADING});
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
        let debtPeriods = game.debtPeriods;
        if(debt === 0){
          debtPeriods = 0;
        }
        t.update(ref, {chips, debt, debtPeriods});
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
        let shipObject = {
          defense: shipObj.defense,
          maxSpace: shipObj.maxSpace,
          cost: shipObj.cost,
          name: ship,
          space: space,
          damage: 0,
          health: shipObj.health
        };
        console.log(shipObject);
        t.update(ref, {
          chips: chips - cost,
          ship: shipObject,
          purchasedShips: game.purchasedShips.concat(ship)
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

export const repairShip = (gameId) => {
  return async dispatch => {
    dispatch({type: Types.REPAIR_SHIP});
    const db = firebase.firestore();
    const ref = db.collection('single').doc(gameId);
    db.runTransaction(t => {
      return t.get(ref).then(doc => {
        let game = doc.data();
        let currentHealth = game.ship.health;
        let currentDamage = game.ship.damage;
        if(game.ship.damage === 0){
          return Promise.reject('Your ship is already at full health!');
        }
        if(game.chips < 15000){
          return Promise.reject('Insufficient funds');
        }
        t.update(ref, {
          chips: game.chips - 15000,
          'ship.damage': Math.max(0, game.ship.damage - 15)
        });
      });
    }).then(() => {
      dispatch({type: Types.REPAIRED_SHIP});
    }).catch((e) => {
      alert(e);
      dispatch({type: Types.REPAIRED_SHIP});
    });
  }
};

export const purchaseBase = (gameId, base) => {
  return async dispatch => {
    dispatch({type: Types.BUY_BASE});
    const db = firebase.firestore();
    const ref = db.collection('single').doc(gameId);
    db.runTransaction(t => {
      return t.get(ref).then(doc => {
        let game = doc.data();
        let chips = game.chips;
        if(game.purchasedBases.indexOf(base) >= 0){
          return Promise.reject('You already own this base');
        }
        if(chips - gameData.bases[base] < 0){
          return Promise.reject('Insufficient funds');
        }
        t.update(ref, {
          chips: chips - gameData.bases[base],
          purchasedBases: game.purchasedBases.concat(base)
        });
      });
    }).then(() => {
      dispatch({type: Types.BOUGHT_BASE});
    }).catch(e => {
      alert(e);
      dispatch({type: Types.BOUGHT_BASE});
    });
  }
};
