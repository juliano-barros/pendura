import axios from 'axios';
import React from 'react';
import _ from 'lodash';
import { push } from 'react-router-redux';
import { ROOT_URL } from '../actions';

const URL_IS_ALIVE = `${ROOT_URL}login/isAlive`;

export const POST = 'post';
export const GET = 'get';

class RequestUtil{

	static request( url, data, config = null, verb = POST ){

		var header = { Accept : 'application/json', Authorization : `Bearer ${localStorage.token}` };

		if ( localStorage.token != '' ) {
			config = _.assign( header, config );
		}

		if ( ! sessionStorage.accessed ){
			console.log("not accessed");
			if ( localStorage.token == '' ){
				// redirect to login
				(dispatch)=>{dispatch(push('/login'))};
			}else{
				const request = axios.post( `${URL_IS_ALIVE}`,null, header);
				request.then((data)=> {
					sessionStorage.accessed = true;
				}).catch((data)=> {
					console.log("isAlive request");
					console.log(data);
				})
			}
		}

		return axios.request( {method : verb, url, data, headers: config } )
	}

	static resetToken(status){
		if ( status = 401){
			sessionStorage.accessed = false;
			localStorage.token = '';
			localStorage.user = '';
			// redirect to login
			(dispatch)=>{dispatch(push('/login'))};
		}
	}

}

export default RequestUtil;
	
