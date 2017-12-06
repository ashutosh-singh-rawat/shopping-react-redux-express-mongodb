"use strict"

//ADD TO CART

export function addToCart(book){
	return {
		type: 		'ADD_TO_CART',
		payload:  	book
	}
}

//DELETE FROM CART
export function deleteCartItem(cart){
	return {
		type: 		'DELETE_CART_ITEM',
		payload:  	cart
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
	return {
		type: 		'UPDATE_CART',
		payload:	updatedCart
	}
}
