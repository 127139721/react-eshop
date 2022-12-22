import { Outlet, Link } from 'react-router-dom';
import React, { Fragment } from 'react'

import './navigation.styles.jsx'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import {setIsCartToggleHidden} from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';
import { useSelector } from 'react-redux';

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(setIsCartToggleHidden);

    return (
      <Fragment>
        <NavigationContainer>
          <LogoContainer to='/'>
            <CrwnLogo className='logo' />
          </LogoContainer>
          <NavLinks>
            <NavLink to='/shop'>SHOP</NavLink>
            {currentUser ? 
              (
                <NavLink as='span' onClick={signOutUser}>
                  SIGN OUT
                </NavLink>
              ) : (
                <NavLink to='/auth'>SIGN IN</NavLink>
              )
            }
            <CartIcon />
          </NavLinks>
          {isCartOpen && <CartDropdown />}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    );

};

export default Navigation;