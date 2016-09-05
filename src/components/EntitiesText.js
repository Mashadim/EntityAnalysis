import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react/lib/shallowCompare';
import { connect } from 'react-redux';
import { isWhatType } from '../redux/actions/isWhatType';

class EntitiesText extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	};
	
	checkStringLength(string) {
		if(string.length > 987) {
    	string = `${string.substring(0,986)}`
		}
		return string;
	}
	
	render() {
		const { entitiesText, articleText, searchInput } = this.props;
		const whatTypeSearch = searchInput ? isWhatType(searchInput) : null;
		const renderLink = (whatTypeSearch === 'url') ? <a href={searchInput} target='_blank'>...Continue reading.</a> : null;
		
		return(
			<table 
				className='table table-text-table table-bordered table-responsive'>
				<thead className='table-header'>
					<tr>
						<th className='text-xs-center'> Preview Text </th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className='table-text text-justify container'> 
							{ articleText ? this.checkStringLength(articleText) : this.checkStringLength(entitiesText) }{ renderLink }
						</td>
					</tr>
				</tbody>
			</table>
		)
	};
};

EntitiesText.propTypes = {
	entitiesText: React.PropTypes.string,
	articleText: React.PropTypes.string,
	searchInput: React.PropTypes.string
};

function mapStateToProps({ entitiesText = '', searchInput= '' } = {}) {
	return { 
		entitiesText,
		searchInput 
	};
};

export default connect(mapStateToProps)(EntitiesText);