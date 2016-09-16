import React, { Component } from 'react';
import Header from './Header';
import { connect } from 'react-redux';


export class App extends Component {
	render() {
		return(
			<div className='container'>
				<Header />
				{ this.props.children }
			</div>
		)
	};
};

export default App;