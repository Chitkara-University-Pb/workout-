import React, { Component } from 'react';
import { connect } from 'react-redux'
import LiftEntry from './LiftEntry';
import './RoutineList.css';

import {setCurrentRoutine} from '../redux/actions';

// these will get replaced with the dropbox stuff soon.
const routine = {
  name:'531 Beginner',
  description: 'A simple 3 day a week routine.' ,
  exercises: [
    {
      exercise:'Front Squat',
      sets: [
        {percent: 45, reps: 5},  
        {percent: 60, reps: 5},  
        {percent: 65, reps: 5},  
        {percent: 75, reps: 3},  
      ]
    },
    {
      exercise:'Bench Press',
      sets: [
        {percent: 45, reps: 5},  
        {percent: 60, reps: 5},  
        {percent: 70, reps: 3},  
        {percent: 80, reps: 3},  
        {percent: 90, reps: 3},  
      ]
    },
  ]
};


class SetRecorder extends Component {
  
  render() {
    const lift_divs = routine.exercises.map(({exercise, sets}, index) => (
            <LiftEntry key = {index} exercise = {exercise} sets = {sets}/>));
            
    return (
      <div className="set_recorder">
        <div>{routine.title}</div>
        <h3>{routine.title}</h3>
        {lift_divs}
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
