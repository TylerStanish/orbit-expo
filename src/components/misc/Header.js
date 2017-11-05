import React from 'react';
import{
	View,
	Text
} from 'react-native';
import {connect} from 'react-redux';
import Loading from './Loading';
import {nextPeriod} from '../../actions/single/SinglePlayerGameActions';

class Header extends React.Component{
	render(){
		if(!this.props.game || this.props.loading){
			return <Loading/>
		}
		return(
			<Text
				style={{marginRight: 5}}
				onPress={() => this.props.nextPeriod(this.props.game._id)}
			>
				Period {this.props.game.currentPeriod}/{this.props.game.maxPeriods}
			</Text>
		);
	}
}

export default connect(state => {
	return{
		game: state.fetchGamesReducer.game,
		loading: state.singlePlayerGameReducer.nextPeriodLoading
	}
}, {nextPeriod})(Header);