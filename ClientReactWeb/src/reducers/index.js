import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import LoginReducer from './login_reducer';

const rootReducer = combineReducers({
  	form: formReducer,
  	login: LoginReducer
});

export default rootReducer;
