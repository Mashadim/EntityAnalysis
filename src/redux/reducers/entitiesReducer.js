import update from 'react/lib/update';

import { CACHE_SEARCH, SEND_ENTITIES, RESET_CACHED_ARTICLES, RESET_ENTITIES, SEND_ARTICLES, NO_RESULTS } from '../actions/types';

export default function(state = {}, action) {
	switch(action.type) {
		case SEND_ENTITIES:
				return update(state, { entities: { $set: action.entities }, entitiesText: { $set: action.entitiesText }, searchInput: { $set: action.search } });
		case SEND_ARTICLES:
			return update(state, { cachedMatchingArticles: { $set: action.articles } });
		case CACHE_SEARCH:
			return update(state, { cachedSearch: { $push: [action.search] } });
		case RESET_CACHED_ARTICLES:
			return update(state, { cachedMatchingArticles: { $set: [] }, ifNoResultsFound: { $set: ''} });
		case RESET_ENTITIES:
			return update(state, { entities: { $set: {} }, entitiesText: { $set: '' }, searchInput: { $set: '' }, ifNoResultsFound: { $set: ''} });
		case NO_RESULTS:
			return update(state, { ifNoResultsFound: { $set: 'No matching results'}})
		default:
			return state;
	};
	
	return state;
};