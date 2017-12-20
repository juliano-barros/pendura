import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { loginRequest, loadToken } from '../../actions/login_actions';
import Functions from '../../util/functions';

class LoginIndex extends Component{

	componentWillMount(){
		this.props.loadToken();
	}

  	renderField(field){

	    const { meta: { touched, error } } = field;
	    const className=`form-group ${ touched && error ? 'has-danger' : ''} has-feedback`;

		return(
      		<div className ={className}>
        		<input
            		className="form-control"
            		type={field.type}
            		placeholder={field.label}
            		{...field.input}
        		/>
        		<span className={`glyphicon ${field.glyph}`}> </span>
        		<div className ="text-help">
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
			this.props.history.push('/home');
		}

	}
		
	render(){
		
		const { handleSubmit } = this.props;


 		return(
			<div className="register-box">
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
			            glyph="glyphicon-envelope form-control-feedback"
			          />
			          <Field
			            label="Senha"
			            name="password"
			            component ={this.renderField}
			            type="password"
			            glyph="glyphicon-lock form-control-feedback"
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
  connect(mapStateToProps,{loginRequest, loadToken})(LoginIndex)
);
