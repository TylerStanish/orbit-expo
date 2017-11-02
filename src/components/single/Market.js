import React from 'react';
import{
	View,
	ScrollView
} from 'react-native';
import{
	ListItem
} from 'react-native-elements';
import {connect} from 'react-redux';
import TransactionModal from '../modals/TransactionModal';
import {openTransactionModal} from '../../actions/Modals';

class Market extends React.Component{

	state = {
		selectedItem: 'Apla'
	}

	renderItems(){
		return this.props.game.repository.map(i => {
			return <Item
				key={i.name}
				item={i}
				selectedItem={this.state.selectedItem}
				setSelectedItem={i => this.setState({selectedItem: i})}
			/>
		});
	}

	render(){
		return(
			<View>
				<ScrollView style={{marginBottom: 250}}>
					{this.renderItems()}
					<TransactionModal/>
				</ScrollView>
				<Footer selectedItem={this.state.selectedItem}/>
			</View>
		);
	}
}

export default connect(state => {
	return{
		game: state.fetchGamesReducer.game
	}
}, {openTransactionModal})(Market);

const dummy = [
	{x: 0, y: 100},
	{x: 1, y: 110},
	{x: 2, y: 105},
	{x: 3, y: 140},
	{x: 4, y: 150}
];

import {Dimensions, Text} from 'react-native';
import {VictoryChart, VictoryLine, VictoryAxis} from 'victory-native';
import {ButtonGroup} from 'react-native-elements';
class Footer extends React.Component{
	render(){
		return(
			<View style={{
				width: Dimensions.get('window').width,
				height: 250,
				position: 'absolute',
				bottom: 0,
				left: 0,
				backgroundColor: '#ddd',
				alignItems: 'center'
			}}>
				<ButtonGroup
					buttons={['Buy', 'Sell']}
					containerStyle={{height: 50}}
				/>
				<VictoryChart padding={{top: 10, bottom: 50, left: 50, right: 50}} height={200}>
					<VictoryAxis label={'x-axis'}/>
					<VictoryAxis label={''} dependentAxis/>
					<VictoryLine

						data={dummy}
						animate={{duration: 500}}
					/>
				</VictoryChart>
			</View>
		);
	}
}

import{
	TouchableOpacity
} from 'react-native';
class Item extends React.Component{
	render(){
		return(
			<TouchableOpacity
				activeOpacity={0.9}
				style={{
					width: '100%',
					backgroundColor: this.props.selectedItem === this.props.item.name ? '#ccc' : 'white',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					height: 50,
				}}
				onPress={() => this.props.setSelectedItem(this.props.item.name)}
			>
				<View style={{flex: 2}}>
					<Text>{this.props.item.name}</Text>
				</View>
				<View style={{flex: 1.2}}>
					<Text>{this.props.item.price}</Text>
				</View>
				<View style={{flex: 0.5}}>
					<Text>{this.props.item.qty}</Text>
				</View>
			</TouchableOpacity>
		);
	}
}