//reselect 如果給 function 的 input 一樣, 就會記錄之前算過的結果, 避免重算

import { createSelector } from "reselect";

//get a reducer slice from store
const selectCartReducer = (state) => state.cart;

//開始使用 memorization reselector 建立以下4個 selector
export const selectCartItems = createSelector(
    [selectCartReducer], //input
    (cart) => cart.cartItems //output
);

export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.isCartOpen
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) => 
    cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity, 
        0
    )
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) => 
    cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity * cartItem.price,
        0
    )
);
