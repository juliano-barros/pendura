import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { loginRequest } from '../../actions/home_actions';

class HomeIndex extends Component{

	componentDidMount(){

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
