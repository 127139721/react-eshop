import React, { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext(
    {
        isCartOpen: false,
        setIsCartOpen: () => {},
        cartItems: [], //購物車內容
        addItemToCart: () => {}, //加物品到購物車
        cartCount: 0 //購物車內有多少產品 for context
    }
)

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
                : cartItem //例外狀況就回傳原有之 cartItem object
        );
    }
    
    //若要加入之產品不在購物車內, ...cartItems:複製目前購物車之陣列。 {...productToAdd, quantity: 1}:將要加入之產品數量設 1, 並寫入複製之目前購物車之陣列, 最後用 [] 包起來回傳一陣列
    return [...cartItems, {...productToAdd, quantity: 1} ];
};

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0); //購物車內有多少產品 for component 

    //查看是否需要re-render cartCount
    useEffect(() => {
        //使用 js reduce funciton 來累加 cartCount
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity, 0
        );
        setCartCount(newCartCount);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    };

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};