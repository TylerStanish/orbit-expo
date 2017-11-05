import React from 'react';
import {
	View
} from 'react-native';
import Itinerary from '../components/single/Itinerary';
import Market from '../components/single/Market';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {connect} from 'react-redux';
import {fetchGame, unmountFetchGame} from '../actions/single/FetchActions';
import Header from '../components/misc/Header';
import AbsoluteLoading from '../components/misc/AbsoluteLoading';
import Loading from '../components/misc/Loading';

class SinglePlayerGameScreen extends React.Component{

	static navigationOptions = ({navigation}) => {
		let {game} = navigation.state.params;
		return{
			headerRight: <Header/>
		}
	}

	componentWillMount(){
		console.log('should be called with _id', this.props.navigation.state.params._id);
		this.props.fetchGame(this.props.navigation.state.params._id);
	}

	componentWillUnmount(){
		this.props.unmountFetchGame();
	}

	render(){

		if(!this.props.game){
			return <Loading/>
		}

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