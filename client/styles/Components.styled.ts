import styled from 'styled-components'
import colors from '../styles/colors'

//------------------------------DIVIDER------------------------------
interface DividerProps {
    mt?: string;
    mb?: string;
    pt?: string;
}
export const Divider = styled.div`
    width: 100%;
    height: 2px;
    background: 
        linear-gradient(90deg, rgba(255, 187, 0, 0) 0%, #FFBB00 50.02%, rgba(255, 187, 0, 0) 100%);

    margin-top: ${(props: DividerProps) => props.mt || 0};
    margin-bottom: ${(props: DividerProps) => props.mb || 0};

`

// export const Button = styled.button`

// `

//------------------------------BUTTON------------------------------:
interface IButton {
    width?: number;
    height?: number;

    mt?: number;
    mb?: number;
    ml?: number;
    mr?: number;

}
export const Button = styled.button`
    width: ${(props: IButton) => `${props.width}px` || "100px"};
    height: ${(props: IButton) => `${props.height}px` || "100px"};

    margin-top: ${(props: IButton) => `${props.mt}px` || "0px"};
    margin-bottom: ${(props: IButton) => `${props.mb}px` || "0px"};
    margin-right: ${(props: IButton) => `${props.mr}px` || "0px"};
    margin-left: ${(props: IButton) => `${props.ml}px` || "0px"};
`

export const Button1 = styled(Button)`
    color: white;
    background: rgba(0,0,0,0.1);

    border-radius: 15px;
    border: 0.5px solid;
    border-color: #4F2EAE;
    //TO-DO: ADD GRADIENT BORDERS!
   
    font-size: 20px;
    font-weight: 10;
    letter-spacing: 4px;

    &&:hover {
        background: rgba(0,0,0,0.2);
    }

    &&:hover:active {
        opacity: 0.7;
    }

`
export const Button2 = styled(Button)`
    background: transparent;
    color: white;

    border: 1px solid white;
    padding: 10px 20px;
    font-size: 20px;
    font-weight: 10;
    letter-spacing: 4px;

    &:hover {
        opacity: 0.5;
    }
`


//------------------------------BOX------------------------------:
interface IBox {
    width?: number;
    height?: number;

    dir?: string;
    jc?: string;
    al?: string;

    mt?: number;
    mb?: number;
    mr?: number;
    ml?: number;
}
export const Box = styled.div`
    display: flex;
    flex-direction: ${(props: IBox) => props.dir || "column"};
    justify-content: ${(props: IBox) => props.jc || "center"};
    align-items: ${(props: IBox) => props.al || "center"};

    width: ${(props: IBox) => `${props.width}px` || "100%"};
    height: ${(props: IBox) => `${props.height}px` || "100%"};

    margin-top: ${(props: IBox) => `${props.mt}px` || "0px"};
    margin-bottom: ${(props: IBox) => `${props.mb}px` || "0px"};
    margin-right: ${(props: IBox) => `${props.mr}px` || "0px"};
    margin-left: ${(props: IBox) => `${props.ml}px` || "0px"};

    
`
export const Box1 = styled(Box)`
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;

    background: ${colors.box1_bg};

    color: white;
`

export const Box2 = styled(Box)`
    border: 1px solid ${colors.yellow};
    border-radius: 10px;

    background: ${colors.box2_bg};
`

//_______________________________TEXT__________________________________
interface TextProps {
    font?: string;
    size?: number;
    bold?: boolean;
    opacity?: number;
    lh?: number;
    m?: string;
    p?: string;

}
export const GlowText = styled.p`
    font-family: ${(props: TextProps) => props.font || "Arial"};
    font-weight: ${(props: TextProps) => props.bold ? "bold" : "normal"};
    font-size: ${(props: TextProps) => props.size ? `${props.size}px` : "80px"};

    color: white;
    opacity: ${(props: TextProps) => props.opacity || 1};
     
    margin: ${(props: TextProps) => props.m || 0};
    padding: ${(props: TextProps) => props.p || 0};
    line-height: ${(props: TextProps) => props.lh || 1}; 
    
    text-shadow: 0px 0px 6px rgba(29, 173, 255, 0.25), 0px 0px 33px #B04BFF;
    
    @media(max-width: 600px) {
        font-size: 50px;
    }
`

export const Text = styled.p`
    font-family: ${(props: TextProps) => props.font || "Arial"};
    font-weight: ${(props: TextProps) => props.bold ? "bold" : "normal"};
    font-size: ${(props: TextProps) => props.size ? `${props.size}px` : "80px"};

    color: white;
    opacity: ${(props: TextProps) => props.opacity || 1};
     
    margin: ${(props: TextProps) => props.m || 0};
    padding: ${(props: TextProps) => props.p || 0};
    line-height: ${(props: TextProps) => props.lh || 1}; 
`

// export const Input = styled.input`
//     width: 100%;
//     height: 100%;
//     padding: 20px 10px;

//     background: transparent;
//     border-radius: 8px;  
//     border: 1px solid gray;
//     outline: none;

//     color: white;
//     font-size: 20px;

//     &:focus {
//         border: 1px solid #6d52d1;
//     }

// `

