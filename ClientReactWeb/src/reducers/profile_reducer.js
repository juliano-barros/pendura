import { PROFILE_PROFILE_SUCCESS, PROFILE_PROFILE_ERROR } from '../actions/profile_actions';
import _ from 'lodash';

const INITIAL_STATE = {
	name: '',
	email: '',
	foto: ''

};

export default (state = INITIAL_STATE, action )=>{

	switch(action.type){
		case PROFILE_PROFILE_SUCCESS:
			return {...state, name: action.payload.data.name, email: action.payload.data.email };
		case PROFILE_PROFILE_ERROR:
			return {...state, name: '', email: '', foto: ''};
		default:
			return {...state}
	}
}


