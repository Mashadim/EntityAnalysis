import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react/lib/shallowCompare';
import { connect } from 'react-redux';
import Entities from './Entities';
import EntitiesText from './EntitiesText';

export class EntitiesList extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	};
	
	render() {
		const { entities, entitiesText } = this.props;
		
		let renderEntities = Object.keys(entities).length ? <Entities /> : null;
		let renderEntitiesText = entitiesText.length ? <EntitiesText /> : null;
		
		return(
			<div>
				{renderEntities}<br />
				{renderEntitiesText}
			</div>
		)
	};
};

EntitiesList.propTypes = {
	entities: React.PropTypes.object.isRequired,
	entitiesText: React.PropTypes.string.isRequired
};

function mapStateToProps({ entity: { entities = {}, entitiesText = '' }} = {}) {
	return { 
		entities, 
		entitiesText 
	};
};

export default connect(mapStateToProps)(EntitiesList);