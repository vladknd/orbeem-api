import styled from 'styled-components'

export const HomeContainer = styled.div`
    width: 100%;
    height: 100%;

`

export const UpsideContainer = styled.div`
    padding-top: 80px; //PADDING FROM HEADER!

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    background-image: 
        linear-gradient(to right top, #4d227a, #432072, #3a1e6b, #311c63, #291a5b, #282162, #272869, #262f70, #284189, #2755a3, #1f69bd, #007ed7);
    background-position: center;
    background-repeat: repeat;
    background-size: fill;

    height: 100vh;
`

export const LogoContainer = styled.div`
    margin-top: 50px;
    margin-left: 100px;
`

export const TapesContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 600px;
`

export const Tape = styled.div`
    margin: 30px 0px 3px 0px;

    &:hover {
        opacity: 0.8;
    }
`

export const PanelContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    height: 100%;

`