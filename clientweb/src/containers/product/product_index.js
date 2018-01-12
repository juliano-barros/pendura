import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadProducts } from '../../actions/product_actions';
import $ from 'jquery';
import {ROOT_URL} from '../../actions';
import Functions from '../../util/functions';
import DataTableReact from '../../components/datatable/datatable';
import { PATHS } from '../routes';
import {SectionHeader, SectionBody } from '../../components/layout/adminlte/layout';

class ProductIndex extends Component {


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

	onClickUpdateTable(obj){
		this.props.history.push(`/product/${$($(obj)[0].currentTarget).attr('data-id')}`);
	}
	onClickDeleteTable(obj){
		this.props.history.push(`/product/${$($(obj)[0].currentTarget).attr('data-id')}/delete`);
	}

	afterProductDraw(){
		$(`#productTable`).on( 'click', 'tbody button.update-id', this.onClickUpdateTable.bind(this) )
		$(`#productTable`).on( 'click', 'tbody button.delete-id', this.onClickDeleteTable.bind(this) )
	}

	render(){

		return (

			<div>
				<SectionHeader main="Produto" secondary="produto">
			        <li><i className="fa fa-dashboard"></i> profile</li>
			        <li className="active">profile</li>
				</SectionHeader>
			    <SectionBody>
					<div className="box-header">
			    		<Link to={`${PATHS.product}/0`}> <div className="btn btn-success pull-right">Novo produto</div></Link>
					</div>
					<div className="box-body">
				    	<div className="row">
							<DataTableReact 	
								url={`${ROOT_URL}product/anyData`} 
								id="productTable"  
								beforeSend={Functions.addRequestHeader} 
								afterDraw = {this.afterProductDraw.bind(this)}
								columns={
											[ 
												{data: 'id', name: 'id', columnHeader: 'ID'}, 
												{data: 'name', name: 'name', columnHeader: 'Nome'}, 
												{data: 'link', name: 'link', columnHeader: '', width: "30%",  "bSortable": false } 
											] 
										}
							/>
						</div>
					</div>
			    </SectionBody>
			</div>

		)
	}
}

function mapStateToProps({products}){
	return { products };	
}

export default connect(mapStateToProps, {loadProducts})(ProductIndex)

