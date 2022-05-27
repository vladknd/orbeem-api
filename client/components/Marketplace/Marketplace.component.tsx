import React, { useEffect, useState } from 'react'
import { 
    Illustration, 
    MarketplaceContainer, 
    Market, 
    Items 
} from './Marketplace.styled'
import { Divider, Text } from '../../styles/Components.styled'
import ItemComponent from './Item.component'
import { getNFTs } from '../../web3/web3Utils'
import LoadingComponent from '../Loading/Loading.component'
import { INFT } from '../../web3/web3Utils'

const MarketplaceComponent = () => {
    const [nfts, setNfts] = useState<Array<INFT>>([])
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        async function fetchNFTs() {
            const res = await getNFTs()
            setNfts(res)
            setLoading(false)
            console.log("RES", nfts)
        }
        fetchNFTs()
    },[])
  return (
    <MarketplaceContainer>
        <Illustration/>

        <Divider/>
        <Market>
            <Text size={40} m="30px 0px">DOTA 2 - RUNE COLLECTION</Text>
            <Text size={25} opacity={0.7}>DOTA 2 - RUNE COLLECTION</Text>

            {loading ? <LoadingComponent/> :
            <Items>
                { nfts.map((item, index) => {
                    return (
                        <ItemComponent
                        key={index}
                        id={item.tokenId}
                        level={321}
                        power={12}
                        durability={123}
                        price={312}
                        image={item.imageURI}
                        />
                    )
                })}
            </Items>}           
        </Market>
        <Divider/>

    </MarketplaceContainer>
  )
}

export default MarketplaceComponent