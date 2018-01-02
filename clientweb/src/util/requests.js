import axios from 'axios';
import _ from 'lodash';
import { ROOT_URL } from '../actions';



const URL_IS_ALIVE = `${ROOT_URL}login/isAlive`;

export const POST = 'post';
export const GET = 'get';

class Requests{

	static request( url, data, config = {}, verb = POST, formData = false ){
		var header = {}
		if ( ! formData){
			header = { Accept : 'application/json', Authorization : `Bearer ${localStorage.token}` };
		}else{
			header = { Accept : 'text/*, text/plain, text/plain;format=flowed, */*', Authorization : `Bearer ${localStorage.token}`, 'content-type' : 'multipart/form-data' };
		}

    	config = _.defaultsDeep( config, { headers: header }  );

		if ( ! sessionStorage.accessed ){
			if ( localStorage.token === '' ){
				// redirect to login
				Requests.redirectLogin();
			}else{
				const request = axios.post( `${URL_IS_ALIVE}`,null, config);
				request.then((data)=> {
					sessionStorage.accessed = true;
				}).catch((error)=> {
					Requests.redirectLogin();
				})
			}
		}
		return axios.request( _.defaultsDeep({method : verb, url, data }, config ) );
	}

	static cleanStorage(){
		sessionStorage.accessed = false;
		localStorage.token = '';
		localStorage.user = '';
	}

	static resetToken(status){
		if ( status === 401){
			Requests.cleanStorage();
			Requests.redirectLogin();
		}
	}

	static redirectLogin(){
		if (window.location.href.indexOf( '/login') < 0 ) {
			window.location.href = '/user/login';
		}
		

	}

}

export default Requests;
	
