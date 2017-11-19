import React from 'react';
import {
	Image,
	Dimensions,
	View
} from 'react-native';
const {height, width} = Dimensions.get('window');
import {connect} from 'react-redux';
import ModalTemplate from './ModalTemplate';
import {
	Button,
	CheckBox
} from 'react-native-elements';
import {closeTravelModal} from '../../actions/Modals';
import {nextPeriod} from '../../actions/single/SinglePlayerGameActions';
import gameData from '../../gameData.json';
import {NavigationActions} from 'react-navigation';

const Earth = require('../../../assets/icons/earth.png');
const Rota = require('../../../assets/icons/rota.png');
const Mars = require('../../../assets/icons/mars.png');
const Phobos = require('../../../assets/icons/phobos.png');
const Moon = require('../../../assets/icons/moon.png');

class TravelModal extends React.Component{

	state = {selected: this.props.game.currentLocation};

	renderPlanets(){
		return gameData.places.map(place => {
			return <CheckBox
				title={place + ' - ∂ ' + this.props.game.travelCosts[place]}
				checkedIcon={'dot-circle-o'}
				uncheckedIcon={'circle-o'}
				onPress={() => this.setState({selected: place})}
				checked={this.state.selected === place}
				key={place}
			/>
		});
	}

	travel(){
		if(!this.state.selected){
			return alert('No planet selected!');
		}
		if(this.props.game.travelCosts[this.state.selected] > this.props.game.chips){
			alert('Insufficient funds');
			return;
		}
		this.props.nextPeriod(this.props.game._id, this.props.game.currentPeriod === this.props.game.maxPeriods, this.state.selected, (maxPeriods) => {
			// this.props.navigation.navigate('SinglePlayer');
			this.props.close();
			this.props.navigation.dispatch(NavigationActions.reset({
				index: 1,
				actions: [NavigationActions.navigate({routeName: 'Choose'}), NavigationActions.navigate({routeName: 'Leaderboard'})]
			}));
			// this.props.navigation.dispatch(NavigationActions.navigate({
			// 	index: 0,
			// 	actions: [NavigationActions.navigate({routeName: 'Leaderboard'})]
			// }));
		});
	}

	render(){

		let uri;
		switch(this.state.selected){
			case 'Earth':
				uri = Earth;
				break;
			case 'Phobos':
				uri = Phobos;
				break;
			case 'The Moon':
				uri = Moon;
				break;
			case 'Mars':
				uri = Mars;
				break;
			case 'Rota':
				uri = Rota;
				break;
			default:
				uri = Earth;
		}

		return(
			<ModalTemplate absolute visible={this.props.visible} close={() => this.props.close()}>
				{/* Render image of planet on top */}
				{/* Then render list of places to go such that when you tap on one the image changes */}
				{/* Then maybe list various information about each site */}
				<Image source={uri} style={{width: width-63, height: 200, position: 'absolute', top: 0, left: 0}} resizeMode={'contain'}/>
				<View style={{marginTop: 200, flex: 1}}>
					{this.renderPlanets()}
					<Button
						title={`Travel to ${this.state.selected} for ∂${this.props.game.travelCosts[this.state.selected]}`}
						backgroundColor={'green'}
						onPress={() => this.travel()}
						loading={this.props.loading}
					/>
				</View>
			</ModalTemplate>
		);
	}
}

export default connect(state => {
	return {
		visible: state.modalReducer.travelModalVisible,
		game: state.fetchGamesReducer.game,
		loading: state.singlePlayerGameReducer.nextPeriodLoading,
		navigation: state.modalReducer.navigation
	}
}, {close: closeTravelModal, nextPeriod})(TravelModal);