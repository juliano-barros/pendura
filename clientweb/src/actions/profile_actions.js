import Requests, { POST } from '../util/requests';
import { ROOT_URL } from './';
import { penduraStore } from '../components/app';


export const PROFILE_PROFILE_SUCCESS = 'profile_profile_success';
export const PROFILE_PROFILE_ERROR = 'profile_profile_error';
export const PROFILE_PROFILE_PHOTO_SUCCESS = 'profile_profile_photo_success';
export const PROFILE_PROFILE_PHOTO_ERROR = 'profile_profile_photo_error';
export const PROFILE_PROFILE_PHOTO_UPLOADING = 'profile_profile_photo_uploading';
export const PROFILE_PROFILE_PHOTO_UPLOAD_ERROR = 'profile_profile_photo_upload_error';

const URL_PROFILE = `${ROOT_URL}profile/profile`;
const URL_PROFILE_PICTURE_UPLOAD = `${ROOT_URL}profile/updatePictureProfile`;
const URL_PROFILE_UPDATE = `${ROOT_URL}profile/updateProfile`;

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

export function updateProfile(values){
	const request = Requests.request( URL_PROFILE_UPDATE, values, {}, POST );
	return (dispatch)=>{
			request.then((data)=> {
				dispatch({type:PROFILE_PROFILE_SUCCESS, payload: data});
			}).catch((data)=>{
				dispatch({type:PROFILE_PROFILE_ERROR, payload: data});
			})
	}
}

export function uploadPictureProfile(values){

	const request = Requests.request( URL_PROFILE_PICTURE_UPLOAD, values, 
		{ onUploadProgress: (progressEvent) =>{
			penduraStore.dispatch({type:PROFILE_PROFILE_PHOTO_UPLOADING, payload: {percent: progressEvent.loaded/progressEvent.total*100}});
	} }, POST, true );

	return (dispatch)=>{
			request.then((data)=> {
				dispatch({type:PROFILE_PROFILE_PHOTO_SUCCESS, payload: data});
			}).catch((data)=>{
				dispatch({type:PROFILE_PROFILE_PHOTO_ERROR, payload: data});
			})
	}

}

