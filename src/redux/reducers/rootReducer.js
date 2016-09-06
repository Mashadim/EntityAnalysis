import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import entitiesReducer from './entitiesReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
	entity: entitiesReducer,
	auth: authReducer,
	form: formReducer
});

export default rootReducer;