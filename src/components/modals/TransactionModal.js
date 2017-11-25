import React from 'react';
import {connect} from 'react-redux';
import ModalTemplate from './ModalTemplate';
import {closeTransactionModal} from '../../actions/Modals';

class TransactionModal extends React.Component{
  render(){
    return(
      <ModalTemplate visible={this.props.visible} close={() => this.props.close()}>

      </ModalTemplate>
    );
  }
}

export default connect(state => {
  return {
    visible: state.modalReducer.transactionModalVisible
  }
}, {close: closeTransactionModal})(TransactionModal);