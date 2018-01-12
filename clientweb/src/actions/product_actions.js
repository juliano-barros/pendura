import { ROOT_URL } from './';
import Requests, { POST, GET, PUT, DELETE } from '../util/requests';
import { penduraStore } from '../containers/app';

export const PRODUCT_REQUEST = 'product_request';
export const PRODUCT_LOADING = 'product_loading';
export const PRODUCT_REQUEST_ALL = 'product_request_all';
export const PRODUCT_SUCCESS = 'product_success';
export const PRODUCT_ERROR = 'product_error';
export const PRODUCT_PHOTO_UPLOADING = 'product_photo_uploading';
export const PRODUCT_REQUEST_UPLOAD_PICUTRE_SUCCESS = 'product_request_upload_picture_success';
export const PRODUCT_REQUEST_UPLOAD_PICUTRE_ERROR = 'product_request_upload_picture_error';
export const PRODUCT_REQUEST_ERROR = 'product_request_error';
export const PRODUCT_CLEAN_SAVE = 'product_clean_save';


const URL_PRODUCT_ALL = `${ROOT_URL}product`
const URL_PRODUCT_ONE = `${ROOT_URL}product/`
const URL_PRODUCT_PICTURE_UPLOAD = `${ROOT_URL}product/uploadPicture/`;

export function loadProducts(){

	const request = Requests.request(URL_PRODUCT_ALL, null, {}, GET )

	return (dispatch)=>{
		dispatch({type: PRODUCT_LOADING})
		request.then((data)=>{
			dispatch({type: PRODUCT_REQUEST_ALL, payload: data});
		}).catch((error)=>{
			dispatch({type: PRODUCT_REQUEST_ERROR, payload: error.data});
		});
	}

}

export function cleanSave(id){
	return (dispatch)=>{
		dispatch({type:PRODUCT_CLEAN_SAVE})
	}
}

export function loadProduct(id){

	const request = Requests.request(`${URL_PRODUCT_ONE}${id}`, null, {}, GET )

	return (dispatch)=>{
		dispatch({type: PRODUCT_LOADING})
		request.then((data)=>{
			dispatch({type: PRODUCT_REQUEST, payload: data});
		}).catch((error)=>{
			dispatch({type: PRODUCT_REQUEST_ERROR, payload: error.data});
		});
	}

}

export function updateProduct(values, id){
	var method = PUT;
	console.log(id);

	if (id === "0" ){
	 	method = POST;
	 	id = "";
	}else{
		id = '/' + id;
	}

	var request = Requests.request( `${URL_PRODUCT_ALL}${id}`, values, {}, method );

	return (dispatch)=>{
		dispatch({type: PRODUCT_LOADING})
		request.then((data)=>{
			dispatch({type: PRODUCT_SUCCESS, payload: data});
		}).catch((error)=>{
			dispatch({type: PRODUCT_ERROR, payload: error.data});
		});
	}
}

export function deleteProduct(id){

	id = "/" + id;

	var request = Requests.request( `${URL_PRODUCT_ALL}${id}`, null, {}, DELETE );

	return (dispatch)=>{
		dispatch({type: PRODUCT_LOADING})
		request.then((data)=>{
			dispatch({type: PRODUCT_SUCCESS, payload: data});
		}).catch((error)=>{
			dispatch({type: PRODUCT_ERROR, payload: error.data});
		});
	}
}

export function uploadPictureProduct(values, id){

	const request = Requests.request( URL_PRODUCT_PICTURE_UPLOAD + id, values, 
		{ onUploadProgress: (progressEvent) =>{
			penduraStore.dispatch({type:PRODUCT_PHOTO_UPLOADING, payload: {percent: progressEvent.loaded/progressEvent.total*100}});
	} }, POST, true );

	return (dispatch)=>{
			request.then((data)=> {
				dispatch({type:PRODUCT_REQUEST_UPLOAD_PICUTRE_SUCCESS, payload: data});
			}).catch((data)=>{
				dispatch({type:PRODUCT_REQUEST_UPLOAD_PICUTRE_ERROR, payload: data});
			})
	}

}


