import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';
import promise from 'redux-promise';

import App from './components/app';
import LoginIndex from './components/login/login_index';
import HomeIndex from './components/Home/home_index';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
	  <BrowserRouter>
  		<div>
			  <Switch>
          <Route path="/login" component={LoginIndex} />
          <Route path="/home" component={HomeIndex} />
			  </Switch>
  		</div>
  	</BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
