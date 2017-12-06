"use strict"

export function cartReducers(state={cart: []}, action){
	switch(action.type){
		case 'GET_CART':
			return {...state,
				cart: 				action.payload,
				totalAmount: 	totals(action.payload).amount,
				totalQty: 		totals(action.payload).qty
			};
			break;
		case 'ADD_TO_CART':
			// console.log("====ACTION ADD_TO_CART =======")
			// console.log(state.cart)
			// console.log(...action.payload)
			// return {cart: [...state.cart, ...action.payload]};
			return {...state,
				cart: 				action.payload,
				totalAmount: 	totals(action.payload).amount,
				totalQty: 		totals(action.payload).qty
			};
			break;
 
		case 'DELETE_CART_ITEM':
			// return {cart: [...state, ...action.payload]};
			return {...state,
				cart: 			  action.payload,
				totalAmount: 	totals(action.payload).amount,
				totalQty: 		totals(action.payload).qty
			};
			break;

		case 'UPDATE_CART':
			// const currentItemToUpdate = [...state.cart];
			// const indexToUpdate = currentItemToUpdate.findIndex(function(cart){
			// 	return cart._id === action._id;
			// });
      //
			// const newItemToUpdate = {
			// 	...currentItemToUpdate[indexToUpdate],
			// 	quantity: currentItemToUpdate[indexToUpdate].quantity + action.unit
			// };
      //
      //
			// let updatedCart = [...currentItemToUpdate.slice(0, indexToUpdate), newItemToUpdate, ...currentItemToUpdate.slice(indexToUpdate+1)]
			// return {			...state,
			// 	cart: 			updatedCart,
			// 	totalAmount: 	totals(updatedCart).amount,
			// 	totalQty: 		totals(updatedCart).qty
			// }
      return {			...state,
				cart: 			   action.payload,
				totalAmount: 	 totals(action.payload).amount,
				totalQty: 		 totals(action.payload).qty
			}
			break;
	}
	return state;

}

//CALCULATE TOTALS
export function totals(payloadArr){
	const totalAmount = payloadArr.map(function (cartArr) {
		return cartArr.price * cartArr.quantity
		// body...
	}).reduce(function (a, b) {
		return a + b
	}, 0) //START SUMMING FROM INDEX 0

	const totalQty = payloadArr.map(function(qty){
		return qty.quantity
	}).reduce(function (a, b) {
		return a + b
	}, 0)

	return {amount: totalAmount.toFixed(2), qty: totalQty}
}
