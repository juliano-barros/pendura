import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import $ from 'jquery';
import { PATHS } from '../containers/routes';

import LayoutFullHeader from './layout_full_header';
import LayoutFullAside from './layout_full_aside';
import LayoutFullFooter from './layout_full_footer';
import { BoxRefreshLTE,	BoxWidgetLTE, ControlSidebarLTE,DirectChatLTE,LayoutLTE,pushMenuLTE,TodoListLTE,TreeLTE	} from './adminlte';
import {SectionHeader, SectionBody } from '../components/layout/adminlte/layout';


import HomeIndex from '../containers/home/home_index';
import ProfileIndex from '../containers/profile/profile_index';
import ProductIndex from '../containers/product/product_index';
import ProductForm from '../containers/product/product_form';

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
						<Route exact path={PATHS.home} component={HomeIndex} />
						<Route exact path={PATHS.profile} component={ProfileIndex} />
						<Route exact path={PATHS.product_form} component={ProductForm} />
						<Route exact path={PATHS.product_form_delete} component={ProductForm} />
						<Route exact path={PATHS.product} component={ProductIndex} />
						<Redirect to={PATHS.home} />
  					</section>
  				</div>
  				<LayoutFullFooter />
			</div>
		);
	}
}



export default Layout_full;