import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react/lib/shallowCompare';
import { connect } from 'react-redux';
import GeneralSearchBar from './GeneralSearchBar';
import CachedSearchBar from './CachedSearchBar';
import EntitiesList from './EntitiesList';
import CachedEntitiesList from './CachedEntitiesList';
import CachedSearchList from './CachedSearchList';
import '../../client/styles.css';

export class EntitiesMain extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	};
	
	render() {
		const { cachedMatchingArticles, ifNoResultsFound } = this.props;
		let renderView = cachedMatchingArticles.length ? <CachedEntitiesList /> : <EntitiesList />;
		let checkResults = (ifNoResultsFound === '') ? renderView : (
			<div className='text-xs-right error'> { ifNoResultsFound } </div>
		)
		
		return (
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-xs-12 col-sm-3'>
						<CachedSearchList />
					</div><br /><br />
					<div className='col-xs-12 col-sm-9'>
						<div className='row'>
							<div className='col-xs-12 col-sm-7'>
								<GeneralSearchBar />
							</div>
							<div className='col-xs-12 col-sm-5'>
								<CachedSearchBar />
							</div>
						</div><br />
						{ checkResults }
					</div>
				</div>
			</div>
		)
	}
};

EntitiesMain.propTypes = {
	cachedMatchingArticles: React.PropTypes.array.isRequired,
	ifNoResultsFound: React.PropTypes.string.isRequired
};

function mapStateToProps({ entity:{ cachedMatchingArticles = [], ifNoResultsFound = '' }, auth: { authenticated = false } } = {}) {
	return { 
		cachedMatchingArticles,
		ifNoResultsFound,
		authenticated
	};
};
		
export default connect(mapStateToProps)(EntitiesMain);