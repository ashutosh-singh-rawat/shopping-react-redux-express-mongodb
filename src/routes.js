"use strict"

import React from 'react';
import {render} from 'react-dom';

import {Router, Route, IndexRoute, browserHistory} from 'react-router';

//STEP 3 define reducers

//IMPORT
import BookList from './components/pages/booksList';
import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import Main from './main';

const routes = (
	<Router history={browserHistory}>
		<Route path='/' component={Main} >
			<IndexRoute component={BookList} />
			<Route path='/cart' component={Cart} />
			<Route path='/admin' component={BooksForm} />
		</Route>
	</Router>
);

export default routes;
