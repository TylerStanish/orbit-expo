import React from 'react';
import{ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import ModalTemplate from './ModalTemplate';
import {
	FormInput,
	Button
} from 'react-native-elements';
import{Content} from 'native-base';

import {closeBankModal} from '../../actions';
import {borrow, payBack} from '../../actions/single/SinglePlayerGameActions';
import {setBankModalAmount} from '../../actions/Modals';
import Balance from '../misc/Balance';

class BankModal extends React.Component{

	constructor(p){
		super(p);
		this.state = {
			disabled: true,
			disabled1: true,
			// get chips and debt from mapStateToProps
		}
	}

	handleInput(amount){
		// if(amount.includes('.')){
		// 	this.setState({disabled: true, disabled1: true});
		// 	return;
		// }
		// amount = parseInt(amount);
		// let {chips, debt, currentPeriod} = this.props.game;
		// let disabled;
		// let disabled1;
		// if(amount > chips){
		// 	disabled1 = true;
		// }
		// if(amount > debt){
		// 	disabled1 = true;
		// }
		// if(amount > currentPeriod*5000 - debt){
		// 	disabled = true;
		// }
		// if(isNaN(amount) || amount === 0){
		// 	disabled = true;
		// 	disabled1 = true;
		// }
		// this.setState({disabled, disabled1});
		this.props.setBankModalAmount(amount);
	}

	setBorrowMax(){
		let {chips, debt, currentPeriod, _id} = this.props.game;
		let max = currentPeriod*5000 - debt;
		max = Math.max(0, max);
		this.handleInput(max.toString());
		this.props.setBankModalAmount(max);
		// this.props.borrow(_id, max);
	}

	setPayBackMax(){
		let {chips, debt, currentPeriod, _id} = this.props.game;
		let max = Math.min(chips, debt);
		max = Math.max(0, max);
		this.handleInput(max.toString());
		this.props.setBankModalAmount(max);
		// this.props.payBack(_id, max);
	}

	componentWillReceiveProps(nextProps){
		let {amount} = nextProps;
		amount = amount.toString();
		if(amount !== this.props.amount){
			if(amount.includes('.')){
				this.setState({disabled: true, disabled1: true});
				return;
			}
			amount = parseInt(amount);
			let {chips, debt, currentPeriod} = this.props.game;
			let disabled;
			let disabled1;
			if(amount > chips){
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
			this.setState({disabled, disabled1});
		}
	}

	render(){
		return(
			<ModalTemplate visible={this.props.visible} close={() => this.props.close()}>
				<Content keyboardShouldPersistTaps={'always'}>
					<Balance chips={this.props.game.chips} debt={this.props.game.debt} netWorth={this.props.game.netWorth}/>
					<FormInput
						keyboardType={'numeric'}
						onChangeText={t => this.handleInput(t)}
						placeholder={'Amount'}
						value={this.props.amount.toString()}
						autoFocus
						selectTextOnFocus
					/>
					<View style={{flexDirection: 'row', margin: 10}}>
						<Button
							title={'Set max'}
							onPress={() => this.setBorrowMax()}
							containerViewStyle={{flex: 1}}
						/>
						<Button
							backgroundColor={'green'}
							title={'Borrow'}
							large
							disabled={this.state.disabled}
							onPress={() => this.props.borrow(this.props.game._id, parseInt(this.props.amount))}
							containerViewStyle={{flex: 3}}
						/>
					</View>
					<View style={{flexDirection: 'row', margin: 10}}>
						<Button
							title={'Set max'}
							onPress={() => this.setPayBackMax()}
							containerViewStyle={{flex: 1}}
						/>
						<Button
							backgroundColor={'red'}
							title={'Pay back'}
							large
							disabled={this.state.disabled1}
							onPress={() => this.props.payBack(this.props.game._id, parseInt(this.props.amount))}
							containerViewStyle={{flex: 3}}
						/>
					</View>
				</Content>
			</ModalTemplate>
		);
	}
}

export default connect(state => {
	return {
		visible: state.modalReducer.bankModalVisible,
		game: state.fetchGamesReducer.game,

		amount: state.modalReducer.bankModalAmount
	}
}, {close: closeBankModal, borrow, payBack, setBankModalAmount})(BankModal);