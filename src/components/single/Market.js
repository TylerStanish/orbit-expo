import React from 'react';
import{
	View,
	ScrollView,
	Text,
	Animated
} from 'react-native';
import {connect} from 'react-redux';
import TransactionModal from '../modals/TransactionModal';
import {openTransactionModal} from '../../actions/Modals';
// import AbsoluteLoading from '../misc/AbsoluteLoading'

import Footer from '../misc/GraphFooter';
import Balance from '../misc/Balance';

class Market extends React.Component{

	state = {
		selectedItem: 'Apla',

		opacity: new Animated.Value(0)
	};

	componentDidMount(){
		Animated.timing(this.state.opacity, {toValue: 1}).start();
	}

	renderItems(){
		let arr = [];
		for(let i in this.props.game.repository){
			arr.push(<Item
				key={i}
				item={this.props.game.repository[i]}
				name={i}
				selectedItem={this.state.selectedItem}
				setSelectedItem={i => this.setState({selectedItem: i})}
			/>);
		}
		return arr;
	}

	render(){
		return(
			<Animated.View style={{opacity: this.state.opacity}}>
				<ScrollView bounces={false} style={{marginBottom: 250}}>
					{this.renderItems()}
					<TransactionModal/>
				</ScrollView>
				<Footer selectedItem={this.state.selectedItem}/>
				{/*<AbsoluteLoading/>*/}
			</Animated.View>
		);
	}
}

export default connect(state => {
	return{
		game: state.fetchGamesReducer.game
	}
}, {openTransactionModal})(Market);

import{
	TouchableOpacity
} from 'react-native';
import gameData from '../../gameData.json';
class Item extends React.Component{

	getPriceWithColor(price){
		let min = gameData.contrabandInfo[this.props.name][0];
		let max = gameData.contrabandInfo[this.props.name][1];
		let range = max-min;
		let r = (price - min) * 255/range;
		let g = (max - price) * 255/range;
		let b = 0;
		return <Text style={{color: `rgb(${r},${g},${b})`}}>∂ {price}</Text>
	}

	render(){
		return(
			<TouchableOpacity
				activeOpacity={0.9}
				style={{
					width: '100%',
					backgroundColor: this.props.selectedItem === this.props.name ? '#ccc' : 'white',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					height: 50,
				}}
				onPress={() => this.props.setSelectedItem(this.props.name)}
			>
				<View style={{flex: 2}}>
					<Text>{this.props.name}</Text>
				</View>
				<View style={{flex: 1.2}}>
					{this.getPriceWithColor(this.props.item.prices[this.props.item.prices.length-1])}
				</View>
				<View style={{flex: 0.5}}>
					<Text>{this.props.item.qty}</Text>
				</View>
			</TouchableOpacity>
		);
	}
}