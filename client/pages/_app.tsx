import '../styles/globals.css'
import type { AppProps } from 'next/app'
import HeaderComponent from '../components/Header/Header.component'
import FooterComponent from '../components/Footer/Footer.component'

import { useRouter } from 'next/router'
import {ApolloProvider} from '@apollo/client'
import { graphClient } from '../graphql'
import { UserProvider } from '../services/user.service'

function MyApp({ Component, pageProps }: AppProps) {
  const Router = useRouter()
  return (
    <UserProvider>
    <ApolloProvider client={graphClient}>
      {Router.pathname === "/registration" ? null : <HeaderComponent/>}
        <Component {...pageProps} />
      {Router.pathname === "/registration" ? null : <FooterComponent/>}
    </ApolloProvider>
    </UserProvider>
  )

}

export default MyApp
