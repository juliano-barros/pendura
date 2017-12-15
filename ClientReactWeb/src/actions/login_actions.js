import axios from 'axios';
import { push } from 'react-router-redux';
import { ROOT_URL } from './';
import RequestUtil, { POST } from '../util/request_util';

export const LOGIN_REQUEST = 'login_request';
export const LOGIN_REFRESH = 'login_refresh';
export const LOGIN_LOAD_TOKEN = 'login_load_token';

const URL_LOGIN = `${ROOT_URL}login`;
const URL_LOGIN_REFRESH = `${ROOT_URL}login/refresh`;
const URL_IS_ALIVE = `${ROOT_URL}login/isAlive`;

function saveStorage(token, user){
	localStorage.token = token;
	localStorage.user = user;
	sessionStorage.accessed = true;
}

export function loginRequest(values, callback){

	const request = RequestUtil.request( `${URL_LOGIN}`, values, {}, POST);

	return (dispatch) => {
		request.then((data)=>{
				dispatch({type: LOGIN_REQUEST, payload: data, values});
				saveStorage( data.data.access_token, values.email );
				callback(data);
			}).catch((error) => {
				RequestUtil.resetToken(error.response.status)
			});		
	}
}

export function loadToken(callback){

	const request =  RequestUtil.request( `${URL_IS_ALIVE}`, null, {}, POST);

	return (dispatch)=>{
		request.then((data)=>{
			dispatch({type: LOGIN_LOAD_TOKEN, payload: {access_token: localStorage.token, user : localStorage.user} })
			callback(data);
		}).catch((error) => {
			RequestUtil.resetToken(error.response.status)
		});
	}
}

