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
	FormInput
} from 'react-native-elements';
import {connect} from 'react-redux';

import {openTransactionModal} from '../../actions/Modals';

class Footer extends React.Component{

	state = {
		height: new Animated.Value(250),
		opacity: new Animated.Value(0),
		transactionHeight: new Animated.Value(0)
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
			Animated.timing(this.state.height, {toValue: 300}),
			Animated.timing(this.state.transactionHeight, {toValue: 50}),
		]).start(() => {
			Animated.timing(this.state.opacity, {toValue: 1}).start();
		});
	}

	componentDidMount(){
		let bla = Keyboard.addListener('keyboardDidChangeFrame', e => {
			// this.state.height.setValue(this.state.height._value + e.endCoordinates.height);
			Animated.timing(this.state.height, {toValue: this.state.height._value + e.endCoordinates.height}).start();
		});
	}

	render(){
		console.log(this.keyboardHeight);
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
				<Animated.View style={{flexDirection: 'row', height: this.state.transactionHeight, opacity: this.state.opacity}}>
					<FormInput
						placeholder={'Number'}
						containerStyle={{flex: 1}}
						keyboardType={'numeric'}
					/>
					<Button
						backgroundColor={'red'}
						title={'Sell'}
						containerStyle={{flex: 1}}
					/>
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

						data={dummy}
						animate={{duration: 500}}
					/>
				</VictoryChart>
			</Animated.View>
		);
	}
}

export default connect(null, {openTransactionModal})(Footer);