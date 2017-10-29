import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import NewGameReducer from './single/NewGameReducer';
import FetchGamesReducer from './single/FetchGamesReducer';
import ModalReducer from './ModalReducer';

export default combineReducers({
	authReducer: AuthReducer,
	newGameReducer: NewGameReducer,
	fetchGamesReducer: FetchGamesReducer,
	modalReducer: ModalReducer
});