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

// shop/*: 代表 url 只要有 shop/ 後面接什麼都不管, 都會到 Shop component 
const App = () => {

  /*leetcode test */
  var merge = function(nums1, m, nums2, n) {
    var x = 0,
        y = 0;
    
    //刪除0
    nums1.splice(m, nums1.length);
    nums2.splice(n, nums2.length);
    
    while(y < n){ //不管x陣列, 遶行y陣列即可
        //狀況1. 如果 y 小於 x 值, 就把 y 值往後插入即可 
        //狀況2. 若x已經繞完所以會得到 undefined, 就把 y 值往後插入即可 
        if(nums2[y] < nums1[x] || nums1[x] === undefined){
            nums1.splice(x, 0, nums2[y]); //y值插入x的位子
            x++;
            y++;    
        } 
        //如果 x 大於 y 值, x index 前進
        else {
            x++;
        }
    }
  };

  const nums1 = [-1,0,0,3,3,3,0,0,0];
  const m = 6 
  const nums2 = [1,2,2]; 
  const n = 3;

  merge(nums1, m, nums2, n);


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
