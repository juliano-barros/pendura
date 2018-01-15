import React, { Component } from 'react';
import { jQueryMaskMoney } from './jquerymaskmoney';
import $ from 'jquery';


export default class MaskMoney extends Component{

	componentWillMount(){
		jQueryMaskMoney($);
	}

	componentDidMount(){
		$(`#${this.props.field.input.name}`).maskMoney();
	}

	componentDidUpdate(){
		$(`#${this.props.field.input.name}`).maskMoney('mask');
	}

	render(){

	    const { meta: { touched, error } } = this.props.field;
	    const className=`form-group ${ touched && error ? 'has-error' : ''} has-feedback`;
		return(
			<div  className={className} >

				<input type="text" id={this.props.field.input.name}  className="form-control" placeholder={this.props.field.placeholder} {...this.props.field.input} />

    			<div className ="help-block">
      				{ touched ? error : '' }
    			</div>
    		</div>

		)
	}

}