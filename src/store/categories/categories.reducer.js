import { CATEGORIES_ACTION_TYPES } from './categories.types';

export const CATEGORIES_INITIAL_STATE = {
        categories: [],
        isLoading: false, //是否依然在載入中
        error: null, //載入是否錯誤
};

export const categoriesReducer = (
    state = CATEGORIES_INITIAL_STATE, 
    action = {} 
) => 
{
    const { type, payload } = action;

    switch (type) {
        //開始載入 categories
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
            return { ...state, isLoading: true };
        
        //載入成功
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
            return { ...state, categories: payload, isLoading: false };

        //載入失敗
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
            return { ...state, error: payload, isLoading: false };
        
        default:
            return state;
    }
};

