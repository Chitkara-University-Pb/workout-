import React, { Component } from 'react';
import SetEntry from './SetEntry';
import './LiftEntry.css';
// takes a prop as an object and then writes out sets etc.

const calc_lift_weight = (weight, percent) => {
  const weight_interval = 2.5;
  const raw_weight = weight * (percent/100);

  return Math.ceil(raw_weight/weight_interval)*weight_interval;
}
class LiftEntry extends Component {
 constructor(props) {
    super(props);
    
    this.state = {
      lift_weight: 0,
      sets: this.props.sets,
    };

    this.handleChange = this.handleChange.bind(this);
    this.addSet = this.addSet.bind(this);
    this.removeSet = this.removeSet.bind(this);
  }
  
  handleChange(event) {
    const newWeight = parseInt(event.target.value, 10) | 0;
    this.setState({lift_weight: newWeight});
  }
  
  addSet(){
    const last_set = this.state.sets[this.state.sets.length-1]
    
    // add a new set to the end that is the same as the last one. 
    this.setState({
      sets: [
        ...this.state.sets,
        last_set,
      ]
        
    });
  }
  
  removeSet(){
    const current_sets = this.state.sets;
    const one_set_left = this.state.sets.length == 1;
    
    this.setState({
      sets: one_set_left ? current_sets : current_sets.slice(0,-1),
    });
  }
  
  render() {
    return (
      <div className = 'lift_entry' >
        <div className = 'lift_header'>
          <div className = 'lift_title'> {this.props.exercise} </div>
          <div className = 'weight_text'> Weight: </div>
          <div> 
            <input 
              type="text" 
              value={this.state.lift_weight} 
              onChange={this.handleChange} 
            />
          </div>
        </div>
        <div className = 'sets_list'>
          {this.state.sets.map(
            ({percent, reps}, index) => ( 
              <SetEntry 
                key = {index}
                setNum = {index + 1}
                lift = {this.props.exercise}
                weight = {calc_lift_weight(this.state.lift_weight, percent)} 
                repNum = {reps} />
            ))
          }
        </div>
        <div className = 'setAddRemove'>
          <button onClick = {this.addSet}> Add New Set </button>
          <button onClick = {this.removeSet}> Remove Last Set </button>
        </div>
      </div>
    );
  }
}


// bind everything together with the magically appearing state object from Provider
export default LiftEntry;
