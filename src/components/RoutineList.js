import React, { Component } from 'react';
import { connect } from 'react-redux'
import './RoutineList.css';

import {setCurrentRoutine} from '../redux/actions';

// these will get replaced with the dropbox stuff soon.
const routines = [
  {
    name:'531 Beginner',
    description: 'A simple 3 day a week routine.' ,
  },
  {
    name:'Smolov Bench',
    description: 'An intense 4 day a week routine focused on benching.' ,
  },
  {
    name: 'Long Run',
    description: 'A long slow run.' ,
  },
];


class routineList extends Component {
  
  selectRoutine(index){
    // dispatch action to redux about the newly selected routine
    this.props.choseRoutine(index)
    
    // navigate to the selected routine
    // code goes here soon
  }
  
  render() {
    
    const routine_divs = routines.map((routine, index) => (
            <div 
              onClick = {() => this.selectRoutine(index)} 
              key = {index} 
              className = 'routine_entry' >
              <span className = 'routine_title'> {routine.name} </span>
              <span className = 'routine_description'> {routine.description} </span>
            </div>));
            
    return (
      <div className="routine_chooser">
        <h3>What routine?</h3>
        {routine_divs}
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
)(routineList);
