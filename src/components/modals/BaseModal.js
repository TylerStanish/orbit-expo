import React from 'react';
import {
	Button,
	CheckBox
} from 'react-native-elements';
import {connect} from 'react-redux';
import ModalTemplate from './ModalTemplate';
import {closeBaseModal} from '../../actions/Modals';
import {purchaseBase} from '../../actions/single/SinglePlayerGameActions';
import gameData from '../../gameData.json';

class BaseModal extends React.Component{

	state = {
		selected: gameData.bases[0]
	};

	renderBases(){
		let arr = [];
		for(let base in gameData.bases){
			let purchased = this.props.game.purchasedBases.indexOf(base) >= 0;
			let checkbox = (
				<CheckBox
					title={base + ' - ' + (purchased ? 'Purchased' : gameData.bases[base])}
					disabled={purchased}
					checkedIcon={'dot-circle-o'}
					uncheckedIcon={'circle-o'}
					onPress={() => this.setState({selected: base})}
					checked={this.state.selected === base || purchased}
					key={base}
				/>
			);
			arr.push(checkbox);
		}
		return arr;
	}

	render(){
		return(
			<ModalTemplate visible={this.props.visible} close={() => this.props.closeBaseModal()}>
				{this.renderBases()}
				<Button
					loading={this.props.loading}
					title={'Purchase'}
					disabled={!this.state.selected}
					onPress={() => this.props.purchaseBase(this.props.game._id, this.state.selected)}
				/>
			</ModalTemplate>
		);
	}
}

export default connect(state => {
	return{
		visible: state.modalReducer.baseModalVisible,
		game: state.fetchGamesReducer.game,
		loading: state.modalReducer.baseModalLoading
	}
}, {closeBaseModal, purchaseBase})(BaseModal);
