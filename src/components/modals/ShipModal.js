import React from 'react';
import{
  View,
  Image,
  Dimensions
} from 'react-native';
const {height, width} = Dimensions.get('window');
import {connect} from 'react-redux';
import ModalTemplate from './ModalTemplate';
import{
  CheckBox,
  Button,
  Text
} from 'react-native-elements';

import {closeShipModal} from '../../actions/Modals';
import {buyShip, repairShip} from '../../actions/single/SinglePlayerGameActions';
import Loading from '../misc/Loading';
import gameData from '../../gameData.json';

const CuratorStarfighter = require('../../../assets/icons/CuratorStarfighter.png');
const TradeVessel = require('../../../assets/icons/TradeVessel.png');
const AsteroidClunker = require('../../../assets/icons/AsteroidClunker.png');
const ImperialYacht = require('../../../assets/icons/ImperialYacht.png');

const costObj = {
  'Asteroid Clunker': '∂0',
  'Trade Vessel': '∂200,000',
  'Curator Starfighter': '∂1,000,000',
  'Imperial Yacht': '∂10,000,000'
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
    this.state = {
      selected: 'Asteroid Clunker'
    }
  }

  renderShips(){
    return gameData.ships.map(ship => {
      let purchased = this.props.game.purchasedShips.indexOf(ship.name) >= 0;
      return(
        // we could do a checkbox list
        <CheckBox
          title={ship.name + ' - ' + (purchased ? 'Purchased' : costObj[ship.name])}
          checkedIcon={'dot-circle-o'}
          uncheckedIcon={'circle-o'}
          onPress={() => this.setState({selected: ship.name})}
          checked={this.state.selected === ship.name}
          key={ship.name}
        />
      );
    });
  }

  render(){

    if(!this.props.game){
      return <ModalTemplate visible={this.props.visible} close={() => this.props.close()}><Loading/></ModalTemplate>
    }
    let uri;
    switch(this.state.selected){
      case 'Asteroid Clunker':
        uri = AsteroidClunker;
        break;
      case 'Trade Vessel':
        uri = TradeVessel;
        break;
      case 'Curator Starfighter':
        uri = CuratorStarfighter;
        break;
      case 'Imperial Yacht':
        uri = ImperialYacht;
        break;
      default:
        uri = AsteroidClunker;
    }

    let ship = {};
    gameData.ships.map(s => {
      if(s.name === this.state.selected) ship = s;
    });

    console.log(uri);

    return(
      <ModalTemplate absolute visible={this.props.visible} close={() => this.props.close()}>
        {/* Put image of selected ship and add default image and selected */}
        <Image source={uri} style={{width: width-63, height: 200, position: 'absolute', top: 0, left: 0}} resizeMode={'contain'}/>
        <View style={{marginTop: 200}}>
          <View style={{marginHorizontal: 10, backgroundColor: 'transparent'}}>
            {/*<Text style={{marginHorizontal: 10, textAlign: 'center'}} h4>{this.state.selected}</Text>*/}
            {/* This gets cut off... */}
            <Text>Defense:  {Math.floor(1/ship.defense)}</Text>
            <Text>Storage Capacity:  {ship.maxSpace}</Text>
            <Text>Health:   {ship.health}</Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          {this.renderShips()}
        </View>
        <View style={{flex: 1}}>
          <Button
            raised
            onPress={() => this.props.buyShip(this.props.game._id, this.state.selected)}
            title={this.state.selected ? `Buy the ${this.state.selected}` : 'Select a ship'}
            disabled={!this.state.selected || this.props.game.purchasedShips.indexOf(this.state.selected) >= 0}
          />
          <View style={{alignItems: 'center', padding: 10}}>
            <Text style={{margin: 10}} h4>Ship damage: {this.props.game.ship.damage}/{this.props.game.ship.health}</Text>
            <Button
              raised
              onPress={() => this.props.repairShip(this.props.game._id)}
              title={'Repair 15 points for ∂15000'}
            />
          </View>
        </View>
      </ModalTemplate>
    );
  }

  handleLayout(e){
    if(e.nativeEvent.layout.width !== this.state.width){
      this.setState({info: e.nativeEvent.layout.width});
      this.setState({width: e.nativeEvent.layout.width});
    }
  }
}

export default connect(state => {
  return {
    visible: state.modalReducer.shipModalVisible,
    game: state.fetchGamesReducer.game,
    loading: state.singlePlayerGameReducer.shipLoading
  }
}, {close: closeShipModal, buyShip, repairShip})(ShipModal);