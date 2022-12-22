import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import { combineReducers, createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';

import * as actions from '../../store/cart/cart.action';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import CartItem from '../cart-item/cart-item.component';
import { setIsCartToggleHidden } from '../../store/cart/cart.action'

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
  let mockHistory, mockDispatch;

  beforeEach(() => {
    mockHistory = {
      push: jest.fn()
    }
    
    mockDispatch = jest.fn();

    const mockProps = {
      history: mockHistory,
      dispatch: mockDispatch
    };

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
            <CartDropdown {...mockProps}/>
          </Provider>
      </BrowserRouter>
    );

  });

  /*
  const CART_INITIAL_STATE =  {"payload": true, "type": "cart/SET_CART_TOGGLE_HIDDEN"}; 
  const expected = CART_INITIAL_STATE
  it('should render EmptyMessageContainer if cartItems is empty', () => {
    expect(actions.setIsCartToggleHidden(false)).toEqual(expected);
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

    const element = screen.getByTestId('custom-element');
    expect(element).toBeInTheDocument();
    //screen.debug()
  });

  it('should call history.push when button is clicked', () => {
    const checkoutBtn = screen.getByTestId('checkout-btn');
    expect(checkoutBtn).toBeInTheDocument();
    fireEvent.click(checkoutBtn);
    expect(mockHistory.push).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(setIsCartToggleHidden());
  });

  it('should render an CartItem components equals the cartItem in the mocked store', () => {
    const cartItemImage = screen.getByRole("img", { name: /Brown Cowboy/i })
    expect(cartItemImage).toHaveAttribute('alt', 'Brown Cowboy');
  });

});

/* scoping tests
  獨自開一個 describe block 測 EmptyMessage component, 這樣就不會受到上一個區塊的 beforeEach mocked data 影響
*/
describe('CartDropdown component renderign empty component', () => {
  let mockHistory, mockDispatch;

  it('should render EmptyMessageContainer if cartItems is empty', () => {
    mockHistory = {
      push: jest.fn()
    }
    
    mockDispatch = jest.fn();

    const mockProps = {
      history: mockHistory,
      dispatch: mockDispatch
    };
    
    let store;

    const mockReducer = (
      state = {
        isCartOpen: true,
        cartItems: []
      },
      action
    ) => { return state; }


    store = createMockStore({
      reducers: { cart: mockReducer }
    });

    render(
      <BrowserRouter>
          <Provider store={store}>
            <CartDropdown {...mockProps}/>
          </Provider>
      </BrowserRouter>
    );

    const emptyMessage = screen.getByTestId('empty-message');
    expect(emptyMessage).toBeInTheDocument();
    screen.debug()
  });
});
