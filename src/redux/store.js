import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../redux/combineReducer';
import thunk from 'redux-thunk';

const middlewares = [thunk];

// if (__DEV__) {
//   const createDebugger = require('redux-flipper').default;
//   middlewares.push(createDebugger());
// }

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
