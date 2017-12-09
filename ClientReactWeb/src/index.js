import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import App from './components/app';
import LoginIndex from './components/login/login_index';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
	<BrowserRouter>
  		<div>
			<Switch>
				<Route path="/login" component={LoginIndex} />
			</Switch>
  		</div>
  	</BrowserRouter>
    </Provider>
  , document.querySelector('.container'));
