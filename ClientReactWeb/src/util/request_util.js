import axios from 'axios';
import React from 'react';
import _ from 'lodash';
//import { push } from 'react-router-redux';
import { ROOT_URL } from '../actions';
import history from './history'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerMiddleware, push } from 'react-router-redux'



const URL_IS_ALIVE = `${ROOT_URL}login/isAlive`;

export const POST = 'post';
export const GET = 'get';

class RequestUtil{

	static request( url, data, config = {}, verb = POST ){

		var header = { Accept : 'application/json', Authorization : `Bearer ${localStorage.token}` };

    	config = _.defaultsDeep( config, { headers: header }  );

		if ( ! sessionStorage.accessed ){
			if ( localStorage.token == '' ){
				// redirect to login
				RequestUtil.redirectLogin();
			}else{
				const request = axios.post( `${URL_IS_ALIVE}`,null, config);
				request.then((data)=> {
					sessionStorage.accessed = true;
				}).catch((error)=> {
					RequestUtil.redirectLogin();
				})
			}
		}
		return axios.request( _.defaultsDeep({method : verb, url, data }, config ) );
	}

	static resetToken(status){
		if ( status = 401){
			sessionStorage.accessed = false;
			localStorage.token = '';
			localStorage.user = '';
			RequestUtil.redirectLogin();
		}
	}

	static redirectLogin(){
		if (window.location.href.indexOf( '/login') < 0 ) {
			window.location.href = '/login';
		}

	}

}

export default RequestUtil;
	
