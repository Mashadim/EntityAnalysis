import axios from 'axios';
import { browserHistory } from 'react-router';
import { checkStringLength } from './checkStringLength';
import { isWhatType } from './isWhatType';
import { CACHE_SEARCH, SEND_ENTITIES, RESET_CACHED_ARTICLES, RESET_ENTITIES, SEND_ARTICLES, NO_RESULTS, AUTH_USER } from './types';

const ROOT_URL = 'http://localhost:3000';

// Authentication actions:
export function signUpUser({ username, email, password }) {
	return function(dispatch){
		axios.post(`${ROOT_URL}/signup`, { username, email, password })
			.then(res => {
			console.log('back from signup!', res)
//				dispatch({ type: AUTH_USER })
//				localStorage.setItem('token', res.data.token);
//				browserHistory.push('/feature');
			})
			.catch((res) => {
			console.log('error', res)
//				console.log(res.data.error, res.data.errorMessage)
//				dispatch(authError(res.data.error))
			});
	}
};



// Entity actions:
// triggered when new input entered in cachedsearch input
export function fetchEntitiesCachedSearch(search) {
		return (dispatch) => {
			axios.get(`${ROOT_URL}/entities/dbmatch?search=${search}`)
				.then(res => {
					if(res.data.result === 'success') {
						dispatch(resetEntitiesAndEntitiesText());
						dispatch(sendArticles(res.data.articlesFound));
					}else {
						dispatch(noResults());
					}
				})
				.catch(err => {
					console.log(`action fetchEntitiesCachedSearch ${err}`)
				})
		};
};

// triggered on general search and cachedsearched click
// if in cachedSearch, that means it's in the database otherwise fetch from API
export function dbFetchEntities(search, triggerFromCachedSearch) {
	let inputType;
	
	if(!triggerFromCachedSearch) {
		inputType = isWhatType(search);
	};
	
	return (dispatch, getState) => {
		const cachedSearch = getState().entity.cachedSearch;
		
		if(triggerFromCachedSearch || cachedSearch.indexOf(search) !== -1) {
			axios.get(`${ROOT_URL}/entities/db?search=${search}`) 
				.then(res => {
					if(res.data.result === 'success') {
						dispatch(resetCachedMatchingArticles());
						dispatch(sendEntities(res.data.entities, res.data.entitiesText, search));
					};
				})
				.catch(err => console.log(err));
		}else {
			dispatch(fetchEntities(search, inputType));
		};
	};
};

// fetch from API
export function fetchEntities(search, inputType) {
	return (dispatch) => {		
		axios.get(`${ROOT_URL}/entities/api?${inputType}=${search}`)
			.then(res => {
				dispatch(resetCachedMatchingArticles())
				dispatch(sendEntities(res.data.entities, res.data.text, search));
				dispatch(cacheSearch(search)); // save to previous searches
				dispatch(dbSaveEntities(search, res)) // save to postgreSQL db
			})
			.catch(err => console.log(`axios GET request: ${err}`))
	};
};

// save entities to db
export function dbSaveEntities(search, entitiesData) {
	const entities = entitiesData.data.entities;
	const entitiesText = checkStringLength(entitiesData.data.text).replace(/\n/g,'');
				
		return (dispatch) => {
			axios.post(`${ROOT_URL}/dbsave`, {
				search,
				entities,
				entitiesText
			})
				.then(res => {
					console.log(`Saved in database ${res.data.result}fully!`);
				})
				.catch(err => console.log('dbSaveEntitiesForNormalSearch:',err));
		};
};

export function sendArticles(articles) {
	return {
		type: SEND_ARTICLES,
		articles
	};
};


export function sendEntities(entities, entitiesText, search) {
	return {
		type: SEND_ENTITIES,
		entities,
		entitiesText,
		search
	};
};

export function cacheSearch(search) {
	return {
		type: CACHE_SEARCH,
		search
	};
};

export function resetCachedMatchingArticles() {
	return {
		type: RESET_CACHED_ARTICLES
	};
};

export function resetEntitiesAndEntitiesText() {
	return {
		type: RESET_ENTITIES
	};
};

export function noResults() {
	return {
		type: NO_RESULTS
	}
}