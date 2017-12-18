import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';

import LoginIndex from './login/login_index';
import HomeIndex from './Home/home_index';
import RegisterIndex from './Register/register_index';
import reducers from '../reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default class App extends Component {
  render() {
    return (
	  <Provider store={createStoreWithMiddleware(reducers)}>
		  <BrowserRouter>
	  		<div>
			  <Switch>
	    	      <Route path="/login" component={LoginIndex} />
	        	  <Route path="/home" component={HomeIndex} />
	        	  <Route path="/register" component={RegisterIndex} />
			  </Switch>
	  		</div>
	  	</BrowserRouter>
	  </Provider>
    );
  }
}
