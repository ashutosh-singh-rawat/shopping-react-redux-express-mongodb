"use strict"

// GET BOOKS
export function getBooks(){
	return {
		type: 'GET_BOOKS'
	}
}

//POST A BOOK
export function postBooks(books){
	return {
		type: 'POST_BOOK', 
		payload: books
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