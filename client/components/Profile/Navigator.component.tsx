import React from 'react'
import Link from 'next/link'
import { 
    AccountContainer, 
    AvatarContainer, 
    NavigatorContainer, 
    SignedContainer, 
    UsernameContainer,
    LinkContainer,
    Links,
    UnsignedContainer
} from './Profile.styled'
import { Button1, GlowText, Text } from '../../styles/Components.styled';
import { useUser } from '../../services/user.service';
import Image from 'next/image'
import { useRouter } from 'next/router';
//NAVIGATOR-LINK:
export interface INavigatorLink {
    href: string;
    text: string;
}
const NavigatorLink = (props: INavigatorLink) => {
    return(
        <Link href={props.href}>
            <LinkContainer style={{cursor:"pointer"}}>{props.text}</LinkContainer>
        </Link>
    )
}
const SignedComponent = () => {
    return (
        <SignedContainer>
            <AccountContainer>
                <AvatarContainer image="/avatar.jpg"></AvatarContainer>
                <UsernameContainer>USERNAME</UsernameContainer>
            </AccountContainer>
            <GlowText size={60} m="30px 0px 20px 0px">MY PROFILE</GlowText>
            <Links>
                <NavigatorLink href="/" text="MY NFTS"/>
                <NavigatorLink href="/" text="MY ACCOUNTS"/>
            </Links>
        </SignedContainer>
    )
}

const UnsignedComponent = () => {
    const router = useRouter()
    const {user, setLoggedIn} = useUser()
    console.log();
    
    return (
        <UnsignedContainer>
            <Image src="/steam.svg" width={300} height={300}/>
            <Text size={20} opacity={0.5} m="0px 500px">
                TO Start earning rewards and buy Our nfts, the players have to link their steam account to orbeem ECosystem. This is done by minting a unique avatar nft. please enter the following data into the corresponding fields.
            </Text>
            <Button1 width={200} height={50} mt={30} mb={30}
                onClick={()=> {router.push("http://52.37.206.149:4000/api/auth/steam")}}
            >
                CONNECT
            </Button1>
        </UnsignedContainer>
    )
}

const NavigatorComponent = () => {
  const {user} = useUser()
  return (
    <NavigatorContainer>
        {user?.steamId ? <SignedComponent/> : <UnsignedComponent/>}
    </NavigatorContainer>
  )
}

export default NavigatorComponent