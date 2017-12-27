import React, { Component } from 'react';

import { Route } from 'react-router-dom';

import RegisterIndex from '../components/register/register_index';
import LoginIndex from '../components/login/login_index';

class Layout_blank extends Component{

	render(){
		return (
			<div className="register-box">
		      	<Route path="/user/login" component={LoginIndex} />
	    	  	<Route path="/user/register" component={RegisterIndex} />
			</div>
		)
	}

}

export default Layout_blank;