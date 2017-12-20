import { LOGIN_REQUEST, LOGIN_REQUEST_ERROR, LOGIN_REFRESH, LOGIN_LOAD_TOKEN, LOGIN_LOAD_TOKEN_ERROR } from '../actions/login_actions';
import _ from 'lodash';

const INITIAL_STATE = {
	token: '',
	user : '',
	success_login: false,
	success_load_token: false
}

export default function(state=INITIAL_STATE,action){

	switch(action.type){
		case LOGIN_REQUEST:
		  	return _.defaults({...state, token : action.payload.data.access_token, user: action.values.email, success_login: true }, INITIAL_STATE );
		case LOGIN_REQUEST_ERROR:
		  	return _.defaults({...state, token : '', user: '' }, INITIAL_STATE );
		case LOGIN_REFRESH:
		  	return _.defaults({...state}, INITIAL_STATE );
		case LOGIN_LOAD_TOKEN:
		  	return _.defaults({...state, token : action.payload.access_token, user: action.payload.user, success_load_token: true }, INITIAL_STATE );
		case LOGIN_LOAD_TOKEN_ERROR:
		  	return _.defaults({...state, token : action.payload.access_token, user: action.payload.user }, INITIAL_STATE );
		default  :
			return _.defaults(state, INITIAL_STATE );
	}

}