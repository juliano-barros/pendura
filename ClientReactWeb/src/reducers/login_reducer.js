import { LOGIN_REQUEST, LOGIN_REFRESH, LOGIN_LOAD_STORAGE } from '../actions/login_actions';
import _ from 'lodash';

export default function(state={},action){

	switch(action.type){
		case LOGIN_REQUEST:
		  	return {...state, token : action.payload.data.access_token, user: action.values.email };
		case LOGIN_REFRESH:
		  	return {...state};
		case LOGIN_LOAD_STORAGE:
		  	return {...state, token : action.payload.access_token, user: action.payload.user };
		default  :
			return state;
	}

}