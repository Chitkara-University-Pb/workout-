import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

// bring in the add token action
import {addToken} from '../redux/actions';
import './Login.css';

class login extends Component {
  
  render() {
    return (
      <div className="login_screen">
        <h3>Login to get started</h3>
        <button onClick={this.props.sendNewToken}>
          {this.props.logged_in ? 'Logged in' : 'Log out'}
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
  sendNewToken: () => {
    console.log('dispatching the add token action');
    dispatch(addToken('oashdofiahofahdsf'))
  },
});

// bind everything together with the magically appearing state object from Provider
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(login);
