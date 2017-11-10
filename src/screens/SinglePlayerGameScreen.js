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
import Balance from '../components/misc/Balance';
import {
	Button
} from 'react-native-elements';

class SinglePlayerGameScreen extends React.Component{

	static navigationOptions = ({navigation}) => {
		let {game} = navigation.state.params;
		return{
			headerRight: <Header navigation={navigation}/>
		}
	}

	state = {
		height: 10
	}

	componentWillMount(){
		this.props.fetchGame(this.props.navigation.state.params._id);
	}

	componentWillUnmount(){
		this.props.unmountFetchGame();
	}

	componentWillReceiveProps(nextProps){
		console.log('received props', nextProps.game);
		if(!nextProps.game){
			this.props.navigation.navigate('SinglePlayer');
		}
	}

	render(){

		if(!this.props.game) {
			return <AbsoluteLoading/>
		}

		return(
			<View style={{flex: 1}}>
				<Balance chips={this.props.game.chips} debt={this.props.game.debt} netWorth={this.props.game.netWorth}/>
				<ScrollableTabView>
					<Itinerary game={this.props.game} tabLabel={'Itinerary'}/>
					<Market game={this.props.game} tabLabel={'Market'}/>
				</ScrollableTabView>
			</View>
		);
	}
}

export default connect(state => {
	return{
		game: state.fetchGamesReducer.game
	}
}, {fetchGame, unmountFetchGame})(SinglePlayerGameScreen);