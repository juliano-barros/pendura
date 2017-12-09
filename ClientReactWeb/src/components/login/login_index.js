import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { loginRequest } from '../../actions/login_actions';


class LoginIndex extends Component{


  	renderField(field){

	    const { meta: { touched, error } } = field;
	    const className=`form-group ${ touched && error ? 'has-danger' : ''}`;

		return(
      		<div className ={className}>
        		<label >{field.label}</label>
        		<input
            		className="form-control"
            		type="text"
            		{...field.input}
        		/>
        		<div className ="text-help">
          			{ touched ? error : '' }
        		</div>
      		</div>
    	)

	}

	onSubmit(values){
		this.props.loginRequest(values,(data)=>{
			console.log(data)
		})

	}
		

	render(){
		
		const { handleSubmit } = this.props;

		return(
	      <div>
	        <h3>
	          Login!
	        </h3>
	        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
	          <Field
	            name="email"
	            component ={this.renderField}
	            label="Usuário"
	          />
	          <Field
	            label="Senha"
	            name="password"
	            component ={this.renderField}
	          />
	          <button type="submit" className="btn btn-primary">Submit</button>
	          <Link to="/" className="btn btn-danger"> Cancel </Link>

	        </form>

	      </div>
	    );
	}

}

function validate(values){

      const errors={};

      if (!values.username){
        errors.username = "Usuário não informado";
      }

      if (!values.password){
        errors.password = "Senha não informada";
      }


      // if errors is empty, the form is fine to submit
      return errors;

}


export default reduxForm({
  validate,
  form: 'LoginIndexForm'
})(
  connect(null,{loginRequest})(LoginIndex)
);