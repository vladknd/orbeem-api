import type { NextPage } from 'next'
import MarketplaceComponent from '../components/Marketplace/Marketplace.component'
import { useAuthorize } from '../services/auth.service'


const Home: NextPage = () => {
  const [authorized, loading] = useAuthorize()  
  return <MarketplaceComponent/>

}

export default Home
