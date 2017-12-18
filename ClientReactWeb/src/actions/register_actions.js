import Requests, { POST } from '../util/requests';
import { ROOT_URL } from './';

const URL_REGISTER = `${ROOT_URL}registeruser`;

export const REGISTER_REQUEST = 'login_request';

export function registerRequest(values, callback){

	const request = Requests.request( `${URL_REGISTER}`, values, {}, POST);

	return (dispatch) => {
		request.then((data)=>{
				dispatch({type: REGISTER_REQUEST, payload: data });
				callback(data);
			}).catch((error) => {
				callback(error);
			});		
	}

}