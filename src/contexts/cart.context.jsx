import { createAction } from '../utils/reducer/reducer.utils';
import React, { createContext, useReducer, useState } from "react";

//helper function會回傳一陣列, cartItems(array):現有購物車內容, productToAdd(array)要加入購物車之產品可有多個
const addCartItem = (cartItems, productToAdd) => {
    //找要加入之產品是否有在購物車
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    //若已在購物車內
    if(existingCartItem) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id
                ? {...cartItem, quantity: cartItem.quantity + 1} //若要加入之產品已在購物車內, 就把購物車內目前的 quantity + 1
                : cartItem //錯誤之例外狀況就回傳原有之 cartItem object
        );
    }
    
    //若要加入之產品不在購物車內, ...cartItems:複製目前購物車之陣列。 {...productToAdd, quantity: 1}:將要加入之產品數量設 1, 並寫入複製之目前購物車之陣列, 最後用 [] 包起來回傳一陣列
    return [...cartItems, {...productToAdd, quantity: 1} ];
};

//helper function會回傳一陣列, cartItems(array):現有購物車內容, cartItemToRemove(array)要從購物車之產品刪除之產品可有多個
const removeCartItem = (cartItems, cartItemToRemove) => {
    //find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    //check if quantity is equal to 1, if it is then remove the item from the cart(若要刪除之產品數量為1, 就從購物車中刪除此產品)
    if(existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    }

    //return back cartitems with matching cart item with reduced quantity(若要刪除之產品數量 > 1, 就從購物車中此產品數量 - 1)
    return cartItems.map((cartItem) => 
        cartItem.id === cartItemToRemove.id
            ? {...cartItem, quantity: cartItem.quantity - 1} //注意這裡無論是新增或刪減產品數量, 都要重新建一個 obj 這樣 react 才有辦法判斷需要 re-rendering
            :cartItem //錯誤之例外狀況就回傳原有之 cartItem object
    );
}

//helper function會回傳一陣列, 從購物車中刪除某項產品(全部數量刪除)
const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
}

/* cartReducer starts */
const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_CART_COUNT: 'SET_CART_COUNT',
    SET_CART_TOTAL: 'SET_CART_TOTAL',
};

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}

const cartReducer = (state, action) => {
    const { type, payload } = action; //從 action 中取出 type, payload

    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state, //複製 cartReducer 原有狀態(date)
                ...payload //用 payload 更新 cartReducer 原有狀態(date)
            }
        default: 
            throw new Error(`unhandled type of ${type} in cartReducer`);
    }
};
/* cartReducer ends */

export const CartContext = createContext(
    {
        isCartOpen: false,
        setIsCartOpen: () => {},
        cartItems: [], //購物車內容
        addItemToCart: () => {}, //加物品到購物車
        removeItemToCart: () => {},
        clearItemFromCart: () => {},
        cartCount: 0, //購物車內有多少產品 for context
        cartTotal: 0 //price
    }
);

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    
    //using cartReducer
    const [{cartItems, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    //using helper functions start *******************************************
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updatecartItemsReducer(newCartItems);
    };

    const removeItemToCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updatecartItemsReducer(newCartItems);
    };

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updatecartItemsReducer(newCartItems);
    };
    //helper functions end *******************************************

    //using reducer starts *******************************************
    const updatecartItemsReducer = (cartItems) => {
        //generating newCartTotal
        const newCartTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price, 0
        );

        //generating newCartCount
        //使用 js reduce funciton 來累加 cartCount
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity, 0
        );

        const payload = {
            cartItems,
            cartCount: newCartCount,
            cartTotal: newCartTotal,
        };

        //dispatching new action with payload = {newCartItems, newCartTotal, newCartCount}
        dispatch( createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload) );
    };
    //using reducer ends *******************************************


    const value = 
        {
            isCartOpen, 
            setIsCartOpen, 
            cartItems, 
            addItemToCart, 
            cartCount, 
            removeItemToCart, 
            clearItemFromCart, 
            cartTotal
        };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};