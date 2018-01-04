import { ROOT_URL } from './';
import Requests, { POST, GET } from '../util/requests';

export const PRODUCT_REQUEST = 'produto_request';
export const PRODUCT_REQUEST_ALL = 'produto_request_all';
export const PRODUCT_REQUEST_UPLOAD_PICUTRE_SUCCESS = 'produto_request_upload_picture_success';
export const PRODUCT_REQUEST_UPLOAD_PICUTRE_ERROR = 'produto_request_upload_picture_error';
export const PRODUCT_REQUEST_ERROR = 'produto_request_error';

const URL_PRODUCT_ALL = `${ROOT_URL}product`
const URL_PRODUCT_UPLOAD_PICTURE = `{ROOT_URL}product/uploadPicture`

export function loadProducts(){

	const $request = Requests.request(URL_PRODUCT_ALL, null, {}, GET )

	return (dispatch)=>{
		$request.then((data)=>{
			dispatch({type: PRODUCT_REQUEST_ALL, payload: data});
		}).catch((error)=>{
			dispatch({type: PRODUCT_REQUEST_ERROR, payload: error.data});
		});
	}

}