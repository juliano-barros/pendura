import axios from 'axios';
import { ROOT_URL } from './';

export function loginRequest(values, callback){

	const request = axios.post( `${URL_LOGIN}`, values).then((data)=>callback(data));

	return {
		type: LOGIN_REQUEST,
		payload: request
	}

}
