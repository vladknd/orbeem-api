import React from 'react'
import { Text } from '../../styles/Components.styled'
import { FieldContainer } from './InfoField.styled'
import Image from 'next/image'

interface IInfoField {
    image: string;
    attribute: string;
    value: string;

    margin?: string;
}
const InfoFieldComponent = (props: IInfoField) => {
  return (
    <FieldContainer width="90%" height="40px" margin={props.margin}>
        <Image src={props.image} width={28} height={28}/>
        <Text size={16}>{props.attribute}</Text>
        <Text size={16}>{props.value}</Text>
    </FieldContainer>
  )
}

export default InfoFieldComponent