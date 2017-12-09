import { LOGIN_REQUEST, LOGIN_REFRESH } from '../actions/login_actions';
import _ from 'lodash';

export default function(state={},action){

	switch(action.type){
		case LOGIN_REQUEST
		  	return {...state};
		case LOGIN_REFRESH
		  	return {...state};
		default  
			return state;
	}

}