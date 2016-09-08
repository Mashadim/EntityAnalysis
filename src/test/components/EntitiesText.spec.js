import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { EntitiesText } from '../../components/EntitiesText';

function setup() {
	const props = {
		entitiesText: 'some text',
		articleText: '',
		searchInput: ''
	};
	
	const wrapper = shallow(
		<EntitiesText {...props} />
	)
	
	return {
		props,
		wrapper
	};
};

describe('EntitiesText', () => {
	let props;
	let wrapper;
	
	beforeEach(() => {
		( { props, wrapper } = setup() )
	});
	
	it('should render self and subcomponents', () => {
		expect(wrapper.length).toEqual(1);
		expect(wrapper.find('table').length).toEqual(1);	
		expect(wrapper.find('table').hasClass('table table-text-table table-bordered table-responsive')).toEqual(true);	
		expect(wrapper.find('table').find('thead').length).toEqual(1);
		expect(wrapper.find('table').find('thead').hasClass('table-header')).toEqual(true);
		expect(wrapper.find('table').find('thead').find('tr').length).toEqual(1);
		expect(wrapper.find('table').find('thead').find('tr').find('th').hasClass('text-xs-center')).toEqual(1);
		expect(wrapper.find('table').find('thead').find('tr').find('th').text()).toBe(' Preview Text ');
		expect(wrapper.find('table').find('tbody').find('tr').length).toEqual(1);
		expect(wrapper.find('table').find('tbody').find('tr').find('td').hasClass('table-text text-justify container')).toEqual(true);
		expect(wrapper.find('tr').at(1).find('td').text()).toBe(props.entitiesText);
		expect(wrapper.find('tr').at(1).find('td').text()).toNotBe(props.articleText);
	});
	
	it('should render articleText if entity searched exists and matching articles have text', () => {
		const testProps = {
			entitiesText: '',
			articleText: 'some other text',
			searchInput: 'Apple'
		};
	
		const testWrapper = shallow(
			<EntitiesText {...Object.assign({}, props, testProps)} />
		)
	
		expect(testWrapper.find('tr').at(1).find('td').text()).toNotBe(testProps.entitiesText);
		expect(testWrapper.find('tr').at(1).find('td').text()).toBe(testProps.articleText);
	});

	it('should render url to original text if search term was a url', () => {
		const testProps = {
			entitiesText: 'some text',
			articleText: '',
			searchInput: 'http://www.wsj.com/livecoverage/apple-iphone-event-september-2016'
		};
	
		const testWrapper = shallow(
			<EntitiesText {...Object.assign({}, props, testProps)} />
		)
	
		expect(testWrapper.find('tr').at(1).find('td').text()).toBe('some text...Continue reading.');
		expect(testWrapper.find('tr').at(1).find('td').find('a').prop('href')).toBe(testProps.searchInput);
	});

	it('should cut off any text longer than 987 characters', () => {
		const testProps2 = {
			entitiesText: 'The videogame industry’s most powerful companies are tearing up a decades-old playbook, releasing pricey new hardware more frequently to keep pace with fast-changing technology and a growing array of rivals. Sony Corp. and Microsoft Corp. typically come out with new versions of their PlayStation and Xbox consoles every six to seven years. Now, just three years after releasing powerful machines some thought could be the last of their kind, the pair are readying upgrades aimed at fans hungry for the latest technology, as well as gamers hoping to stay current on a budget. On Wednesday, Sony is expected to unveil a higher-end PlayStation 4 better equipped to handle virtual reality and ultra-high-definition graphics, known as 4K. It is also expected to show a slimmer, less-expensive version of the PS4 occupying living rooms today. The shift is critical to cultivating communities of gamers who not only buy software, but increasingly pay to access online-games networks, exclusive demos and other perks. Microsoft’s Xbox Live subscription service pulls in about $2 billion in revenue annually, while Sony’s PlayStation Plus generates about half that, analysts estimate. Losing such customers to rivals’ new hardware means losing out on that lucrative recurring revenue.Today’s consoles compete against increasingly sophisticated smartphones and tablets, high-end personal computers and versatile set-top boxes that can play games. To keep up, console makers are no longer waiting a half-decade or more to upgrade.',
			articleText: '',
			searchInput: 'http://www.wsj.com/articles/videogame-consoles-get-upgrades-more-often-1473176586?mod=WSJ_TechWSJD_moreTopStories'
		};
	
		const testWrapper2 = shallow(
			<EntitiesText {...Object.assign({}, props, testProps2)} />
		)
	
		expect(testWrapper2.find('tr').at(1).find('td').text()).toBe('The videogame industry’s most powerful companies are tearing up a decades-old playbook, releasing pricey new hardware more frequently to keep pace with fast-changing technology and a growing array of rivals. Sony Corp. and Microsoft Corp. typically come out with new versions of their PlayStation and Xbox consoles every six to seven years. Now, just three years after releasing powerful machines some thought could be the last of their kind, the pair are readying upgrades aimed at fans hungry for the latest technology, as well as gamers hoping to stay current on a budget. On Wednesday, Sony is expected to unveil a higher-end PlayStation 4 better equipped to handle virtual reality and ultra-high-definition graphics, known as 4K. It is also expected to show a slimmer, less-expensive version of the PS4 occupying living rooms today. The shift is critical to cultivating communities of gamers who not only buy software, but increasingly pay to access online-games networks, exclusiv...Continue reading.');
		expect(testWrapper2.find('tr').at(1).find('td').find('a').prop('href')).toBe(testProps2.searchInput);
	});
		
});