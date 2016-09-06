import { applyMiddleware, compose, createStore } from 'redux';
import initialState from './initialState';
import reducers from './redux/reducers/rootReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage'; 

const enhancer = compose(
	applyMiddleware( thunk, logger() ),
	persistState()
)

const store = createStore(reducers, initialState, enhancer);

export default store;