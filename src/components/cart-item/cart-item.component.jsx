import React, { createContext, useContext, useState } from "react";
import './cart-item.styles.scss';

const CartItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    return (
        <div className='cart-item-container' data-testid="custom-element">
            <img src={imageUrl} alt={`${name}`}/>
            <div className='item-details'>
                <span className='name' data-testid="cart-item-name">{name}</span>
                <span className='price'>{quantity} x ${price}</span>
            </div>
        </div>
    );
};

export default CartItem;