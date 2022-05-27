import styled from 'styled-components'
import colors from '../../styles/colors'

export const NFTContainer = styled.div`
    display: flex;
    flex-direction: row;

    width: 100%;
    height: 100%;

    background-color: ${colors.container_bg};
`

export const NFT = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 40%;
    height: 100%;

`

export const NFTId = styled.div`
    margin: 10px 0px;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 50%;
    height: 35px;
    background-color: rgba(240, 240, 240, 0.1);

    border-radius: 69px;

    color: white;
`


interface INFTImage {
    image: string;
}
export const NFTImage = styled.div`
    width: 300px;
    height: 300px;
    
    border: 1px solid white;

    background-image: ${(props: INFTImage) => `url("${props.image}")`};
    background-position: center;
    background-size: cover;
    

`

