import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import shallowCompare from 'react/lib/shallowCompare';
import { dbFetchEntities } from '../redux/actions/actions';

export class CachedSearchList extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	};
	
	checkStringLength(string) {
		if(string.length > 20) {
    	string = string.substring(0,19)+"...";
		}
		return string;
	}
	
	renderCachedSearch(cachedSearch) {
		return cachedSearch.map((search, index) => {
			let stringConfig = this.checkStringLength(search);
			return (
				<li 
					key={index+1} 
					className='cachedSearch-text'
					onClick={() => this.props.dbFetchEntities(search, true)}> 
					<em> {stringConfig} </em>
					<hr />
				</li>
			)
		});
	}
	
	render() {
		const { cachedSearch } = this.props;
		
		return(
			<div className='cachedSearch-div text-center'>
				<div className='general-font cachedSearch-heading'> 
					<strong> Previous Searches </strong>
				<hr />
				</div>
					<ul className='cachedSearch-ul list-unstyled general-font'>
						{ 
							cachedSearch.length ? this.renderCachedSearch(cachedSearch) : <em>'None yet...'</em> 
						}
					</ul>
			</div>
		)
	};
};

CachedSearchList.propTypes = {
	cachedSearch: React.PropTypes.array.isRequired
}

function mapStateToProps({ entity: { cachedSearch = [] }} = {}) {
	return { cachedSearch }
};

export default connect(mapStateToProps, { dbFetchEntities })(CachedSearchList);