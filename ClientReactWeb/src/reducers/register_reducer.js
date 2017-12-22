import { REGISTER_REQUEST, REGISTER_REQUEST_ERROR, REGISTER_REQUEST_CLEAN_MESSAGES } from '../actions/register_actions';
import _ from 'lodash';

const INITIAL_STATE = {
	success: false,
	email: '',
	name: '',
	messages: []
}

export default (state=INITIAL_STATE, action)=> {

	switch(action.type){
		case REGISTER_REQUEST:
			return _.defaults( { success: action.payload.validado, email: action.payload.email, name: action.payload.email }, INITIAL_STATE );
		case REGISTER_REQUEST_ERROR:
			return _.defaults({ success: false, email: '',	name: '', messages: [action.payload.errors] }, INITIAL_STATE );
		case REGISTER_REQUEST_CLEAN_MESSAGES:
			return _.defaults(...state, {messages: [] } ) ;
		default :
		  return _.defaults(state, INITIAL_STATE )
	}

}