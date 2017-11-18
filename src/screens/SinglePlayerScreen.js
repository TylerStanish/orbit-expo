import React from 'react';
import {
	View,
	ActivityIndicator,
	TouchableOpacity,
	Image,
	Dimensions
} from 'react-native';
import {
	Button,
	Text,
	ListItem,
	List,
	Icon
} from 'react-native-elements';
import {connect} from 'react-redux';
import {fetchGames, openNewGameModal, unmountFetchGames, fetchGame} from '../actions';
import NewGameModal from '../components/modals/NewGameModal';
import styles from '../styles';

const {width} = Dimensions.get('window');

class SinglePlayerScreen extends React.Component{

	state = {
		height: 0
	};

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
					style={{height: this.state.height/5 - 10, marginVertical: 5, width: '100%', flexDirection: 'row', marginHorizontal: 5, justifyContent: 'space-between', alignItems: 'center'}}
					activeOpacity={0.8}
					key={game._id}
					onPress={() => this.props.navigation.navigate('SinglePlayerGame', {_id: game._id})}
				>
					<Image source={require('../../assets/icons/spaceship.jpg')} style={{borderRadius: 5, height: this.state.height/5 - 10, width: this.state.height/5-10}}/>
					<View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: 10}}>
						<Text numberOfLines={1} ellipsizeMode={'tail'} style={{textAlign: 'center',fontWeight: 'bold', fontSize: 20, width: width - this.state.height/5 - 30}}>{game.captainName}</Text>
						<Text style={{textAlign: 'center'}}>{game.ship.name}</Text>
						<Text style={{textAlign: 'center'}}>Net worth: {game.netWorth}</Text>
					</View>
					<Icon name={'chevron-right'} type={'font-awesome'} style={{marginRight: 10}}/>
				</TouchableOpacity>
			);
		});
	}

// <ListItem
// title={game.captainName}
// subtitle={game.ship.name}
// badge={{value: game.chips, containerStyle: {marginTop: 10}}}
// key={Math.random()}
// style={{height: this._height/5, borderTopWidth: 0.5}}
// onPress={() => this.props.navigation.navigate('SinglePlayerGame', {_id: game._id})}
// />

	handleLayout(e){
		this.setState({height: e.nativeEvent.layout.height});
	}

	render(){

		return(
			<View style={{flex: 1, paddingTop: 10}}>
				<Button
					raised
					icon={{name: 'add'}}
					title={'New Game'}
					backgroundColor={'#97c662'}
					onPress={() => this.props.openNewGameModal()}
					style={{marginBottom: 10}}
				/>
				<List style={{flex: 1}} onLayout={e => this.handleLayout(e)}>
					{this.props.loading ? <ActivityIndicator size={'large'}/> : <View/>}
					{this.renderGames()}
				</List>
				<NewGameModal/>
			</View>
		)
	}
}

export default connect((state) => {
	return{
		games: state.fetchGamesReducer.games,
		loading: state.fetchGamesReducer.loading
	}
}, {fetchGames, openNewGameModal, unmountFetchGames, fetchGame})(SinglePlayerScreen);