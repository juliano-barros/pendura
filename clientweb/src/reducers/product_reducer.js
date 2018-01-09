import { PRODUCT_REQUEST, 
		 PRODUCT_REQUEST_ALL, 
		 PRODUCT_SUCCESS, 
		 PRODUCT_ERROR, 
		 PRODUCT_REQUEST_UPLOAD_PICUTRE_SUCCESS, 
		 PRODUCT_REQUEST_UPLOAD_PICUTRE_ERROR, 
		 PRODUCT_REQUEST_ERROR 
		} from '../actions/product_actions';
import _ from 'lodash';

const INITIAL_STATE=[{
	actualProduct: {},
	posts:[{}],
	loading: true,
	success_save: false

}]

export default (state=INITIAL_STATE, action)=>{

	switch(action.type){
		case PRODUCT_REQUEST:
			const product = action.payload.data;
			return { ...state, [product.id]: product, actualProduct: product, loading: false, success_save: false };
		case PRODUCT_SUCCESS:
			return { ...state, success_save: true, loading: false };
		case PRODUCT_REQUEST_ALL:
			return { ...state, posts: _.mapKeys(action.payload.data, 'id'), actualProduct : {}, loading: false, success_save: false };
		case PRODUCT_REQUEST_UPLOAD_PICUTRE_SUCCESS:
			return { ...state, loading: false, success_save: false };
		case PRODUCT_REQUEST_UPLOAD_PICUTRE_ERROR:
			return { ...state, loading: false, success_save: false };
		case PRODUCT_REQUEST_ERROR:
			return { ...state, actualProduct: { name: '', price: '0.00'}, loading: false, success_save: false };
		default:
		  return state;
	}
}