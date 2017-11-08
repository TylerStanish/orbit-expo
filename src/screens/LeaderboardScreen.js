import React from 'react';
import{
	View,
	Text
} from 'react-native';
import {connect} from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import {fetchLeaderboard30, fetchLeaderboard60, fetchLeaderboard90} from '../actions/LeaderboardActions';

class LeaderboardScreen extends React.Component{

	static navigationOptions = {
		title: 'Leaderboards'
	}

	componentWillMount(){
		this.props.fetchLeaderboard30();
		this.props.fetchLeaderboard60();
		this.props.fetchLeaderboard90();
	}

	componentWillUnmount(){
		// unmount the snapshot
	}

	render(){
		return(
			<ScrollableTabView>
				<LeaderboardList topDawgs={this.props.leaders30} tabLabel={'30 weeks'}/>
				<LeaderboardList topDawgs={this.props.leaders60} tabLabel={'60 weeks'}/>
				<LeaderboardList topDawgs={this.props.leaders90} tabLabel={'90 weeks'}/>
			</ScrollableTabView>
		);
	}
}

export default connect(state => {
	return{
		leaders30: state.leaderboardReducer.leaderboard30,
		leaders60: state.leaderboardReducer.leaderboard60,
		leaders90: state.leaderboardReducer.leaderboard90
	}
}, {
	fetchLeaderboard30,
	fetchLeaderboard60,
	fetchLeaderboard90
})(LeaderboardScreen);

class LeaderboardList extends React.Component{

	// don't let users view more than ten because it will satisfy them!
	// they must not settle for anything less than best!
	renderLeaders(){
		return this.props.topDawgs.map(user => {
			return(
				<View style={{margin: 10, flexDirection: 'row', flex: 1, justifyContent: 'space-between'}}>
					<Text style={{fontWeight: 'bold'}}>{user.name}</Text>
					<Text>{user.score}</Text>
				</View>
			);
		});
	}

	render(){
		return(
			<View style={{flex: 1}}>
				{this.renderLeaders()}
			</View>
		);
	}
}