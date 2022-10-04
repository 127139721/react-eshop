import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import { selectCategoriesMap } from '../../store/categories/categories.selector';
import ProductCard from '../../components/product-card/product-card.component';
import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);

  /*Object.keys(categoriesMap).map((key) 這裡會得到 categories keys(就是title): ex. Hats, Sneakers ...  
    products = categoriesMap[key]; 這裡會得到各別 categories(titles) 下的 products
  */
    return (
      <div>
        {Object.keys(categoriesMap).map((key) => {
          const products = categoriesMap[key];
          return <CategoryPreview key={key} title={key} products={products} />;
        })}
      </div>
    );

};

export default CategoriesPreview;