import React, { Component } from 'react';
import { connect } from 'react-redux';
import {loadProducts} from '../../actions/product_actions';
import $ from 'jquery';
import _ from 'lodash';

class ProductIndex extends Component {

	onSubmit(values){
	}

	componentWillUpdate(){
		//	this.props.product.picture = `https://dummyimage.com/100x100/AAA/000.gif`;
	}

	componentDidMount(){
		this.props.loadProducts();

	}

	componentDidUpdate(){
         $(`#imgPicture`).height( 100 );
	}

	renderProductList(){
		
		var products = Object.values(this.props.products)
		if ( typeof products === "object" ){
			return products.map((product, index)=>(
				<li  key={index} className="form-control"> {product.id} - {product.name}</li>
				)
			);
		}else{
			return (<div></div>);
		}
	}

	render(){

		return (

			<div>
			    <section className="content-header">
			      <h1>
			        Produto
			        <small>Produto</small>
			      </h1>
			      <ol className="breadcrumb">
			        <li><i className="fa fa-dashboard"></i> produto</li>
			        <li className="active">Index</li>
			      </ol>
			    </section>
				<div className="row">
					{this.renderProductList()}
				</div>
			</div>

		)
	}
}

function mapStateToProps({products}){
	return { products };	
}

export default connect(mapStateToProps, {loadProducts})(ProductIndex)

