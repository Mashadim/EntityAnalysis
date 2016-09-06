import React, { Component } from 'react';
import shallowCompare from 'react/lib/shallowCompare';
import { connect } from 'react-redux';
import { dbFetchEntities } from '../redux/actions/actions';

export class GeneralSearchBar extends Component {
	constructor(props) {
		super(props);	
		
		this.state = {
			search: ''
		};	
		
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	};
	
	handleFormSubmit(event) {
		event.preventDefault();
		console.log(this.state.search)
		this.props.dbFetchEntities(this.state.search);
		this.setState({ search: '' });
	}
	
	
	handleInputChange(event) {
		this.setState({ search: event.target.value });
	}
	
	render() {
		return (
			<form className='input-group' 
				onSubmit={ this.handleFormSubmit }>
				<input 
					className='form-control form-control-lg input-form'
					value={ this.state.search }
					onChange={ this.handleInputChange }
					placeholder='Enter text or a URL~!' 
				/>
				<span className='input-group-btn' >
					<button className='btn btn-secondary btn-lg input-btn' type='submit'>
						Extract Entities
					</ button>
				</span>
			</form>
		)
	};
};

export default connect(null, { dbFetchEntities })(GeneralSearchBar);