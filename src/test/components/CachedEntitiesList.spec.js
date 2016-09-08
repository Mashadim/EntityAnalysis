import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { CachedEntitiesList } from '../../components/CachedEntitiesList';
import Entities from '../../components/Entities';
import EntitiesText from '../../components/EntitiesText';

function setup() {
	const props = {
		cachedMatchingArticles: []
	};

	const wrapper = shallow(
		<CachedEntitiesList {...props} />
	)

	return {
		props,
		wrapper
	};
}

describe('CachedEntitiesList', () => {
	let props;
	let wrapper;
	
	beforeEach(() => {
		( { props, wrapper } = setup() )
	});
		
	it('should render self and subcomponents', () => {
		expect(wrapper.length).toEqual(1);
		expect(wrapper.find('div').length).toEqual(1);	
	});
		
	it('should render render correct number of Entities', () => {
		const testProps ={
			cachedMatchingArticles: [{}, {}, {}]
		};
		
		const testWrapper = shallow(
			<CachedEntitiesList {...Object.assign({}, props, testProps)} />
		)
	
		expect(testWrapper.find('div').length).toEqual(4);
		expect(testWrapper.find(Entities).length).toEqual(3);
		expect(testWrapper.find(EntitiesText).length).toEqual(3);
		expect(testWrapper.find(EntitiesText).length).toNotEqual(7);
	});
		
});

