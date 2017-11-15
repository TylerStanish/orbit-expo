import React from 'react';
import {
	Image
} from 'react-native';
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

class TravelModal extends React.Component{

	state = {selected: this.props.game.currentLocation};

	renderPlanets(){
		return gameData.places.map(place => {
			return <CheckBox
				title={place}
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
		this.props.nextPeriod(this.props.game._id, false, this.state.selected, () => {
			// this.props.navigation.navigate('SinglePlayer');
			this.props.close();
			this.props.navigation.dispatch(NavigationActions.reset({
				index: 0,
				actions: [NavigationActions.navigate({routeName: 'Choose'})]
			}));
		});
	}

	render(){
		return(
			<ModalTemplate visible={this.props.visible} close={() => this.props.close()}>
				{/* Render image of planet on top */}
				{/* Then render list of places to go such that when you tap on one the image changes */}
				{/* Then maybe list various information about each site */}
				<Image/>
				{this.renderPlanets()}
				<Button
					title={`Travel to ${this.state.selected} for ${this.props.game.travelCosts[this.state.selected]}`}
					backgroundColor={'green'}
					onPress={() => this.travel()}
					loading={this.props.loading}
				/>
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