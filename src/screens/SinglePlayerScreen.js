import React from 'react';
import {
	View,
	ScrollView,
	TouchableOpacity
} from 'react-native';
import {
	Button,
	Text
} from 'react-native-elements';
import {connect} from 'react-redux';
import {fetchGames, openNewGameModal, unmountFetchGames} from '../actions';
import NewGameModal from '../components/modals/NewGameModal';

class SinglePlayerScreen extends React.Component{

	componentWillMount(){
		this.props.fetchGames();
	}

	componentWillUnmount(){
		this.props.unmountFetchGames();
	}

	renderGames(){
		return this.props.games.map(game => {
			return (
				<TouchableOpacity
					key={Math.random()}
					style={{height: this._height/5, borderTopWidth: 0.5}}
					onPress={() => this.props.navigation.navigate('SinglePlayerGame')}
				>
					<Text>{game.captainName}</Text>
				</TouchableOpacity>
			);
		});
	}

	handleLayout(e){
		this._height = e.nativeEvent.layout.height;
	}

	render(){
		return(
			<ScrollView contentContainerStyle={{flex: 1}} style={{paddingTop: 10}}>
				<Button
					raised
					icon={{name: 'add'}}
					title={'New Game'}
					backgroundColor={'#97c662'}
					onPress={() => this.props.openNewGameModal()}
				/>
				<View style={{flex: 1}} onLayout={e => this.handleLayout(e)}>
					{this.renderGames()}
				</View>
				<NewGameModal/>
			</ScrollView>
		)
	}
}

export default connect((state) => {
	return{
		games: state.fetchGamesReducer.games
	}
}, {fetchGames, openNewGameModal, unmountFetchGames})(SinglePlayerScreen);