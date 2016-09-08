import React from 'react';
import { shallow } from 'enzyme';
import expect, { createSpy } from 'expect';
import { CachedSearchList } from '../../components/CachedSearchList';

function setup() {
	const props = {
		cachedSearch: [],
		dbFetchEntities: expect.createSpy()
	};
	
	const wrapper = shallow(
		<CachedSearchList {...props} onClick={() => this.props.dbFetchEntities(search, true)} />
	)
	
	return {
		props,
		wrapper
	};
}

describe('CachedSearchList', () => {
	let props;
	let wrapper;
	
	beforeEach(() => {
		( { props, wrapper } = setup() )
	});
	
	it('should render self and subcomponents', () => {
		expect(wrapper.length).toEqual(1);
		expect(wrapper.find('div').length).toEqual(2);	
		expect(wrapper.find('div').at(0).hasClass('cachedSearch-div text-center')).toEqual(true);	
		expect(wrapper.find('div').at(1).hasClass('general-font cachedSearch-heading')).toEqual(true);	
		expect(wrapper.find('div').at(1).text()).toEqual(' Previous Searches ');	
		expect(wrapper.find('hr').length).toEqual(1);	
		expect(wrapper.find('ul').length).toEqual(1);	
		expect(wrapper.find('ul').hasClass('cachedSearch-ul list-unstyled general-font')).toEqual(true);	
		expect(wrapper.find('ul').text()).toBe('\'None yet...\'');	
	});
	
	it('should render all the previous searches', () => {
		const testProps = {
			cachedSearch: ['one search', 'some website', 'some text', 'somesome', 'another website'],
			dbFetchEntities: () => {}
		}
	
		const testWrapper = shallow(
			<CachedSearchList {...Object.assign({}, props, testProps)} />
		)
	
		expect(testWrapper.find('ul').find('li').length).toEqual(5);
		expect(testWrapper.find('ul').find('li').at(0).hasClass('cachedSearch-text')).toEqual(true);
	});

	it('should cut of search input longer than 20 characters at add elipses', () => {
		const testProps2 = {
			cachedSearch: ['one search', 'http://www.wsj.com/articles/videogame-consoles-get-upgrades-more-often-1473176586?mod=WSJ_TechWSJD_moreTopStories', 'some text', 'somesome', 'another website'],
			dbFetchEntities: () => {}
		};
	
		const testWrapper2 = shallow(
			<CachedSearchList {...Object.assign({}, props, testProps2)} />
		)
	
		expect(testWrapper2.find('ul').find('li').at(1).text()).toBe(' http://www.wsj.com/... ');
		expect(testWrapper2.find('ul').find('li').at(0).text()).toBe(' one search ');
	});
		
});