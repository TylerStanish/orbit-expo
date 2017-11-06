import React from 'react';
import {connect} from 'react-redux';
import ModalTemplate from './ModalTemplate';
import {
	FormInput,
	Button
} from 'react-native-elements';

import {closeBankModal} from '../../actions';
import {borrow, payBack} from '../../actions/single/SinglePlayerGameActions';

class BankModal extends React.Component{

	constructor(p){
		super(p);
		this.state = {
			amount: 0,
			disabled: true,
			disabled1: true,
			// get chips and debt from mapStateToProps
		}
	}

	handleInput(amount){
		if(amount.includes('.')){
			this.setState({disabled: true, disabled1: true});
			return;
		}
		amount = parseInt(amount);
		let {chips, debt, currentPeriod} = this.props.game;
		let disabled;
		let disabled1;
		if(amount > chips){
			disabled = true;
			disabled1 = true;
		}
		if(amount > debt){
			disabled1 = true;
		}
		if(amount > currentPeriod*5000 - debt){
			disabled = true;
		}
		if(isNaN(amount) || amount === 0){
			disabled = true;
			disabled1 = true;
		}
		this.setState({amount, disabled, disabled1});
	}

	render(){
		return(
			<ModalTemplate visible={this.props.visible} close={() => this.props.close()}>
				<FormInput
					keyboardType={'numeric'}
					onChangeText={t => this.handleInput(t)}
					autoFocus
					placeholder={'Amount'}
				/>
				<Button
					backgroundColor={'green'}
					title={'Borrow'}
					large
					disabled={this.state.disabled}
					onPress={() => this.props.borrow(this.props.game._id, parseInt(this.state.amount))}
				/>
				<Button
					backgroundColor={'red'}
					title={'Pay back'}
					large
					disabled={this.state.disabled1}
					onPress={() => this.props.payBack(this.props.game._id, parseInt(this.state.amount))}
				/>
			</ModalTemplate>
		);
	}
}

export default connect(state => {
	return {
		visible: state.modalReducer.bankModalVisible,
		game: state.fetchGamesReducer.game,
	}
}, {close: closeBankModal, borrow, payBack})(BankModal);