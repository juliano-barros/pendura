import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadToken } from '../../actions/login_actions';

class HomeIndex extends Component{
	componentWillMount(){
		this.props.loadToken()
	}

	renderUser(){
		if ( this.props.profile.name){
			return(
				<div>
					Bem vindo {this.props.profile.name}
				</div>
			)
		}else{
			return '';
		}
	}

	render(){
		return (
				<div>

				    <section className="content-header">
				      <h1>
				        Home
				        <small>Control panel</small>
				      </h1>
				      <ol className="breadcrumb">
				        <li><i className="fa fa-dashboard"></i> Home</li>
				        <li className="active">Home</li>
				      </ol>
				    </section>
			      	<div className="row">
			        	<div className="col-lg-3 col-xs-6">
			          		<div className="small-box bg-aqua">
			            		<div className="inner">
			              			<h3>Comming</h3>
					              	{this.renderUser()}
			            		</div>
			            		<div className="icon">
			              			<i className="ion ion-bag"></i>
			            		</div>
			            		<a href="#" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
			          		</div>
			        	</div>
			        </div>
				</div>
			);
	}

}

function mapStateToProps({profile}){
	return { profile };
}

export default connect(mapStateToProps, {loadToken})(HomeIndex);
