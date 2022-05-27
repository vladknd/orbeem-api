import React, { useEffect, useState } from 'react'
import { useAuthorize } from '../../services/auth.service'
import { useUser } from '../../services/user.service'
import { Box2, Divider, GlowText } from '../../styles/Components.styled'
import { getMyNFTs } from '../../web3/web3Utils'
import LoadingComponent from '../Loading/Loading.component'
import ItemComponent from '../Marketplace/Item.component'
import NavigatorComponent from './Navigator.component'
import { Items, Navigator, ProfileContainer } from './Profile.styled'


const MyNfts = () => {
    interface INFT {
        name: string;
        description: string;
        tokenId: number;
        tokenURI: string;
        imageURI: string;
    }
    const [nfts, setNFTs] = useState<Array<INFT> | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        getMyNFTs().then((result) => {
            console.log("PROFILE-COMPONENT: GET-MY-NFTS RESULT", result);
            
            setNFTs(result)
            setLoading(false)
            console.log("PROFILE-COMPONENT: SET NFTs", nfts)
        })
    },[])
    
    return (
        <Box2 height={800} width={1400} mb={20} jc="start">
            
            {loading ? <LoadingComponent/> : <Items>
                {nfts?.map((item, index) => {
                    return (<ItemComponent
                        key={index}
                        id={item?.tokenId}
                        level={321}
                        power={12}
                        durability={123}
                        price={312}
                        image={item?.imageURI}
                    />)
                })}
                
            </Items>}
        </Box2>
    )
}

const ProfileComponent = () => {
  const [steamed, setSteamed] = useState<boolean>(false)
  const {user} = useUser()
  console.log("USER CONT", user);
  
  return (
    <ProfileContainer>
        <Divider mt='100px'/>
        {/* <Navigator>
            MY NFTS
        </Navigator> */}
        <NavigatorComponent/>
        <Divider mb='20px'/>

        {user?.steamId ? <MyNfts/> : null}
    </ProfileContainer>
  )
}

export default ProfileComponent