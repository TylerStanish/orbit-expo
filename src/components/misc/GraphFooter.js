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

let keyboardHeight = 0;

class Footer extends React.Component{

	state = {
		height: new Animated.Value(250),
		opacity: new Animated.Value(0),
		transactionHeight: new Animated.Value(0),

		buying: true
	}

	keyboardHeight = new Animated.Value(0)

	handleButtonPress(index){
		// if(!index){
		// 	this.props.openTransactionModal(false, this.props.selectedItem);
		// }else{
		// 	this.props.openTransactionModal(true, this.props.selectedItem);
		// }
		// Animated.timing(this.state.height, {toValue: 300}).start(() => {
		// 	this.setState({transactionVisible: true}, () => {
		// 		Animated.timing(this.state.opacity, {toValue: 1}).start();
		// 	});
		// });

		Animated.parallel([
			Animated.timing(this.state.height, {duration: 200, toValue: 300}),
			Animated.timing(this.state.transactionHeight, {duration: 200, toValue: 50}),
		]).start(() => {
			Animated.timing(this.state.opacity, {duration: 200, toValue: 1}).start();
		});

		if(!index){
			this.setState({buying: true});
			this._ref.focus();
		}else{
			this.setState({buying: false});
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

	setMax(){

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
					backgroundColor={'green'}
					title={'Buy'}
					borderRadius={5}
					raised
					style={{flex: 1, height: 40}}
				/>
			);
		}else{
			button = (
				<Button
					backgroundColor={'red'}
					title={'Sell'}
					containerStyle={{flex: 1, height: 40}}
					raised
					borderRadius={5}
				/>
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
						containerStyle={{flex: 2}}
						keyboardType={'numeric'}
						ref={ref => this._ref = ref}
					/>
					<Button
						title={'Set max'}
						borderRadius={5}
						raised
						containerStyle={{flex: 1, height: 40}}
						onPress={() => this.setMax()}
					/>
					{button}
					<Icon onPress={() => this.closeTransaction()} iconStyle={{flex: 1}} name={'close'} color={'red'}/>
				</Animated.View>
				<ButtonGroup
					buttons={['Buy', 'Sell']}
					containerStyle={{height: 50}}
					onPress={index => this.handleButtonPress(index)}
				/>
				<VictoryChart padding={{top: 10, bottom: 50, left: 50, right: 50}} height={200}>
					<VictoryAxis label={''}/>
					<VictoryAxis label={''} dependentAxis/>
					<VictoryLine

						data={this.props.game.repository[this.props.selectedItem].prices}
						animate={{duration: 500}}
					/>
				</VictoryChart>
			</Animated.View>
		);
	}
}

export default connect(state => {
	return{
		game: state.fetchGamesReducer.game
	}
}, {openTransactionModal})(Footer);