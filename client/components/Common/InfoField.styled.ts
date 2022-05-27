import styled from 'styled-components'

interface IFieldContainer {
    margin?: string;
    width: string;
    height: string;
    
}
export const FieldContainer = styled.div`
    margin: ${(props: IFieldContainer) => props.margin};
    display: flex;
    flex-direction: row;
    align-items: center;

    width: ${(props: IFieldContainer) => props.width};
    height: ${(props: IFieldContainer) => props.height};

    border: 0.5px solid white;
`