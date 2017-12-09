import axios from 'axios';
import { ROOT_URL } from './';

export const LOGIN_REQUEST = 'login_request';
export const LOGIN_REFRESH = 'login_refresh';

const URL_LOGIN = `${ROOT_URL}login`

export function loginRequest(values, callback){


	var headers = { headers : {
			'content-type' : 'application/json',
			'Access-Control-Allow-Origin': '*'
		}
	}
	console.log(headers);

	const request = axios.post( `${URL_LOGIN}`, values, headers).then((data)=>callback(data));

	return {
		type: LOGIN_REQUEST,
		payload: request
	}

}