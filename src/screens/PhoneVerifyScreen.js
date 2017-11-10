import React from 'react';
import {
	View,
	Dimensions,
	TextInput,
	Text,
	Keyboard,
	Animated
} from 'react-native';
import {
	Button,
	FormInput
} from 'react-native-elements';
import CountryPicker from 'react-native-country-picker-modal';
import {connect} from 'react-redux';
import styles from '../styles';
import {signInWithPhone, redeemCode} from '../actions/auth/index';

const {width} = Dimensions.get('window');
class PhoneVerifyScreen extends React.Component{

	constructor(p){
		super(p);
		this.state = {
			number: '',
			code: '',
			keyboardHeight: 0,
			countryInfo: {
				cca2: 'US',
				callingCode: '1',
			},

			verifying: true,
			verifyOpacity: new Animated.Value(1),
			redeemOpacity: new Animated.Value(0)
		};
	}

	componentDidMount(){
		let bla = Keyboard.addListener('keyboardDidShow', (e) => {
			this.setState({keyboardHeight: e.endCoordinates.height});
		});
		this._ref.focus();
	}

	renderAreaCode(){
		let arr = [];
		let numbers = this.state.number.split('').slice(0, 3);
		for(let i=0; i<3; i++){
			if(isNaN(numbers[i])) numbers[i] = '_';
		}
		// we can use indexOf here because it returns the first index that it encounters '_'
		let next = numbers.indexOf('_');

		arr.push(<Text key={Math.random()} style={styles.phoneAuthText}>(</Text>);
		numbers.map((num, index) => {
			let color = 'black';
			if(index === next) color = 'purple';
			arr.push(<Text key={index} style={[styles.phoneAuthText, {color}]}>{num}</Text>);
		});
		arr.push(<Text key={Math.random()} style={styles.phoneAuthText}>)</Text>);
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
			arr.push(<Text key={index+100} style={[styles.phoneAuthText, {color}]}>{num}</Text>)
		});
		arr.push(<Text key={Math.random()} style={styles.phoneAuthText}>-</Text>);
		numbers.slice(6, 10).map((num, index) => {
			let color = 'black';
			if(index+6 === next) color = 'purple';
			arr.push(<Text key={index} style={[styles.phoneAuthText, {color}]}>{num}</Text>)
		});
		return arr;
	}

	renderCode(){
		let arr = [];
		let numbers = this.state.code.split('');
		for(let i=0; i<4; i++){
			if(isNaN(numbers[i])) numbers[i] = '_';
		}
		let next = numbers.indexOf('_');
		numbers.map((num, index) => {
			let color = 'black';
			if(index === next) color = 'purple';
			arr.push(<Text key={index} style={[styles.phoneAuthText, {color, fontSize: 80}]}>{num}</Text>);
		});
		return arr;
	}

	verify(){
		let string = `+${this.state.countryInfo.callingCode}${this.state.number}`;
		this.props.signInWithPhone(string, err => {
			if(!err){
				Animated.timing(this.state.verifyOpacity, {toValue: 0}).start(() => {
					this.setState({verifying: false}, () => {
						Animated.timing(this.state.redeemOpacity, {toValue: 1}).start();
					});
				});
			}else{
				alert(err.error);
			}
		});
	}

	redeemCode(){
		let string = `+${this.state.countryInfo.callingCode}${this.state.number}`;
		this.props.redeemCode(string, Number(this.state.code));
	}

	render(){

		let verifying = (
			<Animated.View style={{
				marginTop: 100,
				flex: 1,
				marginBottom: this.state.keyboardHeight+20,
				flexDirection: 'column',
				justifyContent: 'space-between',
				alignItems: 'center',
				opacity: this.state.verifyOpacity
			}}>
				<View style={{alignItems: 'center'}}>
					<View style={{flexDirection: 'row', alignItems: 'center'}}>
						<CountryPicker
							cca2={this.state.countryInfo.cca2}
							onChange={e => {
								this.setState({countryInfo: e}, () => {
									this._ref.focus();
								});
							}}
							onClose={() => this._ref.focus()}
							filterable
							closeable
						/>
						<Text style={styles.phoneAuthText}>+{this.state.countryInfo.callingCode}</Text>
						{this.renderAreaCode()}
					</View>
					<View style={{flexDirection: 'row'}}>{this.renderNumber()}</View>
				</View>
				<FormInput
					ref={ref => this._ref = ref}
					keyboardType={'phone-pad'}
					style={{position: 'absolute', top: -100, left: -100}}
					value={this.state.number}
					onChangeText={num => {
						if(num.length < 11){
							this.setState({number: num});
						}
					}}
				/>
				<View style={{alignItems: 'center', width: '100%'}}>
					<Button
						title={this.props.loading ? ' ' : 'Verify Phone Number'}
						backgroundColor={'#744BAC'}
						large
						raised
						containerViewStyle={{width: '90%'}}
						borderRadius={5}
						onPress={() => this.verify()}
						loading={this.props.loading}
					/>
					<Text style={styles.finePrint}>By tapping "Verify Phone Number" above, we will send you an SMS to confirm your phone number. Message &amp; data rates may apply.</Text>
				</View>
			</Animated.View>
		);

		let redeeming = (
			<Animated.View style={{
				opacity: this.state.redeemOpacity,
				marginTop: 100,
				marginBottom: this.state.keyboardHeight+20,
				justifyContent: 'space-between',
				alignItems: 'center',
				flex: 1
			}}>
				<FormInput
					autoFocus
					keyboardType={'phone-pad'}
					style={{position: 'absolute', top: -100, left: -100}}
					value={this.state.code}
					onChangeText={num => {
						if(num.length < 5){
							this.setState({code: num});
						}
					}}
				/>
				<View style={{flexDirection: 'row'}}>{this.renderCode()}</View>
				<Button
					title={this.props.loadingRedeem ? ' ' : 'Enter code'}
					backgroundColor={'#744BAC'}
					large
					raised
					containerViewStyle={{width: '90%'}}
					borderRadius={5}
					loading={this.props.loadingRedeem}
					onPress={() => this.redeemCode()}
				/>
			</Animated.View>
		);

		return this.state.verifying ? verifying : redeeming
	}
}

export default connect(state => {
	return{
		loading: state.authReducer.loading,
		loadingRedeem: state.authReducer.loadingRedeem
	}
}, {signInWithPhone, redeemCode})(PhoneVerifyScreen);