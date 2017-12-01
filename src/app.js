"use strict"

import React from 'react';
import {render} from 'react-dom';
 
import {applyMiddleware,createStore} from 'redux';
import logger from 'redux-logger';

// IMPORT COMBINED REDUCERS
import reducers from './reducers'

//IMPORT ACTIONS
import {addToCart} from './actions/cartActions';
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions';

//STEP 3 define reducers

//STEP 1 create the store
const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);

// store.subscribe(function () {
// 	console.log('current stage is: ', store.getState());
// 	// console.log('current price: ', store.getState()[1].price);
// })

//IMPORT 
import BookList from './components/pages/booksList';


render(
	<BookList/>, document.getElementById('app-root')
);

//STEP 2 create and dispatch actions
// store.dispatch({type: 'INCREMENT', payload: 1})
// store.dispatch({type: 'INCREMENT', payload: 1})
// store.dispatch({type: 'INCREMENT', payload: 1})
// store.dispatch({type: 'INCREMENT', payload: 1})
// store.dispatch({type: 'DECREMENT', payload: 1})
// store.dispatch({type: 'DECREMENT', payload: 1})
// store.dispatch({type: 'DECREMENT', payload: 1})
// store.dispatch({type: 'DECREMENT', payload: 1})
store.dispatch(postBooks(
	[
		{
			id: 1,
			title: 'this is the book title',
			description: 'this is the book description',
			price: 33.33
		},
		{
			id: 2,
			title: 'this is the second book title',
			description: 'this is the second book description',
			price: 500
		}
	]
))

// DISPATCH a delete action
store.dispatch(deleteBooks(
	{
		id: 2
	}
))


// DISPATCH a update action
store.dispatch(updateBooks(
	{
		id: 1,
		title: 'new title'
	}
))


//CART ACTIONS

// ADD TO CART 
store.dispatch(addToCart([{id: 1}]))