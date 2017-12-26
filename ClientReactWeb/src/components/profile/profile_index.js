import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { profileRequest } from '../../actions/profile_actions';

class ProfileIndex extends Component {

	onSubmit(values){
		console.log(values);

	}

 	renderField(field){

	    const { meta: { touched, error } } = field;
	    const className=`form-group ${ touched && error ? 'has-error' : ''} has-feedback`;

 		return( 
  		    <div className={className}>
                  <label >{field.placeholder}</label>
  		    	<input className="form-control" type={field.type} {...field.input} />
        		<div className ="help-block">
          			{ touched ? error : '' }
        		</div>
  		    </div>
		);

 	}


 	componentDidMount(){
 	}

	render(){
		const {handleSubmit} = this.props;
		return (

			<div>
			    <section className="content-header">
			      <h1>
			        Profile
			        <small>Profile</small>
			      </h1>
			      <ol className="breadcrumb">
			        <li><i className="fa fa-dashboard"></i> profile</li>
			        <li className="active">profile</li>
			      </ol>
			    </section>
				<div className="row">
					<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
						<div className="col-sm-6">
						</div>
						<div className="col-sm-6">
				          	<Field
			            	  name="name"
				              component ={this.renderField}
				              type="text"
				              placeholder="Nome"
				            />
				          	<Field
			            	  name="email"
				              component ={this.renderField}
				              type="text"
				              placeholder="E-mail"
				            />
						</div>
			            <button type="submit" className="btn btn-primary pull-right"> Salvar </button>
					</form>
				</div>
			</div>

		)
	}
}

function mapStateToProps({profile}){
	console.log( profile)
	return { profile, initialValues: {name: 'teste'} };	
}

function validate(values){

	const errors ={};

	return errors;
}

ProfileIndex =  connect(mapStateToProps, {profileRequest})(ProfileIndex)

export default reduxForm({	
	validate, 
	form: 'profile_form_index'
})(ProfileIndex) 

