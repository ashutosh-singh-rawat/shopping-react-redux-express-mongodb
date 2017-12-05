"use strict"
import axios from 'axios';
// GET BOOKS
export function getBooks(){
	return {
		type: 'GET_BOOKS'
	}
}

//POST A BOOK
export function postBooks(books){
	// return {
	// 	type: 'POST_BOOK',
	// 	payload: books
	// }

  return function (dispatch) {
    axios.post('/books', books)
      .then(function (response) {
        dispatch({type: 'POST_BOOK', payload: response.data })
      })
      .catch(function (err) {
        dispatch({type: 'POST_BOOK_REJECTED', payload: "There was an error while posting a book"})
      })
  }
}

//DELETE A BOOK
export function deleteBooks(id){
	return {
		type: 'DELETE_BOOK',
		payload: id
	}
}

//UPDATE A BOOK
export function updateBooks(book){
	return {
		type: 'UPDATE_BOOK',
		payload: book
	}
}
