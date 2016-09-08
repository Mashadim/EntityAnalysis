import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { Entities } from '../../components/Entities';

function setup() {
	const props = {
		entities: {date: ['Monday', 'Tuesday'], organization: ['Apple', 'DonutNation', 'Ninja Turtle Co.']},
		articleEntities: undefined,
		articleSearch: undefined
	};
	
	const wrapper = shallow(
		<Entities {...props} />
	)
	
	return {
		props,
		wrapper
	};
};

describe('Entities', () => {
	let props;
	let wrapper;
	
	beforeEach(() => {
		( { props, wrapper } = setup() )
	});
	
	it('should render self and subcomponents', () => {
		expect(wrapper.length).toEqual(1);
		expect(wrapper.find('div').length).toEqual(1);	
		expect(wrapper.find('table').length).toEqual(1);	
		expect(wrapper.find('table').at(0).hasClass('table table-entities table-bordered table-hover')).toEqual(true);	
		expect(wrapper.find('table').find('thead').hasClass('table-header')).toEqual(true);
		expect(wrapper.find('table').find('thead').find('tr').length).toEqual(1);
		expect(wrapper.find('table').find('thead').find('tr').find('th').length).toEqual(2);
		expect(wrapper.find('table').find('thead').find('tr').find('th').at(0).hasClass('text-xs-center')).toEqual(true);
		expect(wrapper.find('th').at(0).text()).toBe(' Entity ');
		expect(wrapper.find('th').at(1).text()).toBe(' Entity Data ');
		expect(wrapper.find('table').find('tbody').length).toEqual(1);
		expect(wrapper.find('table').find('tbody').find('tr').length).toEqual(2);
		expect(wrapper.find('td').length).toEqual(4);
	});
	
	it('should render previously found articles instead of entities prop if they exist', () => {
		const testProps = {
			entities: {},
			articleEntities: {date: ['Monday', 'Tuesday'], organization: ['Apple', 'DonutNation', 'Ninja Turtle Co.'], people: ['Sandra', 'Kyle', 'Phil']},
			articleSearch: 'http://www.somewebsite.com'
		};
	
		const testWrapper = shallow(
			<Entities {...Object.assign({}, props, testProps)} />
		)
	
		const allText = testWrapper.find('div').text().split(' ');
	
		expect(allText[2]).toBe(testProps.articleSearch);
		expect(testWrapper.find('table').find('tbody').find('tr').length).toEqual(3);
		expect(testWrapper.find('td').length).toEqual(6);
	});
		
});