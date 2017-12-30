import React from 'react';
import{
  View,
  Text
} from 'react-native';
import {connect} from 'react-redux';
import Loading from './Loading';
import {nextPeriod} from '../../actions/single/SinglePlayerGameActions';
import {openTravelModal} from '../../actions/Modals';

class Header extends React.Component{
  render(){
    if(!this.props.game || this.props.loading){
      return <Loading style={{marginRight: 5}}/>
    }
    let last = false;
    let text = `Period ${this.props.game.currentPeriod}/${this.props.game.maxPeriods}`;
    if(this.props.game.currentPeriod === this.props.game.maxPeriods){
      text = 'Finish game';
      last = true;
    }

    return(
      <Text
        style={{marginRight: 5, color: '#007aff'}}
        onPress={() => this.props.openTravelModal()}
      >
        {text}
      </Text>
    );
  }
}

export default connect(state => {
  return{
    game: state.fetchGamesReducer.game,
    loading: state.singlePlayerGameReducer.nextPeriodLoading
  }
}, {nextPeriod, openTravelModal})(Header);