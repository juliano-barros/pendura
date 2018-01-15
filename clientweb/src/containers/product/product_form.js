import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import $ from 'jquery';
import Functions from '../../util/functions';
import ProgressBarLte from '../../components/progress/progresslte';
import {SectionHeader, SectionBody, Loading } from '../../components/layout/adminlte/layout';
import {loadProduct, updateProduct,cleanSave,deleteProduct,uploadPictureProduct} from '../../actions/product_actions';
import { PATHS } from '../routes';
import MaskMoney from '../../components/maskmoney/maskmoney';


class ProductForm extends Component{

	componentWillMount() {
		this.props.loadProduct(this.props.match.params.id);
	}

	onSubmit(values){

		values.price = values.price.replace(',', '');

		if ( this.isDelete() ){
			this.props.deleteProduct(this.props.match.params.id);
		}else{
			this.props.updateProduct(values, this.props.match.params.id);
		}
	}

	uploadPicture(){

		if ( typeof this.props.products.picture === "object" ){
			var formData = new FormData()
			formData.append( 'picture', this.props.products.picture, this.props.products.picture.name);
			this.props.uploadPictureProduct(formData, this.props.match.params.id);
		}


	}

	componentDidUpdate(){
		if ( this.props.products.success_save ){
			this.props.cleanSave();		
			this.props.history.push(PATHS.product);
		}
         $(`#imgPicture`).height( 300 );

	}

	isDelete(){
		return ( this.props.location.pathname.indexOf('/delete') > 0 )
	}

	renderButton(){
		var className = "btn-primary";
		var captionButton = "Salvar";
		if ( this.isDelete() ){
			var className = "btn-danger";
			var captionButton = "Delete";
		}
		return ( <button type="submit" className={`btn ${className} pull-right`}> {captionButton} </button> )
	}

	loadImageFromClientSide(evt){
		
	    var tgt = evt.target || window.event.srcElement,
	        files = tgt.files;

	    // FileReader support
	    if (FileReader && files && files.length) {
	        var fr = new FileReader();
	        fr.onload = function () {
	            this.props.products.picture = $("#file").prop("files")[0];
	            $("#imgPicture").attr( 'src', fr.result);
	            this.uploadPicture();
	        }.bind(this)

	        fr.readAsDataURL(files[0]);
	    }

	    // Not supported
	    else {
	    }
	}

 	renderJcrop(field){
 		if (field.input.value !== " " ){
  			delete field.input.value; // <-- just delete the value property
  		}
  		return <input type="file" id="file" {...field.input} />;
 	}

 	renderMaskMoney(field){
 		return(
 				<MaskMoney field={field} id={field.input.name} />
 			)
 	}

	render(){
		const {handleSubmit} = this.props;
		return(

			<div>
				<SectionHeader main="Produto" secondary="produto">
			        <li><i className="fa fa-industry"></i> Produto</li>
			        <li className="active">produto</li>
				</SectionHeader>
		    	<SectionBody >
		    		<div className="col-sm-6">
		    			<SectionBody loading={this.props.products.loading}>
						 	<img id="imgPicture"  className="form-control" src={this.props.products.picture} />
						 	<ProgressBarLte value={this.props.products.uploadPercent} />
							<Field name="picture" className="form-control" component={this.renderJcrop.bind(this)} onChange={this.loadImageFromClientSide.bind(this)} />
			    		</SectionBody>
					</div>
		    		<div className="col-sm-6">
		    			<SectionBody loading={this.props.products.loading}>
				    		<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					          	<Field
				            	  name="name"
					              component ={Functions.renderField}
					              type="text"
					              placeholder="Nome"
					            />
					          	<Field
				            	  name="price"
					              component ={this.renderMaskMoney}
					              type="text"
					              placeholder="Preço do produto"
					            />
					            {this.renderButton()}
				    		</form>
			    		</SectionBody>
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

ProductForm = connect(mapStateToProps, {loadProduct,updateProduct,cleanSave,deleteProduct, uploadPictureProduct})(ProductForm);

export default ProductForm;