import React from 'react';
import {
	View,
	ScrollView
} from 'react-native';
import {
	Button,
	ListItem
} from 'react-native-elements';
import {connect} from 'react-redux';
import {fetchGames} from '../actions';
import ModalTemplate from '../components/modals/ModalTemplate';
import NewGameModal from '../components/modals/NewGameModal';

class SinglePlayerScreen extends React.Component{

	state = {
		visible: false
	}

	componentWillMount(){
		this.props.fetchGames();
	}

	renderGames(){
		return this.props.games.map(game => {
			return <ListItem
				title={game.captainName}
				key={game._id}
			/>
		});
	}

	render(){
		return(
			<ScrollView contentContainerStyle={{flex: 1}} style={{paddingVertical: 10}}>
				<Button
					raised
					icon={{name: 'add'}}
					title={'New Game'}
					backgroundColor={'#97c662'}
					onPress={() => this.setState({visible: true})}
				/>
				{this.renderGames()}
				<ModalTemplate
					visible={this.state.visible}
					close={() => this.setState({visible: false})}
				>
					<NewGameModal/>
				</ModalTemplate>
			</ScrollView>
		)
	}
}

export default connect((state) => {
	return{
		games: state.fetchGamesReducer.games
	}
}, {fetchGames})(SinglePlayerScreen);