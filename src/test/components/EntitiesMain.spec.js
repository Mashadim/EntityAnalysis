import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { EntitiesMain } from '../../components/EntitiesMain';
import GeneralSearchBar from '../../components/GeneralSearchBar';
import CachedSearchBar from '../../components/CachedSearchBar';
import EntitiesList from '../../components/EntitiesList';
import CachedEntitiesList from '../../components/CachedEntitiesList';
import CachedSearchList from '../../components/CachedSearchList';

function setup() {
	const props = {
		cachedMatchingArticles: [],
		ifNoResultsFound: ''
	};
	
	const wrapper = shallow(
		<EntitiesMain {...props} />
	)
	
	return {
		props,
		wrapper
	};
};

describe('EntitiesMain', () => {
	let props;
	let wrapper;
	
	beforeEach(() => {
		( { props, wrapper } = setup() )
	});
	
	it('should render self and subcomponents', () => {
		expect(wrapper.length).toEqual(1);
		expect(wrapper.find('div').length).toEqual(7);	
		expect(wrapper.find('div').at(0).hasClass('container-fluid')).toEqual(true);	
		expect(wrapper.find('div').at(1).hasClass('row')).toEqual(true);	
		expect(wrapper.find('div').at(2).hasClass('col-xs-12 col-sm-3')).toEqual(true);	
		expect(wrapper.find('div').at(3).hasClass('col-xs-12 col-sm-9')).toEqual(true);	
		expect(wrapper.find('div').at(4).hasClass('row')).toEqual(true);	
		expect(wrapper.find('div').at(5).hasClass('col-xs-12 col-sm-7')).toEqual(true);	
		expect(wrapper.find('div').at(6).hasClass('col-xs-12 col-sm-5')).toEqual(true);	
		expect(wrapper.find('div').at(2).find(CachedSearchList).length).toEqual(1);
		expect(wrapper.find('div').at(5).find(GeneralSearchBar).length).toEqual(1);
		expect(wrapper.find('div').at(6).find(CachedSearchBar).length).toEqual(1);
		expect(wrapper.find(EntitiesList).length).toEqual(1);	
		expect(wrapper.find(CachedEntitiesList).length).toEqual(0);	

	});
	
	it('should render CachedEntitiesList if database has articles matching entity search', () => {
		const testProps = {
			cachedMatchingArticles: [ {}, {} ],
			ifNoResultsFound: ''
		};
	
		const testWrapper = shallow(
			<EntitiesMain {...Object.assign({}, props, testProps)} />
		)
	
		expect(testWrapper.find(EntitiesList).length).toEqual(0);	
		expect(testWrapper.find(CachedEntitiesList).length).toEqual(1);	
	});

	it('if no results found, only error message should render instead of lists', () => {
		const testProps = {
			cachedMatchingArticles: [],
			ifNoResultsFound: 'No matching results'
		};
	
		const testWrapper = shallow(
			<EntitiesMain {...Object.assign({}, props, testProps)} />
		)
	
		expect(testWrapper.find(EntitiesList).length).toEqual(0);	
		expect(testWrapper.find(CachedEntitiesList).length).toEqual(0);
		expect(testWrapper.find('div').at(7).text()).toBe(' No matching results ');
	});
		
});