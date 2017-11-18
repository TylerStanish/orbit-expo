import React from 'react';
import{
	View,
	Text
} from 'react-native';

class Balance extends React.Component{
	render(){
		return(
			<View style={{height: 40, width: '100%', flexDirection: 'row'}}>
				<Text style={{textAlign: 'center', padding: 10, flex: 1, backgroundColor: '#8cc153'}}>{this.props.chips.toLocaleString()}</Text>
				<Text style={{textAlign: 'center', padding: 10, flex: 1, backgroundColor: '#ff4b30'}}>{this.props.debt.toLocaleString()}</Text>
				<Text style={{textAlign: 'center', padding: 10, flex: 1, backgroundColor: '#FFDD3C'}}>{this.props.netWorth.toLocaleString()}</Text>
			</View>
		);
	}
}

export default Balance;