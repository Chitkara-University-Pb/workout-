///////////////////////////////////////////////////
// Reducers
///////////////////////////////////////////////////

import {combineReducers} from 'redux';
import update from 'immutability-helper';
import {
  ADD_TOKEN,
  SET_CURRENT_ROUTINE,
  ADD_COMPLETED_LIFT,
  REMOVE_COMPLETED_LIFT,
  ADD_NEW_SET,
} from '../actions';

const dropbox_token = (state = '', action) => {
  switch (action.type) {
    case ADD_TOKEN:
      return action.token;
    default:
      return state;
  }
};


// these will get replaced with the dropbox stuff soon.
const sampleRoutine = {
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

// the current routine is kept track of by the index in the array of routines. 
// -1 means that we don't have a routine selected.
const current_routine = (state = sampleRoutine, action) => {
  switch (action.type) {
    case SET_CURRENT_ROUTINE:
      return action.routine_info;
    case ADD_NEW_SET:
      // console.log('index of new',action)
      // debugger;
      // {name, description, exercizes}
      // find where in exercizes we have the lift we want to add to
      const exercise_index = state
        .exercises
        .findIndex(ex => ex.exercise === action.newSetInfo.lift);
      
      // somewhere here things are breaking.
      const new_exercises = update(state, 
        {
          'sets': {
            [exercise_index]: {
              $push: [action.newSetInfo]
            }
          }
        }
      );
      debugger;
      return new_exercises;
      
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