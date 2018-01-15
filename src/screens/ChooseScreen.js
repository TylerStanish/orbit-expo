import React from 'react';
import {
  View,
  Text,
  Platform
} from 'react-native';
import {
  PricingCard
} from 'react-native-elements';
import firebase from 'firebase';
import styles from '../styles';

export default class ChooseScreen extends React.Component{

  static navigationOptions = {
    headerRight: <Text onPress={() => firebase.auth().signOut()} style={{fontWeight: 'bold', marginRight: 10}}>Log out</Text>,
    headerTitle: 'Main Menu'
  };

  render(){
    return(
      <View style={styles.containerCenter}>
        <PricingCard
          containerStyle={{flex: 1, marginBottom: 2, marginTop: 2}}
          wrapperStyle={{flex: 1, justifyContent: 'center', paddingTop: Platform.OS === 'android' ? 13 : 0}}
          title={'Leaderboards'}
          color={'#FF8E09'}
          button={{title: 'Leaderboards', icon: 'grade'}}
          info={['Who holds records?']}
          onButtonPress={() => this.props.navigation.navigate('Leaderboard')}
        />
        <PricingCard
          containerStyle={{flex: 1, marginBottom: 2, marginTop: 2}}
          wrapperStyle={{flex: 1, justifyContent: 'center', paddingTop: Platform.OS === 'android' ? 13 : 0}}
          title={'Single Player'}
          color={'#4f9deb'}
          button={{title: 'Single Player', icon: 'person'}}
          info={['30, 60, or 90 round games']}
          onButtonPress={() => this.props.navigation.navigate('SinglePlayer')}
        />
        <PricingCard
          containerStyle={{flex: 1, marginBottom: 2, marginTop: 2}}
          wrapperStyle={{flex: 1, justifyContent: 'center', paddingTop: Platform.OS === 'android' ? 13 : 0}}
          title={'Multiplayer'}
          color={'#9D28E6'}
          button={{title: 'Coming soon!', icon: 'people'}}
          info={['Play with friends in real time!']}
        />
      </View>
    )
  }
}