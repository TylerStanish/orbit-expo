import React from 'react';
import {
	View
} from 'react-native';
import {
	PricingCard
} from 'react-native-elements';
import styles from '~/src/styles';

export default class ChooseScreen extends React.Component{
	render(){
		return(
			<View style={styles.containerCenter}>
				<PricingCard
					containerStyle={{flex: 1}}
					wrapperStyle={{flex: 1, justifyContent: 'center'}}
					title={'Single Player'}
					color={'#4f9deb'}
					button={{title: 'Single Player', icon: 'person'}}
					info={['30, 60, or 90 round games']}
					onButtonPress={() => this.props.navigation.navigate('SinglePlayer')}
				/>
				<PricingCard
					containerStyle={{flex: 1}}
					wrapperStyle={{flex: 1, justifyContent: 'center'}}
					title={'Multiplayer'}
					color={'#9D28E6'}
					button={{title: 'Coming soon!', icon: 'people'}}
					info={['Play with friends in real time!']}
				/>
			</View>
		)
	}
}