import { createContext } from "react"
import { useLocalStorage } from "./uselocalstorage"
import { useEffect } from "react";

const UserContext = createContext()



function UserProvider({children}) {

    const [userObj, setuserObj] = useLocalStorage("userObj", {});

    const value = {userObj, setuserObj}
    console.log(value)
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export {UserProvider, UserContext}