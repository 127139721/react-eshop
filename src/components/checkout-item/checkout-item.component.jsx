import { useDispatch, useSelector } from 'react-redux';
import React from "react";

import { clearItemFromCart, addItemToCart, removeItemFromCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems); //取得所有cartItems from store
  
    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem)); //傳入所有cartItems & 要刪除之cartItem
    const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem)); 
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));
  
    return (
      <div className='checkout-item-container'>
        <div className='image-container'>
          <img src={imageUrl} alt={`${name}`} />
        </div>
        <span className='name'> {name} </span>
        <span className='quantity'>
          <div className='arrow' onClick={removeItemHandler}>
            &#10094;
          </div>
          <span className='value'>{quantity}</span>
          <div className='arrow' onClick={addItemHandler}>
            &#10095;
          </div>
        </span>
        <span className='price'> {price}</span>
        <div className='remove-button' onClick={clearItemHandler}>
          &#10005;
        </div>
      </div>
    );
  };
  
  export default CheckoutItem;