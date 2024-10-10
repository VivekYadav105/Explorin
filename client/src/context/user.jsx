import React,{useState,useContext} from "react"
const UserContext = React.createContext({})

// eslint-disable-next-line react/prop-types
const UserProvider = ({children})=>{
    const [user,setUser] = useState({})
    return(
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = ()=> useContext(UserContext)

export default UserProvider
