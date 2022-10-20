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
  
  var maxArea = function(height) {
    let sum = 0;//result
    let left =0, right = height.length-1; //左右柱子起始點
    
    //當左右柱子尚未相遇, 代表要掃完所有柱子高度
    while(left !== right){
        //找出y(高): Math.min(height[left], height[right]): 對比左右柱子取兩者最小之高(因為不能傾斜)(Y) 
        //找出x(長): Math.abs(left - right) 取絕對值避免負數情況
        //x * y 之後跟前一次 sum 比較
        sum = Math.max( Math.min(height[left], height[right]) * Math.abs(left - right), sum );

      /* 一開始就把左右柱子設在 array x 軸(index) 開頭 & 結尾處, 這裡會移動左或右柱子, 配合上面 while 逐步計算得出最大面積 */
      //如果左高 > 右高
        if(height[left] > height[right])
            right--;//移動右柱子
        else //如果右高 > 左高
            left++;//移動左柱子
    }

    return sum;  
};

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
