import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react/lib/shallowCompare';
import { connect } from 'react-redux';
import Entities from './Entities';
import EntitiesText from './EntitiesText';

export class CachedEntitiesList extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	};
	
	renderArticleList(articles) {
		return articles.map((article) => {
			return ( 
				<div key={article.searchInput}>
					<Entities articleEntities={article.entities} articleSearch={article.searchInput} />
					<EntitiesText articleText={article.entitiesText} />
				</div>
			)
		});
	};
	
	render() {
		const { cachedMatchingArticles } = this.props;
		
		return(
			<div>
				{this.renderArticleList(cachedMatchingArticles)}
			</div>
		)
	};
};

CachedEntitiesList.propTypes = {
	cachedMatchingArticles : React.PropTypes.array.isRequired
};

function mapStateToProps({ entity: { cachedMatchingArticles = [] }} = {}) {
	return { cachedMatchingArticles };
}

export default connect(mapStateToProps)(CachedEntitiesList);