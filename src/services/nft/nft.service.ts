import { prisma } from "@prisma/client";
import { prismaClient } from "../../db";


export interface INFT {
    tokenID: number;
    charged: boolean;
}

export interface INFTData {
    name: string;
    description: string;
    tokenId: number;
    itemId: number;
    tokenURI: string;
    image: string;

    owner: string;
    sold: boolean;
    price: string;

    level: number;

    basePower: number;
    baseDurability: number;
    baseIntelligence: number;

    power: number;
    durability: number;
    intelligence: number;
}

export const getNFT = async (_tokenID: number): Promise<INFT | null> => {
    const _nft = await prismaClient.nft.findUnique({
        where: {
            tokenID: _tokenID
        }
    })
    if(_nft) return _nft

    const newNFT = await prismaClient.nft.create({
        data: {
            tokenID: _tokenID,
            charged: true
        }
    })
    console.log("nft has been recorded:", _nft)
    
    return _nft
}

export const getNFTCharge = async (tokenID: number): Promise<boolean> => {
    const nft = await prismaClient.nft.findUnique({where: {
        tokenID
    }})
    if(nft) return nft.charged

    const newNFT = await prismaClient.nft.create({
        data: {
            tokenID,
            charged: true
        }
    })
    console.log("nft has been recorded:", nft)
    
    return newNFT.charged
}

export const dischargeNFT = async (tokenID: number) => {
    const updatedNFT = await prismaClient.nft.update({
        where: {
            tokenID
        },
        data: {
            charged: false
        }
    })
}