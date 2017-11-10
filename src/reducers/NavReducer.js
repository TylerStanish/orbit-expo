import {NavigationActions} from 'react-navigation';
import * as Types from '../actions/types';
import AppNavigator from '../navigation/Navigator';

const firstAction = AppNavigator.router.getActionForPathAndParams('');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('Login');
const initialState = AppNavigator.router.getStateForAction(secondAction, tempNavState);

export default (state = initialState, action) => {
	const nextState = AppNavigator.router.getStateForAction(action, state);
	return nextState || state;
}