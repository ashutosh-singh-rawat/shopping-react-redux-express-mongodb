"use strict"

export function cartReducers(state={cart: []}, action){
	switch(action.type){
		case 'ADD_TO_CART':
			// console.log("====ACTION ADD_TO_CART =======")
			// console.log(state.cart)
			// console.log(...action.payload)
			// return {cart: [...state.cart, ...action.payload]};
			return {cart: [...state, ...action.payload]};
			break;

		case 'DELETE_CART_ITEM':
			return {cart: [...state, ...action.payload]};
			break;

		case 'UPDATE_CART':
			const currentItemToUpdate = [...state.cart];
			const indexToUpdate = currentItemToUpdate.findIndex(function(cart){
				return cart._id === action._id;
			});

			const newItemToUpdate = {
				...currentItemToUpdate[indexToUpdate],
				quantity: currentItemToUpdate[indexToUpdate].quantity + action.unit
			};


			let updatedCart = [...currentItemToUpdate.slice(0, indexToUpdate), newItemToUpdate, ...currentItemToUpdate.slice(indexToUpdate+1)]
			return {
				...state,
				cart: updatedCart
			}
			break;
	}
	return state;

}
