import { PRODUCT_REQUEST, 
		 PRODUCT_REQUEST_ALL, 
		 PRODUCT_REQUEST_UPLOAD_PICUTRE_SUCCESS, 
		 PRODUCT_REQUEST_UPLOAD_PICUTRE_ERROR, 
		 PRODUCT_REQUEST_ERROR 
		} from '../actions/product_actions';
import _ from 'lodash';

const INITIAL_STATE=[{}]

export default (state=INITIAL_STATE, action)=>{

	switch(action.type){
		case PRODUCT_REQUEST:
			const product = action.payload.data;
			return { ...state, [product.id]: product };
		case PRODUCT_REQUEST_ALL:
			return _.mapKeys(action.payload.data, 'id');
		case PRODUCT_REQUEST_UPLOAD_PICUTRE_SUCCESS:
		case PRODUCT_REQUEST_UPLOAD_PICUTRE_ERROR:
		case PRODUCT_REQUEST_ERROR:
		default:
		  return state;
	}
}