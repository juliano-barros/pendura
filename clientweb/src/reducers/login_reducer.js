import { LOGIN_REQUEST, 
		 LOGIN_REQUEST_ERROR, 
		 LOGIN_REFRESH, 
		 LOGIN_LOAD_TOKEN, 
		 LOGIN_LOAD_TOKEN_ERROR,
		 LOGIN_REQUEST_CLEAN_MESSAGE,
		 LOGIN_REQUEST_LOGOUT } from '../actions/login_actions';
import _ from 'lodash';

const INITIAL_STATE = {
	token: '',
	user : '',
	success_login: false,
	success_load_token: false,
	messages: [],
	logout: false
}

export default function(state=INITIAL_STATE,action){

	switch(action.type){
		case LOGIN_REQUEST:
		  	return _.defaults({...state, logout: false, token : action.payload.data.access_token, user: action.values.email, success_login: true }, INITIAL_STATE );
		case LOGIN_REQUEST_ERROR:
		  	return _.defaults({...state, logout: true, success_load_token: false, token : '', user: '', messages: [{email: ['Usuário/senha inválido']}] }, INITIAL_STATE );
		case LOGIN_REFRESH:
		  	return _.defaults({...state}, INITIAL_STATE );
		case LOGIN_REQUEST_CLEAN_MESSAGE:
		  	return {...state, messages: [] };
		case LOGIN_REQUEST_LOGOUT:
		  	return {...state, token : '', user: '', logout: true, messages: [], success_load_token: false  };
		case LOGIN_LOAD_TOKEN:
		  	return _.defaults({...state, logout: false, token : action.payload.access_token, user: action.payload.user, success_load_token: true }, INITIAL_STATE );
		case LOGIN_LOAD_TOKEN_ERROR:
		  	return _.defaults({...state, logout: true, token : action.payload.access_token, user: action.payload.user }, INITIAL_STATE );
		default  :
			return _.defaults(state, INITIAL_STATE );
	}

}