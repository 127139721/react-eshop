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
import { arrayRemove } from 'firebase/firestore';

// shop/*: 代表 url 只要有 shop/ 後面接什麼都不管, 都會到 Shop component 
const App = () => {
  
  var checkIfExist = function(arr) {
    let count = 0;
    const sortedArr = arr.sort(function(a,b){return a-b});
    for(let i=0; i<sortedArr.length; i++){
      const result = sortedArr[i] * 2;
      arr.map((x) => {
        if(x === result){
          count++;
        }
      })
    }

    if(count >= 1)
      return true;
    else
      return false;
  };
  
  checkIfExist([-2,0,10,-19,4,6,-8]);
  
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
