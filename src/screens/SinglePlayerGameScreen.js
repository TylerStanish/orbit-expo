import React from 'react';
import {
	View,
	Text
} from 'react-native';
import Itinerary from '../components/single/Itinerary';
import Market from '../components/single/Market';
import ScrollableTabView from 'react-native-scrollable-tab-view';

class SinglePlayerGameScreen extends React.Component{

	static navigationOptions = {
		headerRight: <Text style={{fontWeight: 'bold', marginRight: 10}}>Round 1/30</Text>
	}

	render(){
		return(
			<ScrollableTabView>
				<Itinerary tabLabel={'Itinerary'}/>
				<Market tabLabel={'Market'}/>
			</ScrollableTabView>
		);
	}
}

export default SinglePlayerGameScreen;