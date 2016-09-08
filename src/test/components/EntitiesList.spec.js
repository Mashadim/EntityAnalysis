import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { EntitiesList } from '../../components/EntitiesList';
import Entities from '../../components/Entities';
import EntitiesText from '../../components/EntitiesText';

function setup() {
	const props = {
		entities: {date: ['Monday', 'Tuesday'], organization: ['Apple', 'DonutNation', 'Ninja Turtle Co.']},
		entitiesText: 'some text from url'
	};
	
	const wrapper = shallow(
		<EntitiesList {...props} />
	)
	
	return {
		props,
		wrapper
	};
};

describe('EntitiesList', () => {
	let props;
	let wrapper;
	
	beforeEach(() => {
		( { props, wrapper } = setup() )
	});
	
	it('should render self and subcomponents', () => {
		expect(wrapper.length).toEqual(1);
		expect(wrapper.find('div').length).toEqual(1);	
		expect(wrapper.find(Entities).length).toEqual(1);	
		expect(wrapper.find(EntitiesText).length).toEqual(1);	
	});
	
	it('should not render Entities and/or EntitiesText if props are empty', () => {
		const testProps = {
			entities: {date: ['Monday', 'Tuesday'], organization: ['Apple', 'DonutNation', 'Ninja Turtle Co.']},
			entitiesText: ''
		};
	
		const testWrapper = shallow(
			<EntitiesList {...Object.assign({}, props, testProps)} />
		)
	
		const testProps2 = {
			entities: {},
			entitiesText: 'some text from url'
		};
	
		const testWrapper2 = shallow(
			<EntitiesList {...Object.assign({}, props, testProps2)} />
		)
	
		expect(testWrapper.find(Entities).length).toEqual(1);	
		expect(testWrapper.find(EntitiesText).length).toEqual(0);

		expect(testWrapper2.find(Entities).length).toEqual(0);	
		expect(testWrapper2.find(EntitiesText).length).toEqual(1);

	});
		
});