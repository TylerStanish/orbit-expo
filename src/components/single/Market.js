import React from 'react';
import{
	View,
	Text
} from 'react-native';
import{
	ListItem
} from 'react-native-elements';
import {connect} from 'react-redux';

class Market extends React.Component{

	renderItems(){
		return this.props.game.repository.map(i => {
			return <ListItem
				title={i.name}
				badge={{value: i.qty}}
			/>
		});
	}

	render(){
		return(
			<View style={{flex: 1}}>

			</View>
		);
	}
}

export default connect(state => {
	return{

	}
})(Market);