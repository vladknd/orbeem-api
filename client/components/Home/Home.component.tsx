//#------------------GLOBAL-IMPORTS------------------#
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAuthorize } from '../../services/auth.service'
//#------------------LOCAL-IMPORTS-------------------#
import { 
    Box1,
    Button1, 
    Button2, 
    Divider 
} from '../../styles/Components.styled'

import { 
    HomeContainer, 
    LogoContainer, 
    PanelContainer, 
    Tape, 
    TapesContainer, 
    UpsideContainer 
} from './Home.styled'

//-----------------------------------PANEL-CONNECT-COMPONENT:
const PanelConnect = () => {
    return (
        <PanelContainer>
            <Button1 width={200} height={50}>
                CONNECT
            </Button1>
        </PanelContainer>
    )
}

//-----------------------------------------PANEL-COMPONENT:
interface IPanelBox {
    image: string;
    text: string;
    link: string;
}
const PanelBox = (props: IPanelBox) => {
    const Router = useRouter()
    return (
        <Box1 width={400} height={400} mt={20} mb={20}>
            <Image src={props.image} width={300} height={300}></Image>
            <Button2 width={250} height={50} 
                onClick={(event)=> {
                    Router.push(props.link)
                }}
            >
                {props.text}
            </Button2>
        </Box1>
    )
}

const Panel = () => {
    return (
        <PanelContainer>
            <PanelBox image="/marketplace.svg" text="MARKETPLACE" link="/marketplace"/>
            <PanelBox image="/wallet.svg" text="WALLET" link="/"/>
            <PanelBox image="/profile.svg" text="PROFILE" link="/profile"/>
        </PanelContainer>
    )
}

//-----------------------------HOME-COMPONENT------------------------------:
const HomeComponent = () => {
  const [authorized, loading] = useAuthorize()  
//   useEffect(() => {
//     console.log(authorized)
//     console.log(loading)
    
//   }, [authorized, loading])
  
  return (
    <HomeContainer>
        <UpsideContainer>
            <LogoContainer>
                <Image src="/logo_vertical.svg" width={450} height={450}/>
            </LogoContainer>
            
            <TapesContainer>
                <Tape>
                    <Image src="/tape1.png" width={850} height={170}/>
                </Tape>

                <Tape>
                    <Image src="/tape2.png" width={850} height={170}/>
                </Tape>
            </TapesContainer>
        </UpsideContainer>

        <Divider/>
        {authorized ? <Panel/> : <PanelConnect/>}
        <Divider/>
    </HomeContainer>
  )
}

export default HomeComponent