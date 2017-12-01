"use strict"

import {createStore} from 'redux';

// IMPORT COMBINED REDUCERS
import reducers from './reducers'
//STEP 3 define reducers
// const reducer = function(state={books: []}, action){
// 	switch(action.type){
// 		// case 'INCREMENT':
// 		// 	return state + action.payload;
// 		// 	break;
// 		// case 'DECREMENT':
// 		// 	return state - action.payload;
// 		// 	break;
// 		case 'POST_BOOK':
// 			// return state = action.payload;
// 			// let books = state.books.concat(action.payload);
// 			// return {books};
// 			return {books: [...state.books, ...action.payload]};
// 			break;

// 		case 'DELETE_BOOK':
// 			const currentBookToDelete = [...state.books]
// 			const indexToDelete = currentBookToDelete.findIndex(function(book){
// 				return book.id === action.payload.id;
// 			})
// 			return {books: [...currentBookToDelete.slice(0, indexToDelete), ...currentBookToDelete.slice(indexToDelete+1)]};
// 			break;

// 		case 'UPDATE_BOOK':
// 			const currentBookToUpdate = [...state.books]
// 			const indexToUpdate = currentBookToUpdate.findIndex(function(book){
// 				return book.id === action.payload.id;
// 			})

// 			const newBookToUpdate = {
// 				...currentBookToUpdate[indexToUpdate],
// 				title: action.payload.title
// 			}

// 			console.log("------- newBookToUpdate ==== ", newBookToUpdate);

// 			return {books: [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate+1)]};
// 			break;


// 	}
// 	return state
// }

//STEP 1 create the store
const store = createStore(reducers);

store.subscribe(function () {
	console.log('current stage is: ', store.getState());
	// console.log('current price: ', store.getState()[1].price);
})

//STEP 2 create and dispatch actions
// store.dispatch({type: 'INCREMENT', payload: 1})
// store.dispatch({type: 'INCREMENT', payload: 1})
// store.dispatch({type: 'INCREMENT', payload: 1})
// store.dispatch({type: 'INCREMENT', payload: 1})
// store.dispatch({type: 'DECREMENT', payload: 1})
// store.dispatch({type: 'DECREMENT', payload: 1})
// store.dispatch({type: 'DECREMENT', payload: 1})
// store.dispatch({type: 'DECREMENT', payload: 1})
store.dispatch({
	type: 'POST_BOOK', 
	payload: [
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
})

// DISPATCH a second action
store.dispatch({
	type: 'POST_BOOK', 
	payload: [{
		id: 3,
		title: 'this is the third book title',
		description: 'this is the third book description',
		price: 100
	}]
})

// DISPATCH a delete action
store.dispatch({
	type: 'DELETE_BOOK', 
	payload: {
		id: 3
	}
})

// DISPATCH a update action
store.dispatch({
	type: 'UPDATE_BOOK', 
	payload: {
		id: 2,
		title: 'new title'
	}
})