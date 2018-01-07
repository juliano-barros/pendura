import React, { Component } from 'react';
import $ from 'jquery';
import DataTable from 'datatables.net';


class DataTableReact extends Component{

	comopnentWillMount(){
		$.DataTable = DataTable;
	}

	componentDidMount(){
		$(`#${this.props.id}`).DataTable({
	        processing: true,
	        serverSide: true,
	        ajax: { url: this.props.url, method: this.props.method, beforeSend: this.props.beforeSend },
	        columns: this.props.columns
	    });

	}

	renderHeaders(){

		return this.props.columns.map((column)=>{
            return (<th key={column.name}> {column.columnHeader} </th>)
		});
		
	}

	render(){
		return(
			<table className="table table-bordered table-hover" id={this.props.id}>
				<thead>
		            <tr>
		            	{this.renderHeaders()}
		            </tr>
		        </thead>
			</table>

			)
	}
}


DataTableReact.defaultProps = {
	id: 'table',
	url: '',
	columns: [{}],
	method: 'POST',
	beforeSend: (request)=>{}

}

export default DataTableReact;