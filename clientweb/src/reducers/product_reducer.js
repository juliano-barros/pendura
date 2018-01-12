import { 
		 PRODUCT_REQUEST, 
		 PRODUCT_REQUEST_ALL, 
		 PRODUCT_SUCCESS, 
		 PRODUCT_LOADING,
		 PRODUCT_CLEAN_SAVE,
		 PRODUCT_ERROR,
		 PRODUCT_PHOTO_UPLOADING,
		 PRODUCT_REQUEST_UPLOAD_PICUTRE_SUCCESS, 
		 PRODUCT_REQUEST_UPLOAD_PICUTRE_ERROR, 
		 PRODUCT_REQUEST_ERROR 
		} from '../actions/product_actions';
import _ from 'lodash';

const INITIAL_STATE=[{
	actualProduct: {picture:''},
	posts:[{}],
	loading: true,
	picture: '',
	uploadPercent: 0,
	success_save: false
}]

export default (state=INITIAL_STATE, action)=>{

	switch(action.type){
		case PRODUCT_REQUEST:
			const product = action.payload.data;
			return { ...state, [product.id]: product, actualProduct: product, loading: false, success_save: false, picture: product.picture, uploadPercent: 0 };
		case PRODUCT_SUCCESS:
			return { ...state, success_save: true, loading: false };
		case PRODUCT_REQUEST_ALL:
			return { ...state, posts: _.mapKeys(action.payload.data, 'id'), actualProduct : {}, loading: false, success_save: false };
		case PRODUCT_REQUEST_UPLOAD_PICUTRE_SUCCESS:
			return { ...state, picture: action.payload.data.picture, loading: false, success_save: false, uploadPercent: 0 };
		case PRODUCT_REQUEST_UPLOAD_PICUTRE_ERROR:
			return { ...state, loading: false, success_save: false, uploadPercent: 0, picture: ''};
		case PRODUCT_REQUEST_ERROR:
			return { ...state, actualProduct: { name: '', price: '0.00'}, loading: false, success_save: false };
		case PRODUCT_LOADING:
			return { ...state, loading: true, actualProduct: {name: '', price: '0.00', picture:''} };
		case PRODUCT_PHOTO_UPLOADING:
			return {...state, uploadPercent: action.payload.percent };
		case PRODUCT_CLEAN_SAVE:
			return { ...state, success_save: false };
		default:
		  return {...state};
	}
}