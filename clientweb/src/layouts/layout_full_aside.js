import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PATHS } from '../containers/routes';
import {logout} from '../actions/login_actions';

class LayoutFullAside extends Component {

	render() {
		return (
			<div>
				
			  	<aside className="main-sidebar">
				    <section className="sidebar">
					    <div className="user-panel">
			        		<div className="pull-left image">
				          		<img src={this.props.profile.picture} className="img-circle" alt="..." />
			        		</div>
			        		<div className="pull-left info">
			          			<p>{this.props.profile.name}</p>
			        		</div>
		      			</div>
			      		<ul className="sidebar-menu" data-widget="tree">
			        		<li className="header">MAIN NAVIGATION</li>
			        		<li className="treeview">
			          			<Link to="" >
				            		<i className="fa fa-database"></i> <span>Tabelas</span>
				            		<span className="pull-right-container">
			              				<i className="fa fa-angle-left pull-right"></i>
			            			</span>
			          			</Link>
			          			<ul className="treeview-menu">
			          				<li>
					          			<Link to={PATHS.product} >
					          				<i className="fa fa-industry"></i> Produtos
					          			</Link>
					          		</li>
				          		</ul>
			        		</li>
			        		<li className="treeview">
			          			<Link to="" >
				            		<i className="fa fa-group"></i> <span>Friends</span>
				            		<span className="pull-right-container">
			              				<i className="fa fa-angle-left pull-right"></i>
			            			</span>
			          			</Link>
			          			<ul className="treeview-menu">
			          				<li>
					          			<Link to={PATHS.friends} >
					          				<i className="fa fa-group"></i> Solicitação de amizade
					          			</Link>
					          		</li>
			          			</ul>
			        		</li>
			        		<li className="treeview">
			          			<Link to={PATHS.register} >
				            		<i className="fa fa-user-md"></i> <span>Usuário</span>
				            		<span className="pull-right-container">
			              				<i className="fa fa-angle-left pull-right"></i>
			            			</span>
			          			</Link>
			          			<ul className="treeview-menu">
			          				<li>
					          			<Link to={PATHS.profile} >
					          				<i className="fa fa-user-md"></i> Profile
					          			</Link>
					          		</li>
			          				<li>
					          			<Link to={PATHS.register} >
					          				<i className="fa fa-user-plus"></i> Registar novo usuário
					          			</Link>
					          		</li>
			          				<li>
					          			<Link to="/" onClick={this.props.logout} >
					          				<i className="fa fa-circle-o"></i> Logout
					          			</Link>
					          		</li>
			          			</ul>
			        		</li>
			      		</ul>
			    	</section>
			  	</aside>
			</div>
		);
	}
}

function mapStateToProps({profile}){
	return {profile}
}

export default connect(mapStateToProps,{logout})(LayoutFullAside);