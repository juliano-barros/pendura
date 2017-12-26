import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';

import reducers from '../reducers';
import Layout_blank from '../layouts/layout_blank';
import Layout_full from '../layouts/layout_full';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default class App extends Component {
  render() {
    return (
	  <Provider store={createStoreWithMiddleware(reducers)}>
		  <BrowserRouter>
	  		<div>
				<Switch>
      	  			<Route path="/user" component={Layout_blank} />
      	  			<Route path="/full" component={Layout_full} />
				</Switch>
	  		</div>
	  	</BrowserRouter>
	  </Provider>
    );
  }
}
