import { Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import './shop.styles.scss';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { setCategoriesMap } from '../../store/categories/categories.action';

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      const getCategoriesMap = async() => {
        const categoryMap = await getCategoriesAndDocuments('categories');
        dispatch(setCategoriesMap(categoryMap));
      };

      getCategoriesMap();
    }, [])

    return (
      <Routes>
        <Route index element={<CategoriesPreview />} />
        <Route path=':category' element={<Category />} />
      </Routes>
    );

};

export default Shop;