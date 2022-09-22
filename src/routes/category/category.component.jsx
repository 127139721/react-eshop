import React, { useContext, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';
import { CategoriesContext } from '../../contexts/categories.context';
import './category.styles.scss';

const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext); //為async function
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    //因為取得資料為async 所以這裡需要 sage guard: products && 來判斷是否已經取得資料了
    return (
        <Fragment>
          <h2 className='category-title'>{category.toUpperCase()}</h2>
          <div className='category-container'>
            {products &&
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </Fragment>
      );
};
export default Category;