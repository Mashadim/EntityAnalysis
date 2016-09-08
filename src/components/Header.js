import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

export class Header extends Component {
	renderHeaderOptions() {
		if(this.props.authenticated) {
			return (
				<li className='nav-item'>
					<Link className='nav-link header' to='/signout'>
						Sign out
					</Link>
				</li>
			)
		}else if(!this.props.authenticated) {
			return [
				<li className='nav-item header' key={1}>
					<Link className='nav-link' to='/signin'>
						Sign In
					</Link>
				</li>,
				<li className='nav-item header' key={2}>
					<Link className='nav-link' to='/signup'>
						Sign Up
					</Link>
				</li>,
				<li className='nav-item header' key={3}>
					<Link className='nav-link' to='/profile'>
						Start Extraction
					</Link>
				</li>
			]
		}
	};
	
	render() {
		return (
			<nav className='navbar navbar-light'>
				<Link to='/' className='navbar-brand'>
					Entity Analysis
				</Link>
				<ul className='nav navbar-nav'>
					{this.renderHeaderOptions()}
				</ul>
			</nav>
		);
	}
};

function mapStateToProps({ auth: { authenticated = ''} } = {}) {
	return { authenticated };
};

export default connect(mapStateToProps)(Header);