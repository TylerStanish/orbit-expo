import React from 'react';
import{
	View,
	ActivityIndicator
} from 'react-native';

class Loading extends React.Component{
	render(){
		return(
			<View>
				<ActivityIndicator color={'black'}/>
			</View>
		);
	}
}

export default Loading;