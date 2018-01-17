import React, { Component } from 'react';
import { connect } from 'react-redux'
import LiftEntry from './LiftEntry';
import './SetRecorder.css';

import {setCurrentRoutine} from '../redux/actions';


class SetRecorder extends Component {

  addLift(){
    console.log('adding a lift, yo')
    const newExercise = {
      exercise:'New Lift',
      sets: [
        {percent: 100, reps: 5},  
      ],
    };
    
    // this.setState({
    //   exercises: [...this.state.exercises, newExercise],
    // });
  }
  
  render() {
    console.log()
    const lift_divs = this.props.routine.exercises.map(({exercise, sets}, index) => (
            <LiftEntry key = {index} exercise = {exercise} sets = {sets}/>));
            
    return (
      <div className="set_recorder">
        <div>{this.props.routine.title}</div>
        <h3>{this.props.routine.title}</h3>
        {lift_divs}
        <div>
          <button onClick = {this.addLift} className = 'addLift'>
            Add New Lift
          </button>
        </div>
      </div>
    );
  }
}

// this will take the desired parts of the state object and map them 
// to the props of the component
const mapStateToProps = (state, ownProps) => ({
  routine: state.current_routine,
  logged_in: state.dropbox_token.length > 0,
  token: state.dropbox_token
});

// this will take your needed dispatch functions and also send them to the props
// for you to call wherever you may need. 
const mapDispatchToProps = (dispatch, ownProps) => ({
  choseRoutine: (routine_index = 2) => {
    console.log('dispatching the choose routine function');
    dispatch(setCurrentRoutine(routine_index))
  },
});

// bind everything together with the magically appearing state object from Provider
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetRecorder);
