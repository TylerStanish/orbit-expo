// import React from 'react';
// import { connect } from 'react-redux';
// import { addNavigationHelpers, StackNavigator } from 'react-navigation';
//
// import WelcomeScreen from '../screens/WelcomeScreen';
// import AuthScreen from '../screens/AuthScreen';
// import ChooseScreen from '../screens/ChooseScreen';
// import SinglePlayerScreen from '../screens/SinglePlayerScreen';
// import SinglePlayerGameScreen from '../screens/SinglePlayerGameScreen';
// import PhoneVerify from '../screens/PhoneVerifyScreen';
// import LeaderboardScreen from '../screens/LeaderboardScreen';
// const AppNavigator = StackNavigator({
// 	Welcome: {
// 		screen: WelcomeScreen,
// 		navigationOptions: {
// 			header: null
// 		}
// 	},
// 	Auth: {
// 		screen: AuthScreen,
// 		navigationOptions: {
// 			header: null
// 		}
// 	},
// 	PhoneVerify: {
// 		screen: PhoneVerify,
// 		navigationOptions: {
// 			header: null
// 		}
// 	},
// 	Choose: {
// 		screen: ChooseScreen,
// 	},
// 	SinglePlayer: {
// 		screen: SinglePlayerScreen
// 	},
// 	SinglePlayerGame: {
// 		screen: SinglePlayerGameScreen
// 	},
// 	Leaderboard: {
// 		screen: LeaderboardScreen
// 	}
// });
//
// const AppWithNavigationState = ({ dispatch, nav }) => (
// 	<AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
// );
//
// const mapStateToProps = state => ({
// 	nav: state.nav,
// });
//
// export default connect(mapStateToProps)(AppWithNavigationState);