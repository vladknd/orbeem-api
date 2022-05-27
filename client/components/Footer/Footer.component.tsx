import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FooterContainer, IconContainer, LogoContainer, Rights, SocialMedias } from './Footer.styled'
import data from './Footer.data'

interface IIcon {
    to: string;
    image: string;
}
const Icon = (props: IIcon) => {
    return (
        <IconContainer>
            <Link href={props.to}>
                <Image src={props.image} width={30} height={30}/>
            </Link>
        </IconContainer>
    )
}

const FooterComponent = () => {
  return (
    <FooterContainer>
        <LogoContainer>
            <Image src="/logo_horizontal.svg" width={100} height={70}/>
        </LogoContainer>

        <SocialMedias>
            {data.map((item,index) => {
                return <Icon to={item.to} image={item.image} key={index}/>
            })}
        </SocialMedias>

        <Rights>
        <Image src="/rights.svg" width={220} height={50}/>
        </Rights>
        
    </FooterContainer>
  )
}

export default FooterComponent