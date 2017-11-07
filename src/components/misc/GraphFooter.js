const dummy = [
	{x: 0, y: 100},
	{x: 1, y: 110},
	{x: 2, y: 105},
	{x: 3, y: 140},
	{x: 4, y: 150}
];
import React from 'react';
import {
	Dimensions,
	View,
	Animated,
	Text,
	Keyboard
} from 'react-native';
import {VictoryChart, VictoryLine, VictoryAxis} from 'victory-native';
import {
	ButtonGroup,
	Button,
	FormInput,
	Icon
} from 'react-native-elements';
import {connect} from 'react-redux';

const {width} = Dimensions.get('window');

import {openTransactionModal} from '../../actions/Modals';
import {buyContraband, sellContraband} from '../../actions/single/SinglePlayerGameActions';

let keyboardHeight = 0;

class Footer extends React.Component{

	state = {
		height: new Animated.Value(250),
		opacity: new Animated.Value(0),
		transactionHeight: new Animated.Value(0),

		buying: true,

		amount: '0',
		disabled: true
	}

	keyboardHeight = new Animated.Value(0)

	handleButtonPress(index){
		Animated.parallel([
			Animated.timing(this.state.height, {duration: 200, toValue: 300}),
			Animated.timing(this.state.transactionHeight, {duration: 200, toValue: 50}),
		]).start(() => {
			Animated.timing(this.state.opacity, {duration: 200, toValue: 1}).start();
		});

		if(!index){
			this.setState({buying: true, amount: '0'});
			// this._ref.focus();
		}else{
			this.setState({buying: false, amount: '0'});
		}
	}

	componentDidMount(){
		let bla = Keyboard.addListener('keyboardDidShow', e => {
			// this.state.height.setValue(this.state.height._value + e.endCoordinates.height);
			keyboardHeight = e.endCoordinates.height;
			console.log('set height ti', keyboardHeight);
			Animated.timing(this.state.height, {toValue: this.state.height._value + e.endCoordinates.height}).start(() => {
				// this._ref.focus();
			});
		});
		let bla1 = Keyboard.addListener('keyboardDidHide', e => {
			// this.state.height.setValue(this.state.height._value + e.endCoordinates.height);

			Animated.timing(this.state.height, {toValue: this.state.height._value - keyboardHeight}).start();
		});
	}

	getMaxBuy(){
		let bal = this.props.game.chips;
		let price = this.props.game.repository[this.props.selectedItem].prices.slice(-1).pop();
		return Math.min(Math.floor(bal/price), this.props.game.ship.space);
	}

	getMaxSell(){
		return this.props.game.repository[this.props.selectedItem].qty;
	}

	setMaxBuy(){
		this.handleInput(this.getMaxBuy().toString());
	}

	setMaxSell(){
		this.handleInput(this.getMaxSell().toString());
	}

	handleInput(value){
		this.setState({amount: value});
		let newValue = Number(value);
		if(isNaN(newValue) || newValue === 0){
			this.setState({disabled: true});
			return;
		}
		if(this.state.buying){
			if(newValue > this.getMaxBuy()){
				this.setState({disabled: true});
			}else{
				this.setState({disabled: false});
			}
		}else{
			if(newValue > this.getMaxSell()){
				this.setState({disabled: true});
			}else{
				this.setState({disabled: false});
			}
		}
	}

	closeTransaction(){
		this.state.opacity.setValue(0);
		Animated.parallel([
			Animated.timing(this.state.transactionHeight, {duration: 200, toValue: 0}),
			Animated.timing(this.state.height, {duration: 200, toValue: 250})
		]).start();
	}

	render(){

		let button;
		if(this.state.buying){
			button = (
				<Button
					backgroundColor={'#8cc153'}
					title={this.props.buyContrabandLoading ? '' : 'Buy'}
					loading={this.props.buyContrabandLoading}
					borderRadius={5}
					raised
					containerViewStyle={{flex: 1, marginLeft: 0, marginRight: 5}}
					disabled={this.state.disabled}
					onPress={() => {
						this.props.buyContraband(this.props.game._id, Number(this.state.amount), this.props.selectedItem, () => {
							this.closeTransaction();
						});
					}}
				/>
			);
		}else{
			button = (
				<Button
					backgroundColor={'#ff4b30'}
					title={this.props.sellContrabandLoading ? '' : 'Sell'}
					loading={this.props.sellContrabandLoading}
					containerViewStyle={{flex: 1, marginLeft: 0, marginRight: 5}}
					disabled={this.state.disabled}
					raised
					borderRadius={5}
					onPress={() => {
						this.props.sellContraband(this.props.game._id, Number(this.state.amount), this.props.selectedItem, () => {
							this.closeTransaction();
						});
					}}
				/>
			);
		}

		let chart = (
			<View style={{height: 200, flex: 1, justifyContent: 'center'}}>
				<Text style={{textAlign: 'center'}}>No data to display</Text>
			</View>
		);
		if(this.props.game.repository[this.props.selectedItem].prices.length > 1){
			chart = (
				<VictoryChart padding={{top: 10, bottom: 25, left: 50, right: 50}} height={200}>
					<VictoryAxis label={''}/>
					<VictoryAxis label={''} dependentAxis/>
					<VictoryLine

						data={this.props.game.repository[this.props.selectedItem].prices}
						animate={{duration: 500}}
					/>
				</VictoryChart>
			);
		}

		return(
			<Animated.View style={{
				width: Dimensions.get('window').width,
				height: this.state.height,
				position: 'absolute',
				bottom: 0,
				left: 0,
				backgroundColor: '#ddd',
				alignItems: 'center',
			}}>
				<Animated.View style={{alignItems: 'center', flexDirection: 'row', height: this.state.transactionHeight, opacity: this.state.opacity}}>
					<FormInput
						placeholder={'Number'}
						containerStyle={{flex: 1.5}}
						keyboardType={'numeric'}
						ref={ref => this._ref = ref}
						value={this.state.amount}
						onChangeText={v => this.handleInput(v)}
					/>
					<Button
						title={'Max'}
						borderRadius={5}
						raised
						containerViewStyle={{flex: 1, marginLeft: 0, marginRight: 5}}
						onPress={() => this.state.buying ? this.setMaxBuy() : this.setMaxSell()}
					/>
					{button}
					<Icon
						onPress={() => this.closeTransaction()}
						containerStyle={{flex: 0.5}}
						name={'close'}
						color={'#ff4b30'}
						size={30}
					/>
				</Animated.View>
				<View style={{flexDirection: 'row'}}>
					<Button
						title={'Buy'}
						backgroundColor={'#8cc153'}
						containerViewStyle={{width: '50%', marginLeft: 0, marginRight: 0}}
						onPress={() => this.handleButtonPress(0)}
					/>
					<Button
						title={'Sell'}
						backgroundColor={'#ff4b30'}
						containerViewStyle={{width: '50%', marginLeft: 0, marginRight: 0}}
						onPress={() => this.handleButtonPress(1)}
					/>
				</View>
				{chart}
			</Animated.View>
		);
	}
}

export default connect(state => {
	return{
		game: state.fetchGamesReducer.game,
		buyContrabandLoading: state.singlePlayerGameReducer.buyContrabandLoading,
		sellContrabandLoading: state.singlePlayerGameReducer.sellContrabandLoading
	}
}, {openTransactionModal, buyContraband, sellContraband})(Footer);