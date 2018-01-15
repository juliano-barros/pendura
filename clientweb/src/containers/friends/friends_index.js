import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { sendRequestFriend } from '../../actions/friends_actions';
import $ from 'jquery';
import {ROOT_URL} from '../../actions';
import Functions from '../../util/functions';
import DataTableReact from '../../components/datatable/datatable';
import { PATHS } from '../routes';
import {SectionHeader, SectionBody } from '../../components/layout/adminlte/layout';

class FriendsIndex extends Component {


	onClickUpdateTable(obj){
		this.props.history.push(`/userFriend/${$($(obj)[0].currentTarget).attr('data-id-userfriend')}`);
	}

	onClickDeleteTable(obj){
		this.props.history.push(`/userFriend/${$($(obj)[0].currentTarget).attr('data-id_userfriend')}/delete`);
	}

	afterFriendsDraw(){
		$(`#friendTable`).on( 'click', 'tbody button.update-id', this.onClickUpdateTable.bind(this) )
		$(`#friendTable`).on( 'click', 'tbody button.delete-id', this.onClickDeleteTable.bind(this) )
	}

	render(){

		return (

			<div>
				<SectionHeader main="Amigos" secondary="Lista de amigos">
			        <li><i className="fa fa-industry"></i> Amigos</li>
			        <li className="active">amigos</li>
				</SectionHeader>
			    <SectionBody>
					<div className="box-body">
				    	<div className="row">
							<DataTableReact 	
								url={`${ROOT_URL}friends/anyData`} 
								id="friendTable"  
								beforeSend={Functions.addRequestHeader} 
								afterDraw = {this.afterFriendsDraw.bind(this)}
								columns={
											[ 
												{data: 'id', name: 'id', columnHeader: 'ID'}, 
												{data: 'name', name: 'name', columnHeader: 'Nome'}, 
												{data: 'email', name: 'email', columnHeader: 'Email'}, 
												{data: 'link', name: 'link', columnHeader: 'Aceito', width: "20%",  "bSortable": false } 
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


export default connect(null, { sendRequestFriend })(FriendsIndex)

