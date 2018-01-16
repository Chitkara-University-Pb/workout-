import React, { Component } from 'react';
import './SetEntry.css';

const day_getter = () => {
  const d = new Date();
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
}

class SetEntry extends Component {
  constructor(props) {
    super(props);
    this.doneButton = this.doneButton.bind(this);
  }
  
  doneButton(){
    const set_results = {
      ...this.props,
      time: day_getter(),
    }
    console.log('pressed the done button',set_results)
  }
  
  render() {
    return (
      <div className = 'setEntry'>
        <div className = 'setWeight'> {this.props.weight} </div>
        <div className = 'setReps'> {this.props.repNum} reps </div>
        <div> 
          <button className = 'finishButton' onClick = {this.doneButton}>
            Done
          </button>
        </div>
      </div>
    );
  }
}


// bind everything together with the magically appearing state object from Provider
export default SetEntry;
