import { applyMiddleware, compose, createStore } from 'redux';
import initialState from './initialState';
import reducer from './redux/reducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import persistState from 'redux-localstorage'; 
const enhancer = compose(
	applyMiddleware( thunk, logger() ),
	persistState()
)

const store = createStore( reducer, initialState, enhancer );

export default store;