import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles';
import { setIsCartToggleHidden } from '../../store/cart/cart.action'

//history, dispatch props 是給 unit test 用, 只有做 UT 時候才會傳入, 正常功能使用 navigate 來換頁面 & 使用 useDispatch
const CartDropdown = ({history, dispatch}) => {
  //取得目前購物車內容
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();
  
  //如果 prop 沒有收到 UT 的 mock dispatch, 就代表是給正常畫面使用, 所以要去建立 useDispatch object
  if(!dispatch)
    dispatch = useDispatch();
  
  const goToCheckoutHandler = () => {
    dispatch(setIsCartToggleHidden());
    if(history)
      history.push('/checkout');
    else
      navigate('/checkout')
  };

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage data-testid="empty-message">Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler} data-testid="checkout-btn">GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;