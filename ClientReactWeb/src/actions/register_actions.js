import Requests, { POST } from '../util/requests';
import { ROOT_URL } from './';

const URL_REGISTER = `${ROOT_URL}registeruser`;

export const REGISTER_REQUEST = 'register_request';
export const REGISTER_REQUEST_CLEAN_MESSAGES = 'register_request_clean_message';
export const REGISTER_REQUEST_CLEAN_SUCCESS = 'register_request_clean_success';
export const REGISTER_REQUEST_ERROR = 'register_request_error';

export function registerRequest(values){

	const request = Requests.request( `${URL_REGISTER}`, values, {}, POST);

	return (dispatch) => {
		request.then((data)=>{
				dispatch({type: REGISTER_REQUEST, payload: data.data });
			}).catch((data) => {
				dispatch({type: REGISTER_REQUEST_ERROR, payload: data.response.data });
			});		
	}

}

export function cleanRegisterSuccess(){

	return (dispatch) => {
		dispatch({type: REGISTER_REQUEST_CLEAN_SUCCESS, payload: {}})
	}

}

export function cleanRequestMessages(){
	return (dispatch) =>{
		dispatch({type:REGISTER_REQUEST_CLEAN_MESSAGES, payload: {}})
	}
}