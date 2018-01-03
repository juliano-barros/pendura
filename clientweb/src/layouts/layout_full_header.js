import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {logout} from '../actions/login_actions';
import {profileRequest} from '../actions/profile_actions';
import { PATHS } from '../components/routes';

class LayoutFullHeader extends Component {

	componentDidMount(){
		this.props.profileRequest();
	}

	goProfile(){
		this.props.history.push(PATHS.profile)
	}


	render() {
		return (
			<div>
			  	<header className="main-header">

			    	<Link to="/home" className="logo">
			      		<span className="logo-mini"><b>P</b>en</span>
			      		<span className="logo-lg"><b>Pendura</b></span>
			    	</Link>
			    	<nav className="navbar navbar-static-top">
				      	<a className="sidebar-toggle" data-toggle="push-menu" role="button">
				        	<span className="sr-only">Toggle navigation</span>
				        	<span className="icon-bar"></span>
				        	<span className="icon-bar"></span>
				        	<span className="icon-bar"></span>
				      	</a>

				      	<div className="navbar-custom-menu">
				        	<ul className="nav navbar-nav">
					          	<li className="dropdown user user-menu">
					            	<a className="dropdown-toggle" data-toggle="dropdown">
					              		<img src={this.props.profile.picture} className="user-image" alt="User" />
					              		<span className="hidden-xs">{this.props.profile.name}</span>
					            	</a>
					            	<ul className="dropdown-menu">
					              		<li className="user-header">
					                		<img src={this.props.profile.picture} className="img-circle" alt="User" />

					                		<p>
					                  			{this.props.profile.name}
					                  			<small>Member since Nov. 2012</small>
					                		</p>
					              		</li>
					              		<li className="user-footer">
				                			<Link to={PATHS.profile} type="button" className="btn btn-default btn-flat">
				                				Profile
				                			</Link>
					                		<div className="pull-right">
					                			<button type="button" onClick={this.props.logout} className="btn btn-default btn-flat">
					                				Sair
					                			</button>
					                		</div>
					              		</li>
					            	</ul>
					          	</li>
				        	</ul>
				      	</div>
				    </nav>
		 	 	</header>
			</div>
		);
	}
}

function mapStateToProps({profile}){
	return { profile }
};

export default connect(mapStateToProps, {logout,profileRequest})(LayoutFullHeader);