import React from 'react';
import {connect} from 'react-redux';
import ModalTemplate from './ModalTemplate';
import {
	Button
} from 'react-native-elements';
import {closeTravelModal} from '../../actions/Modals';
import {nextPeriod} from '../../actions/single/SinglePlayerGameActions';

class TravelModal extends React.Component{
	render(){
		return(
			<ModalTemplate visible={this.props.visible} close={() => this.props.close()}>
				{/* Render image of planet on top */}
				{/* Then render list of places to go such that when you tap on one the image changes */}
				{/* Then maybe list various information about each site */}
				<Button
					title={'Travel'}
					backgroundColor={'green'}
					onPress={() => this.props.nextPeriod(this.props.game._id)}
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