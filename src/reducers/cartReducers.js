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
	}
	return state;

}
