import { createContext, useState } from "react"
import { useLocalStorage } from "./uselocalstorage"

const UserContext = createContext()

function UserProvider({children}) {
    const [userObj, setuserObj] = useLocalStorage("userObj", {});

    const value = [userObj, setuserObj]
    console.log(value)
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export {UserProvider, UserContext}