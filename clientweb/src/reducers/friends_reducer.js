import { LOGIN_REQUEST, 
		 LOGIN_REQUEST_ERROR, 
		 LOGIN_REFRESH, 
		 LOGIN_LOAD_TOKEN, 
		 LOGIN_LOAD_TOKEN_ERROR,
		 LOGIN_REQUEST_CLEAN_MESSAGE,
		 LOGIN_REQUEST_LOGOUT } from '../actions/friends_actions';

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
		default  :
			return {...state };
	}

}		 