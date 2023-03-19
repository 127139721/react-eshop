import React, { createContext, useContext, useState } from "react";
import { CartItemContainer, ItemDetails } from "./cart-item.styles";

const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <>
    <CartItemContainer data-testid="custom-element">
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <span className="name" data-testid="cart-item-name">
          {name}
        </span>
        <span className="price">
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer> 
    </>
  );
};

export default CartItem;
