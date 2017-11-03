import React from 'react';
import{
	View,
	ScrollView,
	Text
} from 'react-native';
import {connect} from 'react-redux';
import TransactionModal from '../modals/TransactionModal';
import {openTransactionModal} from '../../actions/Modals';

import Footer from '../misc/GraphFooter';

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
				<ScrollView bounces={false} style={{marginBottom: 250}}>
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