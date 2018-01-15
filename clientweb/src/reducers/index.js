import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import LoginReducer from './login_reducer';
import RegisterReducer from './register_reducer';
import ProfileReducer from './profile_reducer';
import ProductReducer from './product_reducer';
import UserFriendReducer from './friends_reducer';

const rootReducer = combineReducers({
  	form: formReducer,
  	login: LoginReducer,
  	register: RegisterReducer,
  	products: ProductReducer,
  	profile: ProfileReducer,
  	friends: UserFriendReducer
});

export default rootReducer;
