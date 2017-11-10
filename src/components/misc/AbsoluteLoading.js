import React from 'react';
import {
	View,
	ActivityIndicator,
	Dimensions
} from 'react-native';
import {connect} from 'react-redux';

const {height, width} = Dimensions.get('window');
class AbsoluteLoading extends React.Component{
	render(){
		return(
			<View style={{position: 'absolute', top: 0, left: 0, height, width, backgroundColor: 'white', opacity: 0.6}}>
				<View style={{
					position: 'absolute',
					backgroundColor: '#ccc',
					borderRadius: 10,
					width: 100,
					height: 100,
					top: height/2 -100,
					left: width/2 - 50,
					justifyContent: 'center',
					alignItems: 'center'
				}}>
					<ActivityIndicator active={this.props.loading} size={'large'} color={'black'}/>
				</View>
			</View>
		);
	}
}

export default connect(state => {
	return{
		loading: state.modalReducer.absoluteLoading
	}
})(AbsoluteLoading);