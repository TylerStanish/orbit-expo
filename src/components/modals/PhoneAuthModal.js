import React from 'react';
import {
	View,
	TextInput
} from 'react-native';
import {connect} from 'react-redux';
import CountryPicker from 'react-native-country-picker-modal';

import ModalTemplate from './ModalTemplate';

import {closePhoneAuthModal} from '../../actions/Modals';

class PhoneAuthModal extends React.Component{

	constructor(p){
		super(p);
		let arr = [];
		for(let i = 0; i < 10; i++){
			arr.push('');
		}
		this.state = {
			country: {
				cca2: 'US',
				callingCode: '1'
			},
			width: 0,
			inputs: arr
		}
		this._refs = [];
	}

	getLayout(e){
		this.setState({width: e.nativeEvent.layout.width});
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
		return(
			<ModalTemplate visible={this.props.visible} close={this.props.closePhoneAuthModal}>
				<View onLayout={e => this.getLayout(e)} style={{flex: 1, flexDirection: 'row'}}>
					<CountryPicker cca2={this.state.country.cca2} onChange={s => this.setState({country: s})}/>
					{this.renderInputs()}
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