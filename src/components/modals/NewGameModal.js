import React from 'react';
import {
	FormLabel,
	FormInput,
	ButtonGroup,
	Button,
	FormValidationMessage
} from 'react-native-elements';
import {connect} from 'react-redux';
import {createGame, closeNewGameModal} from '../../actions/index';
import ModalTemplate from './ModalTemplate';

class NewGameModal extends React.Component{

	state = {
		name: '',
		selected: 0
	}

	createGame(){
		let {name, selected} = this.state;
		let numWeeks;
		if(selected === 0){
			numWeeks = 30;
		}
		if(selected === 1){
			numWeeks = 60;
		}
		if(selected === 2){
			numWeeks = 90;
		}
		this.props.createGame(name, numWeeks);
	}

	render(){
		return(
			<ModalTemplate visible={this.props.visible} close={() => this.props.close()}>
				<FormLabel>Game name</FormLabel>
				<FormInput
					onChangeText={name => this.setState({name})}
					placeholder={'Captain'}
				/>
				<ButtonGroup
					buttons={['30 weeks', '60 weeks', '90 weeks']}
					selectedIndex={this.state.selected}
					onPress={(i) => this.setState({selected: i}, () => console.log(typeof i))}
					selectedBackgroundColor={'#97c662'}
				/>
				<Button
					title={'Begin Game'}
					backgroundColor={'#97c662'}
					color={'#4a4a4a'}
					style={{marginTop: 10}}
					onPress={() => this.createGame()}
					loading={this.props.loading}
				/>
				<FormValidationMessage>{this.props.error}</FormValidationMessage>
			</ModalTemplate>
		);
	}
}

export default connect(state => {
	return{
		loading: state.newGameReducer.loading,
		error: state.newGameReducer.error,
		visible: state.modalReducer.newGameModalVisible
	}
}, {createGame, close: closeNewGameModal})(NewGameModal);