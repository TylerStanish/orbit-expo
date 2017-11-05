import React from 'react';
import{
	Text
} from 'react-native';
import {connect} from 'react-redux';
import ModalTemplate from './ModalTemplate';
import{
	Checkbox,
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
		console.log(p);
		console.log('nothing to see here');
		if(!this.ships){
			let shipArray;
			if(p.game.ship.name === 'Asteroid Clunker'){
				shipArray = ['Trade Vessel', 'Curator Starfighter', 'Imperial Yacht'];
			}
			// if the user has an augmented ship, display that ship via if statements, e.g.
			if(p.game.ship.name === 'Trade Vessel'){
				shipArray = ['Curator Starfighter', 'Imperial Yacht'];
			}
			if(p.game.ship.name === 'Curator Starfighter'){
				shipArray = ['Imperial Yacht'];
			}
			if(p.game.ship.name === 'Imperial Yacht'){
				shipArray = [];
			}
			console.log('LEGALLY updating state');
			this.ships = shipArray;
		}
		this.state = {};
	}

	renderShips(){
		return this.ships.map(ship => {
			return(
				// we could do a checkbox list
				<Text>{ship}</Text>
			);
		});
	}

	render(){

		if(!this.props.game){
			return <ModalTemplate visible={this.props.visible} close={() => this.props.close()}><Loading/></ModalTemplate>
		}

		return(
			<ModalTemplate visible={this.props.visible} close={() => this.props.close()}>
				{/*  */}
				{this.renderShips()}
				<Button
					raised
					onPress={() => this.props.buyShip(this.state.selected)}
					title={`Buy ${this.state.selected} for ${costObj[this.state.selected]}`}
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