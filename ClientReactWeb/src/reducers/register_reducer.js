import { REGISTER_REQUEST } from '../actions/register_actions';
import _ from 'lodash';

export default (state, action)=> {

	switch(action.type){
		case REGISTER_REQUEST:
			return { ...state }
		default
		  return state
	}

}