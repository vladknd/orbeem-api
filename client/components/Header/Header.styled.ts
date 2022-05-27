import styled from 'styled-components'
import colors from '../../styles/colors'

export const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 70px;
    z-index: 5;
    position: fixed;
    /* top: 60px; */
    /* margin-bottom: 100px; */
    color: white;
    background-color: ${colors.header_bg};
`

export const LogoContainer = styled.div`
    margin: 0px 20px;
`

export const SideContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 1000px;
    height: 10px;

    margin: 0px 20px;
`

export const LinkContainer = styled.a`
    margin: 0px 15px;

    letter-spacing: 0.155em;
    font-size: 15px;
    color: white;

    &:hover {
        background: -webkit-linear-gradient(90.89deg, #416CCA -1.34%, #7852CB 118.01%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`

export const AccountContainer = styled.div`
    width: 1000px;
    height: 50px;
    padding: 15px;
    border-radius: 25px;
    background-color: rgba(112, 112, 112, 0.24);

    color: white;
    text-align: center;
    
    border: 1px solid transparent;

    &:hover {
        border: 1px solid #6d52d1;
        background-color: rgba(112, 112, 112, 0.14);
    }
`