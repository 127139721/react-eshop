import {Routes, Route} from 'react-router-dom';
import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from "./routes/shop/shop.component";
import Checkout from './routes/checkout/checkout.component';
import { setCurrentUser } from './store/user/user.action';

import { GlobalStyle } from './global.styles.jsx';
import { findAllByAltText } from '@testing-library/react';

// shop/*: 代表 url 只要有 shop/ 後面接什麼都不管, 都會到 Shop component 
const App = () => { 
  
  const dispatch = useDispatch();
  //使用 useEffect 去觸發 onAuthStateChangedListener 觀察 user login/out
  useEffect(() => {
    //呼叫onAuthStateChangedListener後 google 會回傳一個 unsubscribe object
    const unsubscribe = onAuthStateChangedListener(
        (user) => {
            //給 onAuthStateChangedListener 的 callback function, 所以當每次有 user login/out 就會執行這裡
            if (user) {
                createUserDocumentFromAuth(user);
            }
            dispatch(setCurrentUser(user)); //設置目前登入之 user
        }
    );
    return unsubscribe //clean up the callback function
  }, []);
  
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />        {/*index 設 true 代表當 url path 為 / 時, 就是顯示 home component */}
          <Route path='shop/*' element={<Shop />} />
          <Route path='auth' element={<Authentication />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
