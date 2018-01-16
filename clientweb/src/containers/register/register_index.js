import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Link } from 'react-router-dom';
import { registerRequest, cleanRequestMessages, cleanRegisterSuccess, hasUsernameAlready } from '../../actions/register_actions';
import { loginRequest, } from '../../actions/login_actions';
import Functions from '../../util/functions';
import { PATHS } from '../routes';
        
class RegisterIndex extends Component {

 	renderRegisterLogo(){
 		return (
 			<div className="register-logo">
 				<Link to={PATHS.home}>
 					<b>Pendura</b>
 				</Link>
  			</div>
  		)
 	}


 	onSubmit(values){
 		this.props.registerRequest(values)
 	}

 	onLogin(values){
 		this.props.loginRequest(values)
 	}

 	componentDidUpdate(){

 		if ( this.props.register.success ){
 			this.onLogin( this.props.fieldsForm );
	 		if ( this.props.login.success_login ){
	 			this.props.cleanRegisterSuccess();
	 			this.props.history.push(PATHS.home);
	 		}
 		}


 	}

 	onClickDismiss(){
 		this.props.cleanRequestMessages();
 	}

 	renderMessages(){
 		const {messages} = this.props.register;
 		if ( messages && ( messages.length > 0 ) ){
 			var contentAux;
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
		  	    	    <div className="alert alert-danger alert-dismissible" >
		                	<button type="button" onClick={this.onClickDismiss.bind(this)} className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
		                	<h4><i className="icon fa fa-ban"></i> Alert!</h4>
								{contentAux}
		            	</div>
		            </div>
 				)
 		}
 	}

 	onClickHome(){
 		this.props.history.push(PATHS.home);
 	}

	render() {

		const {handleSubmit} = this.props;
		return (
			<div >
				
    			{this.renderMessages()}
    			{this.renderRegisterLogo()}

				<div className="register-box-body">
					<p className="login-box-msg">Registrar um novo membro</p>
					<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
			          	<Field
		            	  name="name"
			              component ={Functions.renderField}
			              type="text"
			              placeholder="Nome"
			            />
			            <Field
			              name="email"
  			              component={Functions.renderField}
  			              placeholder="Email"
			              type="email"
			            />
			          	<Field
			            	name="password"
			            	component ={Functions.renderField}
			            	placeholder="Password"
			            	type="password"
			          	/>
			          	<Field
				            name="password_retype"
				            component ={Functions.renderField}
				            placeholder="Password"
				            type="password"
		    	      	/>
	          			<button type="submit" className="btn btn-primary pull-right">Register</button>
			        	<button type="button"  onClick={this.onClickHome.bind(this)} className="btn btn-success" > Home </button>

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
      }else if (values.password_retype!== values.password){
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
  asyncValidate: hasUsernameAlready,
  form: 'RegisterIndexForm',
  asyncBlurFields: ['email']
})(
  connect(mapStateToProps,{registerRequest, loginRequest, cleanRequestMessages, cleanRegisterSuccess})(RegisterIndex)
);
