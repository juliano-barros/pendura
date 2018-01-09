import { ROOT_URL } from './';
import Requests, { POST, GET, PUT } from '../util/requests';

export const PRODUCT_REQUEST = 'produto_request';
export const PRODUCT_REQUEST_ALL = 'produto_request_all';
export const PRODUCT_SUCCESS = 'produto_success';
export const PRODUCT_ERROR = 'produto_error';
export const PRODUCT_REQUEST_UPLOAD_PICUTRE_SUCCESS = 'produto_request_upload_picture_success';
export const PRODUCT_REQUEST_UPLOAD_PICUTRE_ERROR = 'produto_request_upload_picture_error';
export const PRODUCT_REQUEST_ERROR = 'produto_request_error';

const URL_PRODUCT_ALL = `${ROOT_URL}product`
const URL_PRODUCT_ONE = `${ROOT_URL}product/`
const URL_PRODUCT_UPLOAD_PICTURE = `{ROOT_URL}product/uploadPicture`

export function loadProducts(){

	const request = Requests.request(URL_PRODUCT_ALL, null, {}, GET )

	return (dispatch)=>{
		request.then((data)=>{
			dispatch({type: PRODUCT_REQUEST_ALL, payload: data});
		}).catch((error)=>{
			dispatch({type: PRODUCT_REQUEST_ERROR, payload: error.data});
		});
	}

}

export function loadProduct(id){

	const request = Requests.request(`${URL_PRODUCT_ONE}${id}`, null, {}, GET )

	return (dispatch)=>{
		request.then((data)=>{
			dispatch({type: PRODUCT_REQUEST, payload: data});
		}).catch((error)=>{
			dispatch({type: PRODUCT_REQUEST_ERROR, payload: error.data});
		});
	}

}

export function updateProduct(values, id){
	var request = null;
	var method = PUT;
	console.log(id);
	if (id === "0" ){
	 	method = POST;
		console.log(method);
	}
	console.log(method);

	request = Requests.request( URL_PRODUCT_ALL, values, {}, method );

	return (dispatch)=>{
		request.then((data)=>{
			dispatch({type: PRODUCT_SUCCESS, payload: data});
		}).catch((error)=>{
			dispatch({type: PRODUCT_ERROR, payload: error.data});
		});
	}
}
