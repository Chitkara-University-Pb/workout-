import React, { Component } from 'react';
import { connect } from 'react-redux'
import Dropbox from 'dropbox';
import { Link } from 'react-router-dom';

import {
  CLIENT_ID, 
  parseUrlHash,
  isAuthenticated,
  getAccessTokenParsedHash,
} from '../helpers/dropbox_login';

import {addToken} from '../redux/actions';
import './Login.css';

const BASE_URL = 'https://70.231.115.239:9003/';

class login extends Component {
  
  constructor(props){
    super(props);
 
    // if our store say's we arent logged in, check for auth key in url hash
    if(!this.props.logged_in){
      const parsedHash = parseUrlHash();
      const hasKey = isAuthenticated(parsedHash);
      
      // if we have a token in the url, extract it and send it to the store
      if(hasKey){
        const accessToken = getAccessTokenParsedHash(parsedHash);
        this.props.sendNewToken(accessToken)
      } 
    } 
  }
  
  logIn(){
    // Set the login anchors href using dbx.getAuthenticationUrl()
    const dbx = new Dropbox({ clientId: CLIENT_ID });
    const authUrl = dbx.getAuthenticationUrl(BASE_URL);
    window.location.href = authUrl;
  }
  
  logOut(){
    console.log('logging user out!');
    window.location.href = BASE_URL;
  }
  
  render() {
    return (
      <div className="login_screen">
        <h3>{this.props.logged_in ? 'Welcome Back!' : "Let's log in to get started!"}</h3>
        <button onClick={this.props.logged_in ? this.logOut : this.logIn}>
          {this.props.logged_in ? 'Log Out' : 'Log In'}
        </button>
        {this.props.logged_in ? 
          <p><Link to='/ChooseWorkout'>Choose Your Workout</Link></p> : 
          <div></div>
        }
      </div>
    );
  }
}

// this will take the desired parts of the state object and map them 
// to the props of the component
const mapStateToProps = (state, ownProps) => ({
  logged_in: state.dropbox_token.length > 0,
  token: state.dropbox_token
});

// this will take your needed dispatch functions and also send them to the props
// for you to call wherever you may need. 
const mapDispatchToProps = (dispatch, ownProps) => ({
  sendNewToken: (token) => {
    dispatch(addToken(token))
  },
});

// bind everything together with the magically appearing state object from Provider
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(login);
