import React from 'react';
import { shallow } from 'enzyme';
import expect, { createSpy } from 'expect';
import { CachedSearchBar } from '../../components/CachedSearchBar';

function setup() {
	const props = {
		handleFormSubmit: () => {},
		handleInputChange: () => {},
		fetchEntitiesCachedSearch: expect.createSpy()
	};
	
	const wrapper = shallow(
		<CachedSearchBar {...props} onSubmit={props.handleFormSubmit.bind(this)} onChange={props.handleInputChange.bind(this)}/>
	)
	
	return {
		props,
		wrapper
	};
}

describe('CachedSearchBar', () => {
	let props;
	let wrapper;
	
	beforeEach(() => {
		( { props, wrapper } = setup() )
	});
		
	it('should render self and subcomponents', () => {
		expect(wrapper.length).toEqual(1);
		expect(wrapper.find('form').length).toEqual(1);
		expect(wrapper.find('form').hasClass('input-group cached-search-bar')).toEqual(true);
		expect(wrapper.find('form').prop('onSubmit')).toBeA('function');
		expect(wrapper.find('form').find('input').length).toEqual(1);
		expect(wrapper.find('form').find('span').length).toEqual(1);
		expect(wrapper.find('form').find('span').find('button').length).toEqual(1);
		expect(wrapper.find('input').hasClass('form-control input-group form-control-lg input-form')).toEqual(1);
		expect(wrapper.find('input').prop('value')).toBe('');
		expect(wrapper.find('input').prop('onChange')).toBeA('function');
		expect(wrapper.find('input').prop('placeholder')).toBe('Enter entity~!');
		expect(wrapper.find('span').hasClass('input-group-btn')).toEqual(true);
		expect(wrapper.find('button').hasClass('btn btn-secondary btn-lg input-btn')).toEqual(true);
		expect(wrapper.find('button').prop('type')).toBe('submit');
		expect(wrapper.find('button').text()).toBe('Search Articles');
	});
		
});