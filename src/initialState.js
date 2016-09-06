const initialState = {
	entity: {
		entities: {},
		entitiesText: '',
		searchInput: '',
		cachedMatchingArticles: [],
		ifNoResultsFound: '',
		cachedSearch: []
	},
	auth: {
		authenticated: false,
		errorMessage: ''
	}
};

export default initialState;