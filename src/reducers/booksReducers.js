"use strict"
//BOOKS REDUCERS
var initial_books = [
		// {
		// 	_id: 1,
		// 	title: 'this is the book title',
		// 	description: 'this is the book description',
		// 	price: 33.33
		// },
		// {
		// 	_id: 2,
		// 	title: 'this is the second book title',
		// 	description: 'this is the second book description',
		// 	price: 500
		// }
	]
export function booksReducers(state={
	books: initial_books
}, action){
	switch(action.type){
		// case 'INCREMENT':
		// 	return state + action.payload;
		// 	break;
		// case 'DECREMENT':
		// 	return state - action.payload;
		// 	break;

		case 'GET_BOOKS':
			// return {...state, books: [...state.books]};
			return {...state, books: [...action.payload]};
			break;
		case 'POST_BOOK':
			// return state = action.payload;
			// let books = state.books.concat(action.payload);
			// return {books};

			return {...state,
        books: [...state.books, ...action.payload],
        msg: 'Saved! Click to continue',
        style: 'success',
        validation: 'success'
      };
			break;
		case 'POST_BOOK_REJECTED':
			return {...state,
        msg: 'Please, try again',
        style: 'danger',
        validation: 'error'
      };
			break;
		case 'RESET_BUTTON':
			return {...state,
        msg: null,
        style: 'primary',
        validation: null
      };
			break;

		case 'DELETE_BOOK':
			const currentBookToDelete = [...state.books]
			const indexToDelete = currentBookToDelete.findIndex(function(book){
				// return book._id === action.payload._id;
				return book._id == action.payload;
			})
			return {books: [...currentBookToDelete.slice(0, indexToDelete), ...currentBookToDelete.slice(indexToDelete+1)]};
			break;

		case 'UPDATE_BOOK':
			const currentBookToUpdate = [...state.books]
			const indexToUpdate = currentBookToUpdate.findIndex(function(book){
				return book._id === action.payload._id;
			})

			const newBookToUpdate = {
				...currentBookToUpdate[indexToUpdate],
				title: action.payload.title
			}

			console.log("------- newBookToUpdate ==== ", newBookToUpdate);

			return {books: [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate+1)]};
			break;


	}
	return state
}
