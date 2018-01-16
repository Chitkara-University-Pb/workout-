import React, { Component } from 'react';
// import {
//   Link
// } from 'react-router-dom';

const possibleWorkouts = [
  {
    name: '531 Beginner',
    description: 'A 3 day workout with non-linear advancement',
  },
  {
    name: 'Smolovs Bench',
    description: 'A 4 day a week workout focused on bench press',
  },
];

class WorkoutChoose extends Component {
  
  render() {
    // const list_of_workouts = possibleWorkouts.map(({name})) => <li>{wo.name}</li>;
    return (
      <div className="login_screen">
        <ul>
        {possibleWorkouts.map(({name}, i) => <li key = {i}>{name}</li>)}
        </ul>
      </div>
    );
  }
}

export default WorkoutChoose;
