import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Link } from 'react-router-dom';
import { registerRequest, cleanRequestMessages } from '../../actions/register_actions';
import { loginRequest } from '../../actions/login_actions';
import Functions from '../../util/functions';
import _ from 'lodash';
        
class RegisterIndex extends Component {

 	renderRegisterLogo(){
 		return (
 			<div className="register-logo">
 				<Link to="/home">
 					<b>Pendura</b>
 				</Link>
  			</div>
  		)
 	}

 	renderField(field){

	    const { meta: { touched, error } } = field;
	    const className=`form-group ${ touched && error ? 'has-danger' : ''} has-feedback`;

 		return( 
  		    <div className={className}>
  		    	<input className="form-control" type={field.type} placeholder={field.placeholder} {...field.input} />
  		    	<span className={field.classNameSpan}></span>
        		<div className ="text-help">
          			{ touched ? error : '' }
        		</div>
  		    </div>
		);

 	}

 	onSubmit(values){
 		this.props.registerRequest(values)
 	}

 	onLogin(values){
 		this.props.loginRequest(values)
 	}

 	componentDidUpdate(){

 		if ( this.props.register.success ){
 			this.onLogin( this.props.fieldsForm )
 		}

 		if ( this.props.login.success_login ){
 			this.props.history.push('/home');
 		}

 	}

 	onClickDismiss(){
 		this.props.cleanRequestMessages();
 	}

 	renderMessages(){
 		const {messages} = this.props.register;
 		console.log(messages);
 		if ( messages && ( messages.length > 0 ) ){
 			var contentAux;
	 		const content = 
	 			messages.map((element)=>{
 					const valuesArray =  Object.values(element);
 					contentAux = valuesArray.map((elementMessage)=>
			 			<div key={elementMessage[0]}> 
			 				{elementMessage[0]} 
			 			</div>
	 					
				)
			});

			return (
	  	    	    <div>
		  	    	    <div className="alert alert-danger alert-dismissible" onClick={this.onClickDismiss.bind(this)}>
		                	<button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
		                	<h4><i className="icon fa fa-ban"></i> Alert!</h4>
								{contentAux}
		            	</div>
		            </div>
 				)
 		}
 	}

	render() {

		const {handleSubmit} = this.props;

		return (
			<div className="register-box">
				
    			{this.renderMessages()}
    			{this.renderRegisterLogo()}

				<div className="register-box-body">
					<p className="login-box-msg">Registrar um novo membro</p>
					<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
			          <Field
			            name="name"
			            component ={this.renderField}
			            type="text"
			            placeholder="Nome"
			            classNameSpan = "glyphicon glyphicon-user form-control-feedback"
			          />
			          <Field
			            name="email"
			            component ={this.renderField}
			            placeholder="Email"
			            type="email"
			            classNameSpan = "lyphicon glyphicon-envelope form-control-feedback"
			          />
			          <Field
			            name="password"
			            component ={this.renderField}
			            placeholder="Password"
			            type="password"
			            classNameSpan = "glyphicon glyphicon-lock form-control-feedback"
			          />
			          <Field
			            name="password_retype"
			            component ={this.renderField}
			            placeholder="Password"
			            type="password"
			            classNameSpan = "glyphicon glyphicon-lock form-control-feedback"
			          />

			          <button type="submit" className="btn btn-primary pull-right">Register</button>

					</form>
				</div>

			</div>
		);
	}
}

function validate(values){

      const errors={};

      if (!values.name){
        errors.name = "Nome não informado";
      }

      if (!values.email){
        errors.email = "E-mail não informado";
      }else if(!Functions.isEmailValid(values.email)) {
      	errors.email = 'E-mail inválido';
      }

      if (!values.password){
        errors.password = "Senha não informada";
      }

      if (!values.password_retype){
        errors.password_retype = "Senha para comparação não informada";
      }else if (values.password_retype!= values.password){
        errors.password_retype = "Senhas não conferem";
      }

      // if errors is empty, the form is fine to submit
      return errors;

}

function mapStateToProps(state){
	const selector = formValueSelector( 'RegisterIndexForm');
	return {register: state.register, login: state.login, fieldsForm: { email: selector(state, 'email'), password: selector(state, 'password')}};
}

export default reduxForm({
  validate,
  form: 'RegisterIndexForm'
})(
  connect(mapStateToProps,{registerRequest, loginRequest, cleanRequestMessages})(RegisterIndex)
);
