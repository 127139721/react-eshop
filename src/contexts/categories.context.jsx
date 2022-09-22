import React, { createContext, useState, useEffect } from 'react';

import { addCollectionAndDocuments, getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider  = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({}); //初始化給空物件
  
  useEffect(() => {
    const getCategoriesMap = async () => {
      //return a callback funciton
      const categoryMap = await getCategoriesAndDocuments('categories');
      setCategoriesMap(categoryMap);
    };

    //run the returned callback function
    getCategoriesMap();
  }, []);

  //寫資料到FB
  /*
  useEffect(() => {
    addCollectionAndDocuments('collections', SHOP_DATA);
  }, []);
  */

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};