import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import $ from 'jquery';

import Layout_full_header from './layout_full_header';
import Layout_full_aside from './layout_full_aside';
import Layout_full_footer from './layout_full_footer';
import { BoxRefreshLTE,	BoxWidgetLTE, ControlSidebarLTE,DirectChatLTE,LayoutLTE,pushMenuLTE,TodoListLTE,TreeLTE	} from './adminlte';


import HomeIndex from '../components/home/home_index';

class Layout_full extends Component {

	componentDidMount(){
		BoxRefreshLTE($);
 		BoxWidgetLTE($);
 		ControlSidebarLTE($);
 		DirectChatLTE($);
 		LayoutLTE($);
 		pushMenuLTE($);
 		TodoListLTE($);
 		TreeLTE($);
	}

	render() {
		return (
			<div className="wrapper">
				<Layout_full_header />
				<Layout_full_aside />
  				<div className="content-wrapper">
				    <section className="content">
  						<Route path="/full/home" component={HomeIndex} />
  					</section>
  				</div>
  				<Layout_full_footer />
			</div>
		);
	}
}



export default Layout_full;