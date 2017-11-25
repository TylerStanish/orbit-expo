import React from 'react';
import {
  Dimensions,
  View,
  StatusBar
} from 'react-native';
import AppIntro from 'react-native-app-intro-slider';

export default class WelcomeScreen extends React.Component{

  onSkipBtnHandle = () => {
    this.props.navigation.navigate('PhoneVerify');
  };

  doneBtnHandle = () => {
    this.props.navigation.navigate('PhoneVerify');
  };

  render(){
    const pageArray = [{
      key: '1',
      title: 'Orbit Smuggler',
      image: require('../../assets/icons/zeroth.png'),
      imageStyle: {
        flex:1,
        resizeMode: 'contain'
      },
      backgroundColor: '#212121',
    }, {
      key: '2',
      text: 'Orbit Smuggler is a turn based strategy app where you play the role of a smuggler moving black market goods around the solar system.',
      image: require('../../assets/icons/first.png'),
      imageStyle: {
        flex:1,
        resizeMode: 'center'
      },
      backgroundColor: '#311B92',
    }, {
      key: '3',
      text: 'Make wise economic decisions buying low and selling high on black market goods in a dystopian high-tech future. Beware of authorities.',
      image: require('../../assets/icons/second.png'),
      imageStyle: {
        flex:1,
        resizeMode: 'contain'
      },
      backgroundColor: '#263238',
    }, {
      key: '4',
      text: 'Use the Orbit to your advantage. Trade when planets are close.',
      image: require('../../assets/icons/fourth.png'),
      imageStyle: {
        height: 93 * 2.5,
        width: Dimensions.get('window').width,
      },
      backgroundColor: '#000000',
    }, {
      key: '5',
      text: 'Pay off your debt quickly or face dire consequences. Keep earning chips (currency) and best your previous score.',
      image: require('../../assets/icons/third.png'),
      imageStyle: {
        height: 93 * 2.5,
        width: Dimensions.get('window').width,
      },
      backgroundColor: '#004D40',
    }];
    return(
      <View style={{flex: 1}}>
        <StatusBar hidden/>
        <AppIntro
          onDone={this.doneBtnHandle}
          onSkip={this.onSkipBtnHandle}
          slides={pageArray}
          dotColor={'#aaa'}
          activeDotColor={'#eee'}
        />
      </View>
    )
  }
}