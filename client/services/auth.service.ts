import { getCookie } from 'cookies-next'
import { useEffect, useState } from "react"
import { useMutation } from "@apollo/client"
import { VERIFY_JWT } from "../graphql/mutations/User.mutations"
import { login } from "../web3/web3Utils"
import { useUser } from "./user.service"


export const useAuthorize = () => {
    const [authorized, setAuthorized] = useState<boolean | null>(null)
    const {setLoggedIn} = useUser()
    const [verifyJwt, {loading}] = useMutation(VERIFY_JWT)

    useEffect(() => {
        const jwt = getCookie("jwt")
        console.log("JWT-useAuthorize-cookies check", jwt)
        
        // if(!jwt){
        //   console.log("NO JWT FOUND!")
            
        //   setAuthorized(false)
        //   login().then(user => {
        //     console.log("USER: LOGGED IN AGAIN", user);
        //     setLoggedIn(user)
        //     setAuthorized(true)
        //   }).catch(error => {
        //     console.log("ERROR:", error);
        //   })
        // }

        verifyJwt({variables: {token: jwt}}).then((result) => {
          console.log("VERIFY JWT REQUEST:",result);
          const user = result.data.verifyJwt
          console.log("JWT: USER VERIFIED", user);
          setLoggedIn(user)
          setAuthorized(true)
        }).catch((error) => {
          setAuthorized(false)
          login().then(user => {
            console.log("USER: LOGGED IN AGAIN", user);
            setLoggedIn(user)
            setAuthorized(true)
          }).catch(error => {
            console.log("ERROR:", error);
          })
        })
    },[])

    return [authorized, loading]
}