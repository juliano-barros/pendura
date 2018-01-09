import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import $ from 'jquery';
import Functions from '../../util/functions';
import ProgressBarLte from '../../components/progress/progresslte';
import {SectionHeader, SectionBody, Loading } from '../../components/layout/adminlte/layout';
import {loadProduct, updateProduct} from '../../actions/product_actions';
import { PATHS } from '../routes';


class ProductForm extends Component{

	componentWillMount() {
		this.props.loadProduct(this.props.match.params.id);
	}

	onSubmit(values){
		this.props.updateProduct(values, this.props.match.params.id);
		this.setState({loading: true});
	}

	componentDidUpdate(){
		if ( this.props.products.success_save ){		
			this.props.history.push(PATHS.product);
		}
	}

	render(){
		const {handleSubmit} = this.props;
		return(

			<div>
				<SectionHeader main="Profile" secondary="profile">
			        <li><i className="fa fa-dashboard"></i> profile</li>
			        <li className="active">profile</li>
				</SectionHeader>
		    	<SectionBody loading={this.props.products.loading}>
		    		<div className="col-sm-6">
					</div>
		    		<div className="col-sm-6">
			    		<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				          	<Field
			            	  name="name"
				              component ={Functions.renderField}
				              type="text"
				              placeholder="Nome"
				            />
				          	<Field
			            	  name="price"
				              component ={Functions.renderField}
				              type="text"
				              placeholder="Preço do produto"
				            />
				            <button type="submit" className="btn btn-primary pull-right"> Salvar </button>
			    		</form>
					</div>
	    		</SectionBody>
			</div>

		)
	}

}

function mapStateToProps({products}){
	return { products, product: products.actualProduct, enableReinitialize: true, initialValues: products.actualProduct };	
}

function validate(values){

	const errors ={};

	if (!values.name){
		errors.name = "Nome não informado";
	}

	// if errors is empty, the form is fine to submit
	return errors;
}

ProductForm = reduxForm({
	validate,
	form: 'product-form'
})(ProductForm);

ProductForm = connect(mapStateToProps, {loadProduct,updateProduct})(ProductForm);

export default ProductForm;