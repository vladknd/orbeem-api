import styled from 'styled-components'

export const ItemInfo = styled.div`
    display
    width: 100%;
    height: 100%; 
    display: none;
`

interface IItemContainer {
    image: string;
}
export const ItemContainer = styled.div`
    margin: 50px 100px  ;
    width: 250px;
    height: 250px;
    background-image: ${(props: IItemContainer) => `url("${props.image}")`};
    background-position: center;
    background-size: cover;
    transition: 0.5s;
    &:hover{
        width: 260px;
        height: 260px;
        box-shadow: 0 0px 20px #6626ad;
        ${ItemInfo} {
            /* opacity: 0.5; */
            display: flex;
            flex-direction: column;
            justify-content: end;
            background: linear-gradient(0deg, rgba(65,24,144,0.7695553563222164) 0%, rgba(255,255,255,0.10849093055190828) 100%);
        }
        
    }

`

