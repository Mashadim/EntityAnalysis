import React, { Component } from 'react';
import { connect } from 'react-redux';
import shallowCompare from 'react/lib/shallowCompare';
import { fetchEntitiesCachedSearch } from '../redux/actions/actions';

class CachedSearchBar extends Component {
	constructor(props) {
		super(props);	
		
		this.state = {
			search: ''
		};	
		
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	};
	
	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	};
	
	handleFormSubmit(event) {
		event.preventDefault();
		this.props.fetchEntitiesCachedSearch(this.state.search);
		this.setState({ search: '' });
	};
	
	handleInputChange(event) {
		this.setState({ search: event.target.value });
	};
	
	render() {
		return (
			<form className='input-group cached-search-bar' 
				onSubmit={ this.handleFormSubmit }>
				<input 
					className='form-control input-group form-control-lg input-form'
					value={ this.state.search }
					onChange={ this.handleInputChange }
					placeholder='Enter entity~!' 
				/>
				<span className='input-group-btn' >
					<button className='btn btn-secondary btn-lg input-btn' type='submit'>
						Search Articles
					</ button>
				</span>
			</form>
		)
	};
};

export default connect(null, { fetchEntitiesCachedSearch })(CachedSearchBar);