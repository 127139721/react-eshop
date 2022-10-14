import {Routes, Route} from 'react-router-dom';
import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';

import { onAuthStateChangedListener, createUserDocumentFromAuth, getCurrentUser } from "./utils/firebase/firebase.utils";
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from "./routes/shop/shop.component";
import Checkout from './routes/checkout/checkout.component';
import { checkUserSession } from './store/user/user.action';

// shop/*: 代表 url 只要有 shop/ 後面接什麼都不管, 都會到 Shop component 
const App = () => {
  const dispatch = useDispatch(); 
  //使用 useEffect 觀察 user login/out
  useEffect(() => {
    dispatch(checkUserSession());
  }, []);
  
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
