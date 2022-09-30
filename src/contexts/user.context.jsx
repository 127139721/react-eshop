import React, { createContext, useEffect, useReducer, useState } from "react";

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

export const UserContext = createContext(
    //default value for context
    {
        setCurrentUser: () => null,
        currentUser: null,
    }
);

/*reducer starts */
export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const userReducer = (state, action) => {
    const { type, payload } = action; //從action中取出 type & payload

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state, //複製之前的 userReducer state
                currentUser: payload, //從 action 中取出之 payload, 蓋掉存在 state 中的 currentUser
                //如此便只更新 userReducer 中的 currentUser, state 中其他資料不變
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
};
/*reducer ends */

const INITIAL_STATE = {
    currentUser: null,
}

//a provider which is a component
export const UserProvider = ({ children }) => {
    //default value for this component
    //const [currentUser, setCurrentUser] = useState(null);
    
    //using userReducer
    //get back from userReducer( {currentUser}:從目前reducer's state 取出 currentUser data, dispatch function) = (要用的REDUCER, 給此REDUCER的初始狀態)
    const [ {currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE);
    console.log('currentUser', currentUser);
    const setCurrentUser = (user) => {
        dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user})
    };

    //把要讀取之值跟設置的function通通給 value object
    const value = { currentUser, setCurrentUser };

    //使用 useEffect 去觸發 onAuthStateChangedListener 觀察 user login/out
    useEffect(() => {
        //呼叫onAuthStateChangedListener後 google 會回傳一個 unsubscribe object
        const unsubscribe = onAuthStateChangedListener(
            (user) => {
                //給 onAuthStateChangedListener 的 callback function, 所以當每次有 user login/out 就會執行這裡
                if (user) {
                    createUserDocumentFromAuth(user);
                }
                setCurrentUser(user) //設置目前登入之 user
            }
        );
        return unsubscribe //clean up the callback function
    }, []);

    //把上面的 value object 塞給 Context.Provider 下的 value, 這樣所有傳進來之 component 就可以去使用讀取之值跟設置的function
    return  <UserContext.Provider value={value}>
                {children}
            </UserContext.Provider>;
    
    {/*
        上面 children 可以想像成, 搭配 index.js 那邊可以傳入不同的 components, 就有不同 components 可以使用 context 
        <UserProvider>
            <app />
        </UserProvider>;
    */}
};