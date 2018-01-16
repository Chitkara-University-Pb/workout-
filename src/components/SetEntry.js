import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addCompletedLift, removeCompletedLift } from '../redux/actions';
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
    const {lift, repNum, setNum, weight} = this.props;
    
    const set_results = {
      lift, repNum, setNum, weight,
      time: day_getter(),
    }
    
    console.log(set_results)
    
    !this.props.finished ? 
      this.props.completedSet(set_results):
      this.props.eraseSet(set_results);
      
    this.props.onFinish(this.props.weight);
  }
  
  render() {
    return (
      <div className = 'setEntry'>
        <div className = 'setWeight'> {this.props.weight} </div>
        <div className = 'setReps'> {this.props.repNum} reps </div>
        <div className = 'doneButton'> 
          <button 
            className = {this.props.finished ? 'done': 'toDo'}
            onClick = {this.doneButton}
          >
            {this.props.finished ? '👍': '⬜'}
          </button>
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
  completedSet: (setInfo) => {
    dispatch(addCompletedLift(setInfo));
  },  
  eraseSet: (setInfo) => {
    dispatch(removeCompletedLift(setInfo));
  },
});

// bind everything together with the magically appearing state object from Provider
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetEntry);

