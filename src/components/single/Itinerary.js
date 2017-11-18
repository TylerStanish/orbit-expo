import React from 'react';
import {
 	View
} from 'react-native';
import {
	Button
} from 'react-native-elements';
import {connect} from 'react-redux';
import {
	openBankModal,
	openShipModal,
	openTravelModal,
	openBaseModal
} from '../../actions/Modals';
import BankModal from '../modals/BankModal';
import ShipModal from '../modals/ShipModal';
import TravelModal from '../modals/TravelModal';
import BaseModal from '../modals/BaseModal';
import Balance from '../misc/Balance';

class Itinerary extends React.Component{

	state = {
		height: 10
	};

	handleLayout(e){
		let height = e.nativeEvent.layout.height;
		this.setState({height: height-20});
	}

	render(){
		return(
			<View onLayout={e => this.handleLayout(e)} style={{flex: 1, justifyContent: 'space-around'}}>
				<Button
					large
					raised
					title={'Bank'}
					backgroundColor={'#fcc746'}
					icon={{name: 'attach-money'}}
					buttonStyle={{height: this.state.height/4, margin: 5}}
					onPress={() => this.props.openBankModal()}
				/>
				<Button
					large
					raised
					title={'Ship'}
					icon={{name: 'flight-takeoff'}}
					backgroundColor={'#4f9deb'}
					buttonStyle={{height: this.state.height/4, margin: 5}}
					onPress={() => this.props.openShipModal()}
				/>
				<Button
					large
					raised
					title={'Travel'}
					buttonStyle={{height: this.state.height/4, margin: 5}}
					icon={{name: 'skip-next'}}
					backgroundColor={'#9D28E6'}
					onPress={() => this.props.openTravelModal()}
				/>
				<Button
					large
					raised
					title={'Base'}
					buttonStyle={{height: this.state.height/4, margin: 5}}
					icon={{name: 'weekend'}}
					backgroundColor={'#fc5830'}
					onPress={() => this.props.openBaseModal()}
				/>
				<BankModal/>
				<ShipModal/>
				<TravelModal/>
				<BaseModal/>
			</View>
		);
	}
}

export default connect(null, {
	openBankModal,
	openShipModal,
	openTravelModal,
	openBaseModal
})(Itinerary);