import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {logout} from '../actions/login_actions';
import {profileRequest} from '../actions/profile_actions';

class Layout_full_header extends Component {

	componentDidMount(){
		this.props.profileRequest();
	}


	render() {
		return (
			<div>
			  	<header className="main-header">
			    	<a href="../../index2.html" className="logo">
			      		<span className="logo-mini"><b>P</b>en</span>
			      		<span className="logo-lg"><b>Pendura</b></span>
			    	</a>
			    	<nav className="navbar navbar-static-top">
				      	<a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
				        	<span className="sr-only">Toggle navigation</span>
				        	<span className="icon-bar"></span>
				        	<span className="icon-bar"></span>
				        	<span className="icon-bar"></span>
				      	</a>

				      	<div className="navbar-custom-menu">
				        	<ul className="nav navbar-nav">
					          	<li className="dropdown user user-menu">
					            	<a href="#" className="dropdown-toggle" data-toggle="dropdown">
					              		<img src="/plugins/dist/img/user2-160x160.jpg" className="user-image" alt="User Image" />
					              		<span className="hidden-xs">{this.props.profile.name}</span>
					            	</a>
					            	<ul className="dropdown-menu">
					              		<li className="user-header">
					                		<img src="/plugins/dist/img/user2-160x160.jpg" className="img-circle" alt="User Image" />

					                		<p>
					                  			{this.props.profile.name}
					                  			<small>Member since Nov. 2012</small>
					                		</p>
					              		</li>
					              		<li className="user-footer">
				                			<Link to="/full/profile"   className="btn btn-default btn-flat">
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
					          	<li>
					            	<a href="#" data-toggle="control-sidebar"><i className="fa fa-gears"></i></a>
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

export default connect(mapStateToProps, {logout,profileRequest})(Layout_full_header);