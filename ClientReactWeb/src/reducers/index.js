import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import LoginReducer from './login_reducer';
import RegisterReducer from './register_reducer';

const rootReducer = combineReducers({
  	form: formReducer,
  	login: LoginReducer,
  	register: RegisterReducer
});

export default rootReducer;
