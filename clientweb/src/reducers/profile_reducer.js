import { PROFILE_PROFILE_SUCCESS, PROFILE_PROFILE_PHOTO_SUCCESS, PROFILE_PROFILE_PHOTO_ERROR, PROFILE_PROFILE_ERROR } from '../actions/profile_actions';
import _ from 'lodash';

const INITIAL_STATE = {
	name: '',
	email: '',
	picture: ''

};

export default (state = INITIAL_STATE, action )=>{

	switch(action.type){
		case PROFILE_PROFILE_SUCCESS:
			return {...state, name: action.payload.data.name, email: action.payload.data.email , picture: action.payload.data.picture };
		case PROFILE_PROFILE_ERROR:
			return {...state, name: '', email: '', picture: ''};
		case PROFILE_PROFILE_PHOTO_SUCCESS:
			return {...state, picture: action.payload.data.picture };
		case PROFILE_PROFILE_PHOTO_ERROR:
			return {...state, picture: ''};
		default:
			return state
	}
}


