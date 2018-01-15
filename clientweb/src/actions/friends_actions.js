import axios from 'axios';
import { ROOT_URL } from './';
import Requests, { POST } from '../util/requests';

export const SEND_REQUEST_FRIENDSHIP = 'send_request_friendship';
export const SEND_REQUEST_FRIENDSHIP_ERROR = 'send_request_friendship_error';


const URL_SEND_REQUEST = `${ROOT_URL}friends/`;


export function sendRequestFriend(idUserFriend){

	const request = Requests.request( `${URL_SEND_REQUEST}${idUserFriend}`, null, {}, POST);

	return (dispatch)=>{
		request.then((data)=>{
			dispatch({type:SEND_REQUEST_FRIENDSHIP, payload: data.data })
		}).catch((error)=>{
			dispatch({type:SEND_REQUEST_FRIENDSHIP_ERROR, payload: error.data })
		})
	}

}