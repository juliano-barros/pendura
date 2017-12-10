import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { loginRequest } from '../../actions/home_actions';


class HomeIndex extends Component{

	componentDidMount(){
		const {login} = this.props;
		if ( ( ! login.token ) || ( login.token == '' ) ){
			this.props.history.push('/login');
		}

	}

	renderUser(){
		if ( this.props.login.user){
			return(
				<div>
					Bem vindo  {this.props.login.user}
				</div>
			)
		}else{
			return '';
		}
	}

	render(){

		return (
				<div>
					Home index!
					{this.renderUser()}
				</div>
			);
	}

}

function mapStateToProps({login}){
	return { login };
}

export default connect(mapStateToProps)(HomeIndex);
