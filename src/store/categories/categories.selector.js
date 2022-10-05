//reselect 如果給 function 的 input 一樣, 就會記錄之前算過的結果, 避免重算

import { createSelector } from "reselect";

//get a reducer slice from store
const selectCategoryReducer = (state) => state.categories;

//取state, createSelector 會建立 memorization
export const selectCategories = createSelector(
    [selectCategoryReducer], //input selector
    //output selector 會接 input selector
    (categoriesSlice) => categoriesSlice.categories
);

//使用 reselector 判斷如果 categories array 是之前計算過的(依據input判斷), 那就不要重跑 reduce fucntion
export const selectCategoriesMap = createSelector(
    [selectCategories], //input
    //output
    (categories) => categories.reduce((acc, category) => {
        const { title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})
);