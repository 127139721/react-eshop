import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Spinner from '../../components/spinner/spinner.component';
import ProductCard from '../../components/product-card/product-card.component';
import { selectCategoriesMap, selectCategoriesIsLoading} from '../../store/categories/categories.selector'
import { CategoryContainer, Title } from './category.styles';


const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    //因為取得資料為async 所以這裡需要 sage guard: products && 來判斷是否已經取得資料了
    return (
      <Fragment>
        <Title>{category.toUpperCase()}</Title>
        {isLoading ? (
          <Spinner></Spinner>
        ) : (
          <CategoryContainer>
            {
              products &&
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
            }
          </CategoryContainer>
        )}
      </Fragment>
    );
};
export default Category;