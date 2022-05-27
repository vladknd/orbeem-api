import styled from 'styled-components'
import colors from '../../styles/colors'

export const MarketplaceContainer = styled.div`
    width: 100%;
    height: 100%;
`

export const Illustration = styled.div`
    width: 100%;
    height: 100vh;

    background-image: url("/dota-marketplace.jpg");
    background-repeat: no-repeat;
    background-position: center;
    backgrouns-size: 50%;
`

export const Market = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;

    background-color: ${colors.container_bg};
`

export const Items = styled.div`
    margin-top: 50px;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
`