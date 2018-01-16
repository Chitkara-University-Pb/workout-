///////////////////////////////////////////////////
// Actions
///////////////////////////////////////////////////
export const ADD_TOKEN = 'ADD_TOKEN';

export const addToken = (token) => ({
  type: ADD_TOKEN,
  token,
});

export const SET_CURRENT_ROUTINE = 'SET_CURRENT_ROUTINE';

export const setCurrentRoutine = (routine_index) => ({
  type: SET_CURRENT_ROUTINE,
  routine_index,
});