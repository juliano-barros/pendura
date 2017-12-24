import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Layout_full_aside extends Component {
	componentDidMount(){
	}
	render() {
		return (
			<div>
				
			  	<aside className="main-sidebar">
				    <section className="sidebar">
					    <div className="user-panel">
			        		<div className="pull-left image">
				          		<img src="/plugins/dist/img/user2-160x160.jpg" className="img-circle" alt="User Image" />
			        		</div>
			        		<div className="pull-left info">
			          			<p>Alexander Pierce</p>
			          			<a href="#"><i className="fa fa-circle text-success"></i> Online</a>
			        		</div>
		      			</div>
			      		<ul className="sidebar-menu" data-widget="tree">
			        		<li className="header">MAIN NAVIGATION</li>
			        		<li className="treeview">
			          			<Link to="/user/register" >
				            		<i className="fa fa-dashboard"></i> <span>Dashboard</span>
				            		<span className="pull-right-container">
			              				<i className="fa fa-angle-left pull-right"></i>
			            			</span>
			          			</Link>
			          			<ul className="treeview-menu">
			          				<li>
					          			<Link to="/user/register" >
					          				<i className="fa fa-circle-o"></i> DashBoard v1
					          			</Link>
					          		</li>
			          				<li>
					          			<Link to="/user/register" >
					          				<i className="fa fa-circle-o"></i> Dashboard v2
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

