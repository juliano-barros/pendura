import Requests, { POST } from '../util/requests';
import { ROOT_URL } from './';


export const PROFILE_PROFILE_SUCCESS = 'profile_profile_success';
export const PROFILE_PROFILE_ERROR = 'profile_profile_error';

const URL_PROFILE = `${ROOT_URL}profile/profile`;

export function profileRequest(){

	const request = Requests.request( URL_PROFILE, null, {}, POST );
	return (dispatch)=>{
			request.then((data)=> {
				dispatch({type:PROFILE_PROFILE_SUCCESS, payload: data});
			}).catch((data)=>{
				dispatch({type:PROFILE_PROFILE_ERROR, payload: data});
			})
	}

}

