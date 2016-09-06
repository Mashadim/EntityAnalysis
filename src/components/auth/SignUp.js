import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { signUpUser } from '../../redux/actions/actions';

class Signup extends Component {
	handleSubmit(formProps) {
		this.props.signUpUser(formProps);
	}
	
	renderAlert() {
		if(this.props.errorMessage) {
			return(
				<div className='alert alert-danger'>
					<strong>Oops!</strong> 
					{this.props.errorMessage}
				</div>
			)
		}
	};
	
	render() {
		const { handleSubmit, fields: { username, email, password, passwordConfirm } } = this.props;
		return (
			<form className='signup m-x-auto' onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
				<fieldset className='form-group'>
					<input className='form-control form-control-lg' type='text' placeholder='Username' {...username} />
				{
					username.touched && username.error && <div className='alert alert-danger'>{username.error}</div>
				}
				</fieldset>
				<fieldset className='form-group'>
					<input className='form-control form-control-lg' type='email' placeholder='Email' {...email} />
				{
					email.touched && email.error && <div className='alert alert-danger'>{email.error}</div>
				}
				</fieldset>
				<fieldset className='form-group'>
					<input className='form-control form-control-lg' type='password' placeholder='Password' {...password} />
				{
					password.touched && password.error && <div className='alert alert-danger'>{password.error}</div>
				}
				</fieldset>
				<fieldset className='form-group'>
					<input className='form-control form-control-lg' type='password' placeholder='Confirm Password' {...passwordConfirm} />
				{
					passwordConfirm.touched && passwordConfirm.error && <div className='alert alert-danger'>{passwordConfirm.error}</div>
				}
				</fieldset>
				{this.renderAlert()}
				<div className='text-sm-center'>
					<button action='submit' className='btn btn-primary btn-lg btn-sign' >
					Sign Up 
					</button>
				</div>
			</form>
		)
	}
};

function validate(formProps) {
	const errors = {};
	
	for(var prop in formProps) {
		if(prop !== 'passwordConfirm' && !formProps[prop]) {
			errors[prop] = `Please enter ${prop}`;
		}else if(prop === 'passwordConfirm' && !formProps[prop]) {
			errors[prop] = 'Please enter a password confirmation';
		}
	}
	
	if(formProps.password !== formProps.passwordConfirm) {
		errors.password = "Must have matching passwords."
	}
	
	return errors;
}

function mapStateToProps({ auth: { errorMessage = '' } = {}}) {
	return { errorMessage };
};

export default reduxForm({
	form: 'signup',
	fields: ['username', 'email', 'password', 'passwordConfirm'],
	validate
}, mapStateToProps, { signUpUser })(Signup);