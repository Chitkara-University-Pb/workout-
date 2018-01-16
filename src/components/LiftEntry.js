import React, { Component } from 'react';
import { connect } from 'react-redux'

import SetEntry from './SetEntry';
import { removeCompletedLift } from '../redux/actions';
import './LiftEntry.css';

const calc_lift_weight = (weight, percent) => {
  const weight_interval = 2.5;
  const raw_weight = weight * (percent/100);
  return Math.ceil(raw_weight/weight_interval)*weight_interval;
};


class LiftEntry extends Component {
 constructor(props) {
    super(props);
    
    this.state = {
      lift_weight: 0,
      sets: this.props.sets.map(set => ({...set, finished: false})),
    };

    this.handleChange = this.handleChange.bind(this);
    this.addSet = this.addSet.bind(this);
    this.removeSet = this.removeSet.bind(this);
    this.finishedSet = this.finishedSet.bind(this);
  }
  
  handleChange(event) {
    const newWeight = parseInt(event.target.value, 10) | 0;
    this.setState({lift_weight: newWeight});
  }
  
  addSet(){
    const last_set = this.state.sets[this.state.sets.length-1];
    
    // add a new set to the end that is the same as the last one. 
    this.setState({
      sets: [...this.state.sets, {...last_set, finished: false}]
    });
  }
  
  removeSet(){
    const current_sets = this.state.sets;
    const one_set_left = this.state.sets.length === 1;

    // erase set from redux store of completed lifts if it was recorded before.
    this.props.eraseSet({
      lift: this.props.exercise, 
      setNum: current_sets.length
    });
    
    this.setState({
      sets: one_set_left ? current_sets : current_sets.slice(0,-1),
    });
  }
  
  finishedSet(index){
    return (weight) => {
      const current_sets = this.state.sets
      const new_sets = current_sets.map(
        (set, i) => ({
          ...set, 
          finished: index === i ? !set.finished : set.finished})
      );
      
      // dispatch action
      // this.props.completedSet({...new_sets[index], weight});
      
      this.setState({
        sets: new_sets,
      });
    }
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
            ({percent, reps, finished}, index) => ( 
              <SetEntry 
                key = {index}
                setNum = {index + 1}
                lift = {this.props.exercise}
                weight = {calc_lift_weight(this.state.lift_weight, percent)} 
                repNum = {reps}
                finished = {finished}
                onFinish = {this.finishedSet(index)}
              />
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

// this will take the desired parts of the state object and map them 
// to the props of the component
const mapStateToProps = (state, ownProps) => ({
  token: state.dropbox_token
});

// this will take your needed dispatch functions and also send them to the props
// for you to call wherever you may need. 
const mapDispatchToProps = (dispatch, ownProps) => ({
  eraseSet: (setInfo) => {
    dispatch(removeCompletedLift(setInfo));
  },
});

// bind everything together with the magically appearing state object from Provider
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LiftEntry);

