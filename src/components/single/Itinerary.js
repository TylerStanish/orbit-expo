import React from 'react';
import {
 	View
} from 'react-native';
import {
	Button
} from 'react-native-elements';

class Itinerary extends React.Component{

	state = {
		height: 10
	}

	handleLayout(e){
		let height = e.nativeEvent.layout.height;
		this.setState({height: height-20});
	}

	render(){
		return(
			<View onLayout={e => this.handleLayout(e)} style={{flex: 1, justifyContent: 'space-around'}}>
				<Button
					large
					raised
					title={'Bank'}
					backgroundColor={'#fcc746'}
					icon={{name: 'attach-money'}}
					buttonStyle={{height: this.state.height/3}}
				/>
				<Button
					large
					raised
					title={'Ship'}
					icon={{name: 'flight-takeoff'}}
					backgroundColor={'#4f9deb'}
					buttonStyle={{height: this.state.height/3}}
				/>
				<Button
					large
					raised
					title={'Travel'}
					buttonStyle={{height: this.state.height/3}}
					icon={{name: 'skip-next'}}
					backgroundColor={'#9D28E6'}
				/>
			</View>
		);
	}
}

export default Itinerary;