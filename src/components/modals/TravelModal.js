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

class TravelModal extends React.Component{

	state = {selected: ''};

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

	render(){
		return(
			<ModalTemplate visible={this.props.visible} close={() => this.props.close()}>
				{/* Render image of planet on top */}
				{/* Then render list of places to go such that when you tap on one the image changes */}
				{/* Then maybe list various information about each site */}
				<Image/>
				{this.renderPlanets()}
				<Button
					title={'Travel'}
					backgroundColor={'green'}
					onPress={() => this.props.nextPeriod(this.props.game._id, false, this.state.selected)}
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
		loading: state.singlePlayerGameReducer.nextPeriodLoading
	}
}, {close: closeTravelModal, nextPeriod})(TravelModal);