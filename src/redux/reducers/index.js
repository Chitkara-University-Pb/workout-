///////////////////////////////////////////////////
// Reducers
///////////////////////////////////////////////////

import {combineReducers} from 'redux';
import {
  ADD_TOKEN,
  SET_CURRENT_ROUTINE,
  ADD_COMPLETED_LIFT,
  REMOVE_COMPLETED_LIFT,
} from '../actions';

const dropbox_token = (state = '', action) => {
  switch (action.type) {
    case ADD_TOKEN:
      return action.token;
    default:
      return state;
  }
};

// the current routine is kept track of by the index in the array of routines. 
// -1 means that we don't have a routine selected.
const current_routine = (state = -1, action) => {
  switch (action.type) {
    case SET_CURRENT_ROUTINE:
      return action.routine_index;
    default:
      return state;
  }
};


// Completed Lifts
const completed_lifts = (state = [], action) => {
  switch (action.type) {
    
    
    case ADD_COMPLETED_LIFT:
      console.log('adding set')
      return [...state, action.lift_info];
      
      
    case REMOVE_COMPLETED_LIFT:
      console.log('removing set', action)
      const {lift, setNum} = action.lift_info; 
      return state.filter(set => !(set.lift === lift && set.setNum === setNum))
    
    
    default:
      return state;
  }
};


const workoutApp = combineReducers({
  dropbox_token,
  current_routine,
  completed_lifts,
});

export default workoutApp;