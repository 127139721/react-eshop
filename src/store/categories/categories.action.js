import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from './categories.types';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

/*給 redux thunk 使用之 fiunctions  start*/
export const fetchCategoriesStart = () =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray) =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);

export const fetchCategoriesFailed = (error) =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);
/*給 redux thunk 使用之 fiunctions  end*/


/*
//真正 redux thunk 需搭配 async await, thunk 會 return 一個 dispatch function
export const fetchCategoriesAsync = () => async (dispatch) => {
    //開始從server抓取categories
    dispatch(fetchCategoriesStart());
    
    try{
        //去firebase server 抓資料
        const categoriesArray = await getCategoriesAndDocuments("categories");
        console.log('categoriesArray', categoriesArray);
        //將資料 dispatch 到 reducer
        dispatch(fetchCategoriesSuccess(categoriesArray));
    }
    catch (error) {
        //若抓取過程發生錯誤, 就把 server response error obj 使用　dispatch 打回 reducer
        dispatch(fetchCategoriesFailed(error));
    }
}
*/