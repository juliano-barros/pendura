import { REGISTER_REQUEST, REGISTER_REQUEST_ERROR } from '../actions/register_actions';
import _ from 'lodash';

const stateNew = {
	success: false,
	email: '',
	name: ''
}

export default (state=stateNew, action)=> {

	switch(action.type){
		case REGISTER_REQUEST:
			return { success: action.payload.validado, email: action.payload.email, name: action.payload.email };
		case REGISTER_REQUEST_ERROR:
			return { success: false, email: '',	name: ''};
		default :
		  return state
	}

}