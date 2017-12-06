"use strict"
import axios from 'axios';

//GET CART
export function getCart(){
	return function(dispatch) {
		axios.get('/api/cart')
			.then(function(response){
				dispatch({
					type: 'GET_CART',
					payload: response.data
				})
			})
			.catch(function(err) {
				dispatch({
					type: 'GET_CART_REJECTED',
					msg: 'Error While getting cart'
				})
			})
	}
}

//ADD TO CART
export function addToCart(cart){
	// return {
	// 	type: 		'ADD_TO_CART',
	// 	payload:  	book
	// }

	return function(dispatch) {
		axios.post('/api/cart', cart)
			.then(function(response) {
				dispatch({
					type: 		'ADD_TO_CART',
					payload:  response.data
				})
			})
			.catch(function(err) {
				dispatch({
					type: 	'ADD_TO_CART_REJECTED',
					msg:  	'Error in adding item to cart'
				})
			})
	}
}

//DELETE FROM CART
export function deleteCartItem(cart){
	// return {
	// 	type: 		'DELETE_CART_ITEM',
	// 	payload:  	cart
	// }

	return function(dispatch) {
		axios.post('/api/cart', cart)
			.then(function(response) {
				dispatch({
					type: 		'DELETE_CART_ITEM',
					payload:  response.data
				})
			})
			.catch(function(err) {
				dispatch({
					type: 	'DELETE_CART_ITEM_REJECTED',
					msg:  	'Error in deleting item from cart'
				})
			})
	}
}
//UPDATE CART
export function updateCart(_id, unit, cart){
	// return {
	// 	type: 		'UPDATE_CART',
	// 	_id:  		_id,
	// 	unit: 		unit
	// }

	const currentItemToUpdate = cart;
	const indexToUpdate = currentItemToUpdate.findIndex(function(cart){
		return cart._id === _id;
	});

	const newItemToUpdate = {
		...currentItemToUpdate[indexToUpdate],
		quantity: currentItemToUpdate[indexToUpdate].quantity + unit
	};


	let updatedCart = [...currentItemToUpdate.slice(0, indexToUpdate), newItemToUpdate, ...currentItemToUpdate.slice(indexToUpdate+1)]

	// return {
	// 	type: 		'UPDATE_CART',
	// 	payload:	updatedCart
	// }

	return function(dispatch) {
		axios.post('/api/cart', updatedCart)
			.then(function(response) {
				dispatch({
					type: 		'UPDATE_CART',
					payload:  response.data
				})
			})
			.catch(function(err) {
				dispatch({
					type: 	'UPDATE_CART_REJECTED',
					msg:  	'Error in adding item to cart'
				})
			})
	}

}
