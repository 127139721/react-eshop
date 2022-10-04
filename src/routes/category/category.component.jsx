import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProductCard from '../../components/product-card/product-card.component';
import { selectCategoriesMap} from '../../store/categories/categories.selector'
import './category.styles.scss';

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap); //為async function
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