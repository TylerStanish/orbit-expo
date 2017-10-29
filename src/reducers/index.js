import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import NewGameReducer from './single/NewGameReducer';
import FetchGamesReducer from './single/FetchGamesReducer';

export default combineReducers({
	authReducer: AuthReducer,
	newGameReducer: NewGameReducer,
	fetchGamesReducer: FetchGamesReducer
});