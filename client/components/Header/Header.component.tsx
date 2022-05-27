//#------------------GLOBAL-IMPORTS------------------#
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
//#------------------LOCAL-IMPORTS-------------------#
import { 
    HeaderContainer, 
    LinkContainer, 
    LogoContainer, 
    SideContainer,
    AccountContainer
} from './Header.styled'
import { LinksData } from './Header.data'

//HEADER-LINK:
export interface IHeaderLink {
    href: string;
    text: string;
}
const HeaderLink = (props: IHeaderLink) => {
    return(
        <Link href={props.href}>
            <LinkContainer style={{cursor:"pointer"}}>{props.text}</LinkContainer>
        </Link>
    )
}

//-----------------------------HEADER-COMPONENT------------------------------:
const HeaderComponent = () => {
  return (
    <HeaderContainer>
        <LogoContainer>
            <Image width={150} height={80} src="/logo_horizontal.svg"/>
        </LogoContainer>
        
        <SideContainer>
            {LinksData.map((item, index) => {
                return(
                    <HeaderLink key={index} href={item.href} text={item.text}/>
                )
            })}
            <AccountContainer/>
        </SideContainer>
        
    </HeaderContainer>
  )
}

export default HeaderComponent