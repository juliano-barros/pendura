import React, { Component } from 'react';

class Layout_full_header extends Component {
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
					              		<span className="hidden-xs">Alexander Pierce</span>
					            	</a>
					            	<ul className="dropdown-menu">
					              		<li className="user-header">
					                		<img src="/plugins/dist/img/user2-160x160.jpg" className="img-circle" alt="User Image" />

					                		<p>
					                  			Alexander Pierce - Web Developer
					                  			<small>Member since Nov. 2012</small>
					                		</p>
					              		</li>
					              		<li className="user-body">
					                		<div className="row">
					                  			<div className="col-xs-4 text-center">
					                    			<a href="#">Followers</a>
					                  			</div>
					                  			<div className="col-xs-4 text-center">
					                    			<a href="#">Sales</a>
					                  			</div>
				                  				<div className="col-xs-4 text-center">
				                    				<a href="#">Friends</a>
				                  				</div>
				                			</div>
					              		</li>
					              		<li className="user-footer">
					                		<div className="pull-left">
					                  			<a href="#" className="btn btn-default btn-flat">Profile</a>
					                		</div>
					                		<div className="pull-right">
					                  			<a href="#" className="btn btn-default btn-flat">Sign out</a>
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


export default Layout_full_header;