import axios from 'axios';
import { ROOT_URL } from './';

export const LOGIN_REQUEST = 'login_request';
export const LOGIN_REFRESH = 'login_refresh';
export const LOGIN_LOAD_STORAGE = 'login_load_storage';

const URL_LOGIN = `${ROOT_URL}login`

export function loginRequest(values, callback){

	const request = axios.post( `${URL_LOGIN}`, values);

	return (dispatch) => {
		request.then((data)=>{
				dispatch({type: LOGIN_REQUEST, payload: data, values});
				callback(data);
			});		
	}

}

export function loadStorage(callback){

	var data = {};
	if ( localStorage.token ){
		data = { user: localStorage.user, token : localStorage.token }		;
	}else{
		data = { user : '', token : ''};
	}

	return (dispatch)=>{
		dispatch({type: LOGIN_LOAD_STORAGE, payload: data});
		callback(data);
	}

}