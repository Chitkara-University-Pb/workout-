import {createStore} from 'redux';
import workoutApp from './reducers';

export default function configureStore() {
  console.log('creating redux store!');
  return createStore(
    workoutApp,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}