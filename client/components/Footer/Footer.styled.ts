import styled from 'styled-components'

export const FooterContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    /* self-align: end; */
    width: 100%;
    height: 100%;

    background-color: black;

`

export const LogoContainer = styled.div`
    margin-left: 20px;
`

export const SocialMedias = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    
`

export const IconContainer = styled.div`
    margin: 0px 10px;
    &:hover {
        opacity: 0.5;
    }
`

export const Rights = styled.div`
    margin-right: 10px
`