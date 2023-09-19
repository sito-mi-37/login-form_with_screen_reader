import React, {createContext, useState} from 'react'


 const AuthContext = createContext({})


export const AuthProvider = ({children}) => {
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('persist')) || false)
    const [auth, setAuth] = useState({})
  return (
   <AuthContext.Provider value={{auth, setAuth, persist, setPersist}}>
     {children}
   </AuthContext.Provider>
  )
}

export default AuthContext