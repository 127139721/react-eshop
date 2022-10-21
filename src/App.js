import {Routes, Route} from 'react-router-dom';
import React, {useEffect, lazy, Suspense } from "react";
import { useDispatch } from 'react-redux';

import { checkUserSession } from './store/user/user.action';
import Spinner from './components/spinner/spinner.component';

/*dymamic loading */
const Shop = lazy(() => import("./routes/shop/shop.component"));
const Checkout = lazy(() => import("./routes/checkout/checkout.component"));
const Navigation = lazy(() => import("./routes/navigation/navigation.component"));
const Home = lazy(() => import("./routes/home/home.component"));
const Authentication = lazy(() => import("./routes/authentication/authentication.component"));

// shop/*: 代表 url 只要有 shop/ 後面接什麼都不管, 都會到 Shop component 
const App = () => {

  const dispatch = useDispatch(); 
  //使用 useEffect 觀察 user login/out
  useEffect(() => {
    dispatch(checkUserSession());
  }, []);
  
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='shop/*' element={<Shop />} />
          <Route path='auth' element={<Authentication />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
    
  );
};

export default App;
