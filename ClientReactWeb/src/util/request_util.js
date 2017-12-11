import axios from 'axios';
import React from 'react';
import { ROOT_URL } from '../actions';

const URL_IS_ALIVE = `${ROOT_URL}login/isAlive`;

export const POST = 'post';
export const GET = 'get';

class RequestUtil{

	static request( url, data, config = [], verb = POST ){
		if ( ! sessionStorage.accessed ){
			console.log("not accessed");
			if ( localStorage.token = '' ){
				// redirect to login
				console.log("without token");
			}else{
				var header = { Accept : 'application/json', Authorization : `Bearer ${localStorage.token}` };
				const request = axios.post( `${URL_IS_ALIVE}`,null, header);
				request.then((data)=> {
					console.log("aqui 2");
					console.log(localStorage.token);
					console.log(data);
					sessionStorage.accessed = true;
				})
			}
		}

		console.log("aqui 1");
		return axios.request( {method : verb, url, data, header: config } )
	}

}

export default RequestUtil;
	
