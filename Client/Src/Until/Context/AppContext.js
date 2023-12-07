import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const {children} = props;

    const [isLogin, setisLogin] = useState(false);
    const [inforUser, setinforUser] = useState({});

    return (
        <AppContext.Provider value={{isLogin, setisLogin, inforUser, setinforUser}}>
            {children}
        </AppContext.Provider>
    );
};