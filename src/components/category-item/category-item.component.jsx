import './category-item.styles.scss'
import React, { Component }  from 'react';

const CategoryItem = ({ category }) => {
    const {imageUrl, title} = category;
    
    return(
        <div className='category-container'>
            <div 
                className='background-image'
                /*在 react 直接套用 css style 之方法, 傳入一個物件給 style={}, 此物件裡面給定 css property ex.這裡的 backgroundImage。 `url(${imageUrl})`:為讀取值後當成 backgroundImage 之值 */
                style={
                    { backgroundImage: `url(${imageUrl})` }
                }
            />
            <div className='category-body-container'>
                <h2>{title}</h2>
                <p>shop now</p>
            </div>
        </div>
    )
   
};

export default CategoryItem;