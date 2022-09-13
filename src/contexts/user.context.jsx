import React, { createContext, useState } from "react";

export const UserContext = createContext(
    //default value for context
    {
        setCurrentUser: () => null,
        currentUser: null,
    }
);

//a provider which is a component
export const UserProvider = ({ children }) => {
    //default value for this component
    const [currentUser, setCurrentUser] = useState(null);
    //把要讀取之值跟設置的function通通給 value object
    const value = { currentUser, setCurrentUser };

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