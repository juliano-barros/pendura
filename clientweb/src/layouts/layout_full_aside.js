import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PATHS, ROUTES } from '../containers/routes';
import {logout} from '../actions/login_actions';

class LayoutFullAside extends Component {


	renderItem(element, i){
		if ( element.children.length > 0){
			var active;
			
			element.children.map((elementChild, i)=>{
				if ( this.props.location.pathname.indexOf(elementChild.path) >= 0 ){
					active = true
				}
			})

			var classTreeView = '';
			if (active){
				classTreeView = 'active menu-open';
			}

			return (
					<li className={`treeview ${classTreeView}`} key={i}>
	          			<Link to="" >
		            		<i className={`fa ${element.icon}`}></i> <span>{element.name}</span>
		            		<span className="pull-right-container">
	              				<i className="fa fa-angle-left pull-right"></i>
	            			</span>
	          			</Link>
	          			<ul className="treeview-menu">
	          				{element.children.map((elementChild, i)=>{
	          					var classLi = '';
	          					if ( this.props.location.pathname.indexOf( elementChild.path ) >=0 ){
	          						classLi = 'active'
	          					}
		          				return( <li className={classLi} key={i}>
				          					<Link to={elementChild.path} >
				          						<i className={`fa ${elementChild.icon}`}></i> {elementChild.name}
				          					</Link>
				          				</li>
				          			)

	          				})}
	          			</ul>
					</li>
				)
		}
	}

	renderItens(arrayRoute){

		return (
      		<ul className="sidebar-menu" data-widget="tree">
	    		<li className="header">Pendura menu</li>
				{arrayRoute.map((element, i)=>{
					return this.renderItem(element, i);
				})}
      		</ul>
		)

	}


	render(){
		return(
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
		        		{this.renderItens(ROUTES)}
	 		      		
	 		    	</section>
	 		  	</aside>
	 		</div>
	 	)
	}

}

function mapStateToProps({profile}){
	return {profile}
}

export default connect(mapStateToProps,{logout})(LayoutFullAside);