import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import configureStore from './redux/create_store';
import Login from './components/Login';
import WorkoutChoose from './components/WorkoutChoose';
import RoutineList from './components/RoutineList';
import SetRecorder from './components/SetRecorder';
import './App.css';


// REDUX INITIALIZATION
const store = configureStore();

console.log(store.getState())
// controls the switching stuff
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/chooseWorkout' component={WorkoutChoose}/>
      <Route exact path='/routineList' component={RoutineList}/>
      <Route exact path='/setRecorder' component={SetRecorder}/>
      <Route exact path='/' component={Login}/>
      <Route exact path='/access_token*' component={Login}/>
    </Switch>
  </main>
)

// The main header strip
const Header = () => (
  <header className="App-header">
    <h1 className="App-title">Let's Workout More!</h1>
  </header>
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header/>
          <div className = "App-body">
            <Main/>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
