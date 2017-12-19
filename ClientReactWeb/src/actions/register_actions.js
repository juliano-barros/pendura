import Requests, { POST } from '../util/requests';
import { ROOT_URL } from './';

const URL_REGISTER = `${ROOT_URL}registeruser`;

export const REGISTER_REQUEST = 'register_request';
export const REGISTER_REQUEST_ERROR = 'register_request_error';

export function registerRequest(values){

	const request = Requests.request( `${URL_REGISTER}`, values, {}, POST);

	return (dispatch) => {
		request.then((data)=>{
				dispatch({type: REGISTER_REQUEST, payload: data.data });
			}).catch((error) => {
				dispatch({type: REGISTER_REQUEST_ERROR, payload: error });
			});		
	}

}