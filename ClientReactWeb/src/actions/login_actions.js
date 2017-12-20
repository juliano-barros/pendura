import { ROOT_URL } from './';
import Requests, { POST } from '../util/requests';

export const LOGIN_REQUEST = 'login_request';
export const LOGIN_REQUEST_ERROR = 'login_request_error';
export const LOGIN_REFRESH = 'login_refresh';
export const LOGIN_LOAD_TOKEN = 'login_load_token';
export const LOGIN_LOAD_TOKEN_ERROR = 'login_load_token_error';

const URL_LOGIN = `${ROOT_URL}login`;
const URL_LOGIN_REFRESH = `${ROOT_URL}login/refresh`;
const URL_IS_ALIVE = `${ROOT_URL}login/isAlive`;

function saveStorage(token, user){
	localStorage.token = token;
	localStorage.user = user;
	sessionStorage.accessed = true;
}

export function loginRequest(values){

	const request = Requests.request( `${URL_LOGIN}`, values, {}, POST);

	return (dispatch) => {
		request.then((data)=>{
				saveStorage( data.data.access_token, values.email );
				dispatch({type: LOGIN_REQUEST, payload: data, values});
			}).catch((error) => {
				Requests.resetToken(error.response.status)
				dispatch({type: LOGIN_REQUEST_ERROR, payload: error});
			});		
	}
}

export function loadToken(){

	const request =  Requests.request( `${URL_IS_ALIVE}`, null, {}, POST);

	return (dispatch)=>{
		request.then((data)=>{
			dispatch({type: LOGIN_LOAD_TOKEN, payload: {access_token: localStorage.token, user : localStorage.user} })
		}).catch((error) => {
			Requests.resetToken(error.response.status)
			dispatch({type: LOGIN_LOAD_TOKEN_ERROR, payload: {access_token: localStorage.token, user : localStorage.user} })
		});
	}
}

