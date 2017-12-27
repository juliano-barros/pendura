import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import LoginReducer from './login_reducer';
import RegisterReducer from './register_reducer';
import ProfileReducer from './profile_reducer';

const rootReducer = combineReducers({
  	form: formReducer,
  	login: LoginReducer,
  	register: RegisterReducer,
  	profile: ProfileReducer
});

export default rootReducer;
