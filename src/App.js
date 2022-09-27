import {Routes, Route} from 'react-router-dom';
import React, { Component }  from 'react';

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from "./routes/shop/shop.component";
import Checkout from './routes/checkout/checkout.component';

// shop/*: 代表 url 只要有 shop/ 後面接什麼都不管, 都會到 Shop component 
const App = () => {
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
