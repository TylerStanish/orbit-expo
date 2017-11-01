import React from 'react';
import {
	View,
	Dimensions,
	TextInput,
	Text,
	Keyboard
} from 'react-native';
import {
	Button
} from 'react-native-elements';
import styles from '../styles';

const {width} = Dimensions.get('window');
class PhoneVerifyScreen extends React.Component{

	constructor(p){
		super(p);
		this.state = {
			number: '',
			keyboardHeight: 0
		};
	}

	componentDidMount(){
		let bla = Keyboard.addListener('keyboardDidShow', (e) => {
			this.setState({keyboardHeight: e.endCoordinates.height});
		});
	}

	// I'm not using this method, but I think it's good
	renderInputs(){
		let arr = [];
		for(let i=0; i<10; i++){
			arr.push(
				<TextInput
					key={i}
					style={{
						height: 50,
						borderBottomWidth: 1,
						borderBottomColor: 'purple',
						fontSize: width/15,
						width: width/12,
						margin: 4
					}}
					keyboardType={'phone-pad'}
					containerStyle={{width: width/20}}
					maxLength={1}
					ref={ref => this._refs[i] = ref}
					onChangeText={t => {
						if(i<9 && this.state.numbers[i].length === 0){
							this._refs[i+1].focus();
						}else if(i>0){
							this._refs[i-1].focus();
						}
						let {numbers} = this.state;
						numbers[i] = t;
						this.setState({numbers});
					}}
				/>
			);
		}
		return arr;
	}

	renderAreaCode(){
		let arr = [];
		let numbers = this.state.number.split('').slice(0, 3);
		for(let i=0; i<3; i++){
			if(isNaN(numbers[i])) numbers[i] = '_';
		}
		// we can use indexOf here because it returns the first index that it encounters '_'
		let next = numbers.indexOf('_');

		arr.push(<Text style={styles.phoneAuthText}>(</Text>);
		numbers.map((num, index) => {
			let color = 'black';
			if(index === next) color = 'purple';
			arr.push(<Text style={[styles.phoneAuthText, {color}]}>{num}</Text>);
		});
		arr.push(<Text style={styles.phoneAuthText}>)</Text>);
		return arr;
	}

	renderNumber(){
		let arr = [];
		let numbers = this.state.number.split('').slice(0, 10);
		for(let i=0; i<10; i++){
			if(isNaN(numbers[i])) numbers[i] = '_';
		}
		let next = numbers.indexOf('_');
		numbers.slice(3, 6).map((num, index) => {
			let color = 'black';
			if(index+3 === next) color = 'purple';
			arr.push(<Text style={[styles.phoneAuthText, {color}]}>{num}</Text>)
		});
		arr.push(<Text style={styles.phoneAuthText}>-</Text>);
		numbers.slice(6, 10).map((num, index) => {
			let color = 'black';
			if(index+6 === next) color = 'purple';
			arr.push(<Text style={[styles.phoneAuthText, {color}]}>{num}</Text>)
		});
		return arr;
	}

	render(){
		console.log(this.state.keyboardHeight);
		return(
			<View style={{marginTop: 100, flex: 1, marginBottom: this.state.keyboardHeight+20, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
				<View style={{alignItems: 'center'}}>
					<View style={{flexDirection: 'row'}}>{this.renderAreaCode()}</View>
					<View style={{flexDirection: 'row'}}>{this.renderNumber()}</View>
				</View>
				<TextInput
					keyboardType={'phone-pad'}
					style={{position: 'absolute', top: -100, left: -100}}
					autoFocus
					value={this.state.number}
					onChangeText={num => {
						if(num.length < 11){
							this.setState({number: num});
						}
					}}
				/>
				<View style={{alignItems: 'center', width: '100%'}}>
					<Button
						title={'Verify Phone Number'}
						backgroundColor={'#744BAC'}
						large
						raised
						containerViewStyle={{width: '90%'}}
						borderRadius={5}
					/>
					<Text style={styles.finePrint}>By tapping "Verify Phone Number" above, we will send you an SMS to confirm your phone number. Message &amp; data rates may apply.</Text>
				</View>
			</View>
		);
	}
}

export default PhoneVerifyScreen;