import React from 'react';
import{
	View,
	Text
} from 'react-native';
import {connect} from 'react-redux';

class Market extends React.Component{
	render(){
		return(
			<View style={{flex: 1}}>
				<Text>This is the market page</Text>
			</View>
		);
	}
}

export default connect(state => {
	return{

	}
})(Market);