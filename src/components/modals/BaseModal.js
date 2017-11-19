import React from 'react';
import{
	Dimensions,
	Image,
	View
} from 'react-native';
const {height, width} = Dimensions.get('window');
import {
	Button,
	CheckBox,
	Text
} from 'react-native-elements';
import {connect} from 'react-redux';
import ModalTemplate from './ModalTemplate';
import {closeBaseModal} from '../../actions/Modals';
import {purchaseBase} from '../../actions/single/SinglePlayerGameActions';
import gameData from '../../gameData.json';

const CuratorStarfighter = require('../../../assets/icons/CuratorStarfighter.png');
const TradeVessel = require('../../../assets/icons/TradeVessel.png');
const AsteroidClunker = require('../../../assets/icons/AsteroidClunker.png');
const ImperialYacht = require('../../../assets/icons/ImperialYacht.png');

class BaseModal extends React.Component{

	state = {
		selected: gameData.bases[0]
	};

	renderBases(){
		let arr = [];
		for(let base in gameData.bases){
			let purchased = this.props.game.purchasedBases.indexOf(base) >= 0;
			let checkbox = (
				<CheckBox
					title={base + ' - ' + (purchased ? 'Purchased' : '∂' + gameData.bases[base].toLocaleString())}
					checkedIcon={'dot-circle-o'}
					uncheckedIcon={'circle-o'}
					onPress={() => this.setState({selected: base})}
					checked={this.state.selected === base}
					key={base}
				/>
			);
			arr.push(checkbox);
		}
		return arr;
	}

	render(){

		let uri;
		switch(this.state.selected){
			case 'Urban Hut':
				uri = AsteroidClunker;
				break;
			case 'Rotan Flat':
				uri = TradeVessel;
				break;
			case 'Phobos High Rise':
				uri = CuratorStarfighter;
				break;
			case 'Trafficker\s Mansion':
				uri = ImperialYacht;
				break;
			default:
				uri = AsteroidClunker;
		}

		return(
			<ModalTemplate absolute visible={this.props.visible} close={() => this.props.closeBaseModal()}>
				<Image source={uri} style={{width: width-63, height: 200, position: 'absolute', top: 0, left: 0}} resizeMode={'contain'}/>
				<View style={{flex: 1, marginTop: 200}}>
					{this.renderBases()}
					<Text style={{color: '#aaa', marginHorizontal: 10, marginVertical: 5, textAlign: 'justify'}}>Purchasing a base is intended to de-liquefy your chips to secure at least the total value of the bases you have purchased</Text>
					<Button
						style={{marginBottom: 10}}
						loading={this.props.loading}
						title={'Purchase'}
						disabled={!this.state.selected || this.props.game.purchasedBases.indexOf(this.state.selected) >= 0}
						onPress={() => this.props.purchaseBase(this.props.game._id, this.state.selected)}
						backgroundColor={'green'}
					/>
				</View>
			</ModalTemplate>
		);
	}
}

export default connect(state => {
	return{
		visible: state.modalReducer.baseModalVisible,
		game: state.fetchGamesReducer.game,
		loading: state.modalReducer.baseModalLoading
	}
}, {closeBaseModal, purchaseBase})(BaseModal);
