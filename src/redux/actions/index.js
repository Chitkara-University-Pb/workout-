///////////////////////////////////////////////////
// Actions
///////////////////////////////////////////////////
export const ADD_TOKEN = 'ADD_TOKEN';
export const addToken = (token) => ({
  type: ADD_TOKEN,
  token,
});


export const SET_CURRENT_ROUTINE = 'SET_CURRENT_ROUTINE';
export const setCurrentRoutine = (routine_info) => ({
  type: SET_CURRENT_ROUTINE,
  routine_info,
});

export const ADD_NEW_SET = 'ADD_NEW_SET';
export const addNewSet = (newSetInfo) => ({
  type: ADD_NEW_SET,
  newSetInfo,
});


export const ADD_COMPLETED_LIFT = 'ADD_COMPLETED_LIFT';
export const addCompletedLift = (lift_info) => ({
  type: ADD_COMPLETED_LIFT,
  lift_info,
});


export const REMOVE_COMPLETED_LIFT = 'REMOVE_COMPLETED_LIFT';
export const removeCompletedLift = (lift_info) => ({
  type: REMOVE_COMPLETED_LIFT,
  lift_info,
});