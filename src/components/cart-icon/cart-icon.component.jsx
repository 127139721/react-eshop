import React, {Fragment} from 'react';
import { useDispatch, useSelector } from 'react-redux'; 

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartIconContainer, ItemCount } from './cart-icon.styles';
import { selectCartCount } from '../../store/cart/cart.selector';
import { setIsCartToggleHidden } from '../../store/cart/cart.action.js'

const CartIcon = () => {
    const dispatch = useDispatch();
    
    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(setIsCartToggleHidden);
    
    const toggleIsCartOpen = () => {
        dispatch(setIsCartToggleHidden(!isCartOpen));
    }

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon' />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;