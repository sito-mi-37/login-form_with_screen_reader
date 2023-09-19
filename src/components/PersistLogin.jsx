import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const {auth, persist} = useAuth()
    const refresh = useRefreshToken()


    useEffect(() => {
        let isMounted = true
        const verifyRefreshToken = async () => {
            try{
                await refresh()
            }catch (err){
                console.error(err)
            }finally{
               isMounted && setIsLoading(false)
            }
        }

        !auth?.accessToken
            ? verifyRefreshToken()
            : isMounted && setIsLoading(false)

            return () => isMounted = false
        
    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)

    }, [isLoading])

    return (
        <>
            {!persist 
                ? <Outlet />
                : isLoading 
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )
    
}

export default PersistLogin