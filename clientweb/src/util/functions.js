import React from 'react';

export default class Functions{
	
	static isEmailValid(email){
		return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
	}

	static addRequestHeader(request){
		request.setRequestHeader("Accept", 'application/json');
        request.setRequestHeader("Authorization", `Bearer ${localStorage.token}`);
	}

	static renderField(field){

	    const { meta: { touched, error } } = field;
	    const className=`form-group ${ touched && error ? 'has-error' : ''} has-feedback`;

 		return( 
  		    <div className={className}>
  		    	<input className="form-control" type={field.type} placeholder={field.placeholder} {...field.input} />
        		<div className ="help-block">
          			{ touched ? error : '' }
        		</div>
  		    </div>
		);

 	}

	static isNumeric(number){
	 	return /^-?\d+\.?\d*$/.test( number );
	}


}