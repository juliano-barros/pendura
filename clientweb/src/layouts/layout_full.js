import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import $ from 'jquery';

import LayoutFullHeader from './layout_full_header';
import LayoutFullAside from './layout_full_aside';
import LayoutFullFooter from './layout_full_footer';
import { BoxRefreshLTE,	BoxWidgetLTE, ControlSidebarLTE,DirectChatLTE,LayoutLTE,pushMenuLTE,TodoListLTE,TreeLTE	} from './adminlte';


import HomeIndex from '../components/home/home_index';
import ProfileIndex from '../components/profile/profile_index';

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
				<LayoutFullHeader />
				<LayoutFullAside />
  				<div className="content-wrapper">
				    <section className="content">
  						<Route path="/full/home" component={HomeIndex} />
  						<Route path="/full/profile" component={ProfileIndex} />
  					</section>
  				</div>
  				<LayoutFullFooter />
			</div>
		);
	}
}



export default Layout_full;