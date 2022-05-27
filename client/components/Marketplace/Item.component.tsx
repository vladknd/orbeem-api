import React from 'react'
import { ItemContainer, ItemInfo } from './Item.styled'
import {Text} from '../../styles/Components.styled'
import Link from 'next/link';

interface INFTComponent {
    id: number;
    level: number;
    power: number;
    durability: number;
    price: number;
    image: string;
}
const ItemComponent = (props: INFTComponent) => {
  return (
    <Link href={`/nft/${props.id}`} passHref>
    <ItemContainer image={props.image}>
        <ItemInfo>
            <Text size={20} m="8px">LEVEL: {props.level}</Text>
            <Text size={20} m="8px">POWER: {props.power}</Text>
            <Text size={20} m="8px">DURABILITY: {props.durability}</Text>
            <Text size={20} m="8px">PRICE: {props.price}</Text>
        </ItemInfo>
    </ItemContainer>
    </Link>
  )
}

export default ItemComponent
