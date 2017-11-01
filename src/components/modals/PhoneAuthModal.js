import React from 'react';
import {
	View,
	TextInput
} from 'react-native';
import {connect} from 'react-redux';
import {
	Input,
	Item
} from 'native-base';
import {
	FormInput
} from 'react-native-elements';

import ModalTemplate from './ModalTemplate';

import {closePhoneAuthModal} from '../../actions/Modals';

class PhoneAuthModal extends React.Component{

	getLayout(e){
		this.setState({width: e.nativeEvent.layout.width});
	}

	componentDidMount(){
		console.log(this._ref);
		console.log('mounted')
		// this._ref._root.focus();
	}

	renderInputs(){
		const brandColor = 'purple';
		let arr = [];
		for(let i = 0; i < 10; i++){
			arr.push(
				<TextInput
					key={i}
					autoFocus
					maxLength={1}
					ref={ref => this._refs.push(ref)}
					placeholderTextColor={brandColor}
					selectionColor={brandColor}
					style={{
						width: this.state.width/15,
						margin: 5,
						height: 30,
						borderBottomColor: 'purple',
						borderBottomWidth: 1
					}}
					onChangeText={t => {
						let array = this.state.inputs;
						if(array[i].length === 0 && t.length === 1){
							this._refs[i+1].focus();
						}
						array[i] = t;
						this.setState({inputs: array});
					}}
				/>
			);
		}
		console.log(this._refs);
		return arr;
	}

	render(){
		console.log(this._ref);
		console.log('from render');
		return(
			<ModalTemplate visible={this.props.visible} close={this.props.closePhoneAuthModal}>
				<View onLayout={e => this.getLayout(e)} style={{flex: 1, flexDirection: 'row'}}>
					<FormInput
						style={{height: 50, width: 50, borderBottomWidth: 1, borderBottomColor: 'purple'}}
						maxLength={1}
						ref={ref => this._ref = ref}
					/>
				</View>
			</ModalTemplate>
		);
	}
}

export default connect(state => {
	return{
		visible: state.modalReducer.phoneAuthModalVisible
	}
}, {closePhoneAuthModal})(PhoneAuthModal);