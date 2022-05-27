import React, { useContext } from 'react'

interface IUser {
    username: string;
    email: string;
    firstName: string;
    surname: string;
    publicAddress: string;
    steamId: string;
}

interface IUserContext  {
  user: IUser | null;
  setLoggedIn(user: IUser): void;
  setLoggedOut: () => void;
}

const UserContextDefault = {
  user: null,
  setLoggedIn: () => {},
  setLoggedOut: () => {},
}



export const UserContext = React.createContext<IUserContext>(UserContextDefault)

export const UserProvider = (props: any) => {
  const [userState, setUserState] = React.useState<IUser | null>(null)

  const setLoggedIn = (user: IUser) => {
    setUserState({
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      surname: user.surname,
      publicAddress: user.publicAddress,
      steamId: user.steamId
    })
    
  }

  const setLoggedOut = () => {
    setUserState(null)
  }

  const value = {
    user: userState,
    setLoggedIn,
    setLoggedOut
  }

  return (
    <UserContext.Provider value={value}>
     {props.children}
    </UserContext.Provider>
  )
}
  
export const useUser = () => {
  return useContext(UserContext)
}