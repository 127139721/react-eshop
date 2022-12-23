import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action; //從action中取出 type & payload

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state, //複製之前的 userReducer state
                currentUser: payload, //從 action 中取出之 payload, 蓋掉存在 state 中的 currentUser
                //如此便只更新 userReducer 中的 currentUser, state 中其他資料不變
            }
        default:
            return state; //回傳現有 state
    }
};