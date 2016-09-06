import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import store from './store';
import App from './components/App';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import EntitiesMain from './components/EntitiesMain';

const display = document.querySelector('.container');

render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path='/' component={App}>
				<IndexRoute component={SignUp} />
				<Route path='/signup' component={SignUp} />
				<Route path='/profile'component={EntitiesMain} />
			</Route>
		</Router>
	</Provider>, 
	display)