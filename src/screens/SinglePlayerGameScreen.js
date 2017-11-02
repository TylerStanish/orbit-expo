import React from 'react';
import {
	View,
	Text
} from 'react-native';
import Itinerary from '../components/single/Itinerary';
import Market from '../components/single/Market';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {connect} from 'react-redux';
import {fetchGame, unmountFetchGame} from '../actions/single/FetchActions';

class SinglePlayerGameScreen extends React.Component{

	static navigationOptions = {
		headerRight: <Text style={{fontWeight: 'bold', marginRight: 10}}>Round 1/30</Text>
	}

	componentWillMount(){
		this.props.fetchGame(this.props.navigation.state.params.uid);
	}

	componentWillUnmount(){
		this.props.unmountFetchGame();
	}

	render(){
		return(
			<ScrollableTabView>
				<Itinerary game={this.props.game} tabLabel={'Itinerary'}/>
				<Market game={this.props.game} tabLabel={'Market'}/>
			</ScrollableTabView>
		);
	}
}

export default connect(state => {
	return{
		game: state.fetchGamesReducer.game
	}
}, {fetchGame, unmountFetchGame})(SinglePlayerGameScreen);