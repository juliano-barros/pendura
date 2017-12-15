import { LOGIN_REQUEST, LOGIN_REFRESH, LOGIN_LOAD_TOKEN } from '../actions/login_actions';
import _ from 'lodash';

const stateDefault = {
	token: '',
	user : ''
}

export default function(state=stateDefault,action){

	switch(action.type){
		case LOGIN_REQUEST:
		  	return {...state, token : action.payload.data.access_token, user: action.values.email };
		case LOGIN_REFRESH:
		  	return {...state};
		case LOGIN_LOAD_TOKEN:
		  	return {...state, token : action.payload.access_token, user: action.payload.user };
		default  :
			return state;
	}

}