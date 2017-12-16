import React from 'react';
import{
  View,
  StatusBar
} from 'react-native';
// import PhoneAuth from '../../react-native-phone-auth-component';
import PhoneAuth from 'react-native-phone-auth-component';
import axios from 'axios';
import firebase from 'firebase';

class PhoneVerifyScreen extends React.Component{

  state = {
    phone: '',
    code: ''
  };

  signInWithPhone(phone){
    this.setState({phone});
    return axios.post(process.env.URL + '/signInWithPhone', {
      phone
    }).then((tok) => {
      return Promise.resolve();
    }).catch(e => {
      alert('There was an error or something');
      return Promise.reject();
    });
  }

  redeemCode(code){
    return axios.post(process.env.URL + '/redeemCode', {
      phone: this.state.phone,
      code
    }).then((res) => {
      let tok = res.data.token;
      console.log(tok);
      console.log('^^^ should be the token');
      // let's log em' in
      firebase.auth().signInWithCustomToken(tok).then(() => {
        return Promise.resolve();
      }).catch(e => {
        console.log(e);
        alert(e.error);
        return Promise.reject();
      });
    }).catch(e => {
      alert(e.response.data.error);
      return Promise.reject();
    });
  }

  render(){
    return(
      <View style={{flex: 1}}>
        <StatusBar hidden={false}/>
        <PhoneAuth
          signInWithPhone={(phone, cb) => this.signInWithPhone(phone, cb)}
          redeemCode={(code, cb) => this.redeemCode(code, cb)}
          codeLength={4}
          buttonTextColor={'black'}
          spinnerColor={'black'}
        />
      </View>
    );
  }
}

export default PhoneVerifyScreen;