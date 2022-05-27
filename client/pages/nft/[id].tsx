import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import NFTComponent from '../../components/NFT/NFT.component'


const Home: NextPage = () => {
  const router = useRouter()
  return <NFTComponent id={Number(router.query.id)}/>
}

export default Home
