import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react/lib/shallowCompare';
import { connect } from 'react-redux';

class Entities extends Component {	
	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	};
	
	renderRows(entities) {
		return Object.keys(entities).map((entity) => {
			const entityValues = entities[entity].join(', ');
			return(
				<tr key={entity}>
					<td> <strong> {entity} </strong> </td>
					<td> {entityValues} </td>
				</tr>
			)
		});
	};
	
	render() {
		const { entities, articleEntities, articleSearch } = this.props;
		let renderPreviousSearch = articleSearch ? ( 
			<strong> Search: { articleSearch } </strong> 
			) : null;
		
		return(
			<div>
				{ renderPreviousSearch }
				<table 
					className='table table-entities table-bordered table-hover'>
					<thead className='table-header'>
						<tr>
							<th className='text-xs-center'> Entity </th>
							<th className='text-xs-center'> Data </th>
						</tr>
					</thead>
					<tbody>
						{ articleEntities ? this.renderRows(articleEntities) : this.renderRows(entities) }
					</tbody>
				</table>
			</div>
		)
	};
};

Entities.propTypes = {
	entities: React.PropTypes.object,
	articleEntities: React.PropTypes.object,
	articleSearch: React.PropTypes.string
}

function mapStateToProps({ entities = {} } = {}) {
	return { entities };
};

export default connect(mapStateToProps)(Entities);