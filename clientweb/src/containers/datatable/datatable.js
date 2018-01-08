import React, { Component } from 'react';
import $ from 'jquery';
import DataTableNet from 'datatables.net';


class DataTableReact extends Component{

	componentWillMount(){
		var DataTable = DataTableNet;

		/* Set the defaults for DataTables initialisation */
		$.extend( true, DataTable.defaults, {
			dom:
				"<'row'<'col-sm-6'l><'col-sm-6'f>>" +
				"<'row'<'col-sm-12'tr>>" +
				"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			renderer: 'bootstrap'
		} );


		/* Default class modification */
		$.extend( DataTable.ext.classes, {
			sWrapper:      "dataTables_wrapper form-inline dt-bootstrap",
			sFilterInput:  "form-control input-sm",
			sLengthSelect: "form-control input-sm",
			sProcessing:   "dataTables_processing panel panel-default"
		} );


		/* Bootstrap paging button renderer */
		DataTable.ext.renderer.pageButton.bootstrap = function ( settings, host, idx, buttons, page, pages ) {
			var api     = new DataTable.Api( settings );
			var classes = settings.oClasses;
			var lang    = settings.oLanguage.oPaginate;
			var aria = settings.oLanguage.oAria.paginate || {};
			var btnDisplay, btnClass, counter=0;
			var attach = function( container, buttons ) {
				var i, ien, node, button;
				var clickHandler = function ( e ) {
					e.preventDefault();
					if ( !$(e.currentTarget).hasClass('disabled') && api.page() != e.data.action ) {
						api.page( e.data.action ).draw( 'page' );
					}
				};

				for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
					button = buttons[i];

					if ( $.isArray( button ) ) {
						attach( container, button );
					}
					else {
						btnDisplay = '';
						btnClass = '';

						switch ( button ) {
							case 'ellipsis':
								btnDisplay = '&#x2026;';
								btnClass = 'disabled';
								break;

							case 'first':
								btnDisplay = lang.sFirst;
								btnClass = button + (page > 0 ?
									'' : ' disabled');
								break;

							case 'previous':
								btnDisplay = lang.sPrevious;
								btnClass = button + (page > 0 ?
									'' : ' disabled');
								break;

							case 'next':
								btnDisplay = lang.sNext;
								btnClass = button + (page < pages-1 ?
									'' : ' disabled');
								break;

							case 'last':
								btnDisplay = lang.sLast;
								btnClass = button + (page < pages-1 ?
									'' : ' disabled');
								break;

							default:
								btnDisplay = button + 1;
								btnClass = page === button ?
									'active' : '';
								break;
						}

						if ( btnDisplay ) {
							node = $('<li>', {
									'class': classes.sPageButton+' '+btnClass,
									'id': idx === 0 && typeof button === 'string' ?
										settings.sTableId +'_'+ button :
										null
								} )
								.append( $('<a>', {
										'href': '#',
										'aria-controls': settings.sTableId,
										'aria-label': aria[ button ],
										'data-dt-idx': counter,
										'tabindex': settings.iTabIndex
									} )
									.html( btnDisplay )
								)
								.appendTo( container );

							settings.oApi._fnBindAction(
								node, {action: button}, clickHandler
							);

							counter++;
						}
					}
				}
			};		
		}
		
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