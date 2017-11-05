import React from 'react';
import{
	Text
} from 'react-native';
import {connect} from 'react-redux';
import ModalTemplate from './ModalTemplate';
import{
	CheckBox,
	Button
} from 'react-native-elements';

import {closeShipModal} from '../../actions/Modals';
import {buyShip} from '../../actions/single/SinglePlayerGameActions';
import Loading from '../misc/Loading';

const costObj = {
	'Asteroid Clunker': '0',
	'Trade Vessel': '200,000',
	'Curator Starfighter': '1,000,000',
	'Imperial Yacht': '10,000,000'
};
const rawCost = {
	'Asteroid Clunker': 0,
	'Trade Vessel': 200000,
	'Curator Starfighter': 1000000,
	'Imperial Yacht': 10000000
};

class ShipModal extends React.Component{

	constructor(p){
		super(p);
		this.updateShips(p);
		this.state = {
			selected: ''
		}
	}

	componentWillReceiveProps(nextProps){
		this.updateShips(nextProps);
	}

	updateShips(nextProps){
		if(!this.ships || this.props.game.ship.name !== nextProps.game.ship.name){
			let shipArray;
			if(nextProps.game.ship.name === 'Asteroid Clunker'){
				shipArray = ['Trade Vessel', 'Curator Starfighter', 'Imperial Yacht'];
			}
			// if the user has an augmented ship, display that ship via if statements, e.g.
			if(nextProps.game.ship.name === 'Trade Vessel'){
				shipArray = ['Curator Starfighter', 'Imperial Yacht'];
			}
			if(nextProps.game.ship.name === 'Curator Starfighter'){
				shipArray = ['Imperial Yacht'];
			}
			if(nextProps.game.ship.name === 'Imperial Yacht'){
				shipArray = [];
			}
			console.log('LEGALLY updating state');
			this.ships = shipArray;
			this.setState({selected: shipArray[0]});
		}
	}

	renderShips(){
		return this.ships.map(ship => {
			return(
				// we could do a checkbox list
				<CheckBox
					title={ship}
					checkedIcon={'dot-circle-o'}
					uncheckedIcon={'circle-o'}
					onPress={() => this.setState({selected: ship})}
					checked={this.state.selected === ship}
				/>
			);
		});
	}

	render(){

		if(!this.props.game){
			return <ModalTemplate visible={this.props.visible} close={() => this.props.close()}><Loading/></ModalTemplate>
		}

		return(
			<ModalTemplate visible={this.props.visible} close={() => this.props.close()}>
				{/* Put image of selected ship and add default image and selected */}
				{this.renderShips()}
				<Button
					raised
					onPress={() => this.props.buyShip(this.props.game._id, this.state.selected)}
					title={this.state.selected ? `Buy ${this.state.selected} for ${costObj[this.state.selected]}` : ''}
					disabled={!this.state.selected}

				/>
			</ModalTemplate>
		);
	}
}

export default connect(state => {
	return {
		visible: state.modalReducer.shipModalVisible,
		game: state.fetchGamesReducer.game,
		loading: state.singlePlayerGameReducer.shipLoading
	}
}, {close: closeShipModal, buyShip})(ShipModal);