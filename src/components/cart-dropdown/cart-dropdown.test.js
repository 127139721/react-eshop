import React from 'react';
import { screen, render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import { combineReducers, createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';

import * as actions from '../../store/cart/cart.action';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import CartItem from '../cart-item/cart-item.component';

export const createMockStore = ({ state, reducers }) => {
  const store = createStore(combineReducers(reducers), state);
  return {
    ...store,
    persistor: {
      persist: () => null
    }
  };
};

describe('CartDropdown component', () => {

  /*
  const CART_INITIAL_STATE =  {"payload": true, "type": "cart/SET_IS_CART_OPEN"}; 
  const expected = CART_INITIAL_STATE
  it('should render EmptyMessageContainer if cartItems is empty', () => {
    expect(actions.setIsCartOpen(false)).toEqual(expected);
  });
  */

  it('should render ShopPage component', () => {
    let store;

    let cartItem = {
      id: 3,
      imageUrl: 'https://i.ibb.co/QdJwgmp/brown-cowboy.png',
      name:'Brown Cowboy',
      price:35,
      quantity:4 
    };

    const mockReducer = (
      state = {
        isCartOpen: true,
        cartItems: [cartItem]
      },
      action
    ) => { return state; }


    store = createMockStore({
      reducers: { cart: mockReducer }
    });

    render(
        <BrowserRouter>
            <Provider store={store}>
              <CartDropdown />
            </Provider>
        </BrowserRouter>
    );

    const element = screen.getByTestId('custom-element');
    expect(element).toBeInTheDocument();
    screen.debug()
  });

});