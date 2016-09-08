import React from 'react';
import { shallow } from 'enzyme';
import expect, { createSpy } from 'expect';
import { GeneralSearchBar } from '../../components/GeneralSearchBar';

function setup() {
	const props = {
		handleFormSubmit: () => {},
		handleInputChange: () => {},
		dbFetchEntities: () => {}
	};
	
	const wrapper = shallow(
		<GeneralSearchBar {...props} onSubmit={props.handleFormSubmit} onChange={props.handleInputChange}/>
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
		expect(wrapper.find('form').hasClass('input-group')).toEqual(true);
		expect(wrapper.find('form').prop('onSubmit')).toBeA('function');
		expect(wrapper.find('form').find('input').length).toEqual(1);
		expect(wrapper.find('form').find('span').length).toEqual(1);
		expect(wrapper.find('form').find('span').find('button').length).toEqual(1);
		expect(wrapper.find('input').hasClass('form-control form-control-lg input-form')).toEqual(1);
		expect(wrapper.find('input').prop('value')).toBe('');
		expect(wrapper.find('input').prop('onChange')).toBeA('function');
		expect(wrapper.find('input').prop('placeholder')).toBe('Enter text or a URL~!');
		expect(wrapper.find('span').hasClass('input-group-btn')).toEqual(true);
		expect(wrapper.find('button').hasClass('btn btn-secondary btn-lg input-btn')).toEqual(true);
		expect(wrapper.find('button').prop('type')).toBe('submit');
		expect(wrapper.find('button').text()).toBe('Extract Entities');
	});
		
});