import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { loginRequest, loadToken, cleanRequestMessages } from '../../actions/login_actions';
import Functions from '../../util/functions';

class LoginIndex extends Component{

	componentWillMount(){
		this.props.loadToken();
	}

  	renderField(field){

	    const { meta: { touched, error } } = field;
	    const className=`form-group ${ touched && error ? 'has-error' : ''} has-feedback`;

		return(
      		<div className ={className}>
        		<input
            		className="form-control"
            		type={field.type}
            		placeholder={field.label}
            		{...field.input}
        		/>
        		<div className ="help-block">
          			{ touched ? error : '' }
        		</div>
      		</div>
    	)

	}

	onSubmit(values){
		this.props.loginRequest(values);
	}

	componentDidUpdate(){
		
		if ( ( this.props.login.success_login) || ( this.props.login.success_load_token ) ){
			this.props.history.push('/full/home');
		}

	}

 	onClickDismiss(){
 		this.props.cleanRequestMessages();
 	}

 	renderMessages(){
 		const {messages} = this.props.login;
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
		
	render(){
		
		const { handleSubmit } = this.props;


 		return(

			<div>
				
				{this.renderMessages()}

				<div className="login-logo">
					<Link to="/home"><b>Pendura</b></Link>
	         	</div>
				<div className="register-box-body">
			        <p className="login-box-msg">Login</p>
			        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
			          <Field
			            name="email"
			            component ={this.renderField}
			            label="Usuário"
			            type="text"
			          />
			          <Field
			            label="Senha"
			            name="password"
			            component ={this.renderField}
			            type="password"
			          />
				    <div className="row">
				        	<button type="submit" className="btn btn-primary pull-right">Login</button>
				    </div>

			        </form>
	            </div>
		    </div>
	    );
	}

}

function validate(values){

    const errors={};

    if (!values.email){
    	errors.email = "E-mail não informado";
    }else if ( ! Functions.isEmailValid( values.email)){
        errors.email = "E-mail inválido";
    }

    if (!values.password){
        errors.password = "Senha não informada";
    }

    // if errors is empty, the form is fine to submit
    return errors;

}

function mapStateToProps({login}){
	return { login };
}


export default reduxForm({
  validate,
  form: 'LoginIndexForm'
})(
  connect(mapStateToProps,{loginRequest, loadToken, cleanRequestMessages})(LoginIndex)
);
