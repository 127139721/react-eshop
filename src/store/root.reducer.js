import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer"; 
import { categoriesReducer } from "./categories/categories.reducer";

export const rootReducer  = combineReducers (
    {
        //key自取, value: your reducer
        user: userReducer,
        categories: categoriesReducer,
    }
);