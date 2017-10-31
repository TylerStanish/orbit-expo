import React from 'react';
import {connect} from 'react-redux';
import ModalTemplate from './ModalTemplate';

import {closeShipModal} from '../../actions/Modals';

class ShipModal extends React.Component{
	render(){
		return(
			<ModalTemplate visible={this.props.visible} close={() => this.props.close()}>

			</ModalTemplate>
		);
	}
}

export default connect(state => {
	return {
		visible: state.modalReducer.shipModalVisible
	}
}, {close: closeShipModal})(ShipModal);