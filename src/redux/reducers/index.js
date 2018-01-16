///////////////////////////////////////////////////
// Reducers
///////////////////////////////////////////////////

import {combineReducers} from 'redux';
import {
  ADD_TOKEN,
  SET_CURRENT_ROUTINE,
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


const workoutApp = combineReducers({
  dropbox_token,
  current_routine,
});

export default workoutApp;